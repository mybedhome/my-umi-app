import { convertFormData, getRandom, isEmptyObj } from '@bj-nsc/functions';
import SM from '@bj-nsc/sm2';
import { Button, Col, Form, Input, Row } from 'antd';
import JSEncrypt from 'jsencrypt';
import request from 'nsc-request';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import md5 from 'md5';
import Cookies from 'js-cookie';
import { LoginAuthorization, salt } from '../../constants';
import SliderCaptcha from './sliderCaptcha';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isReset, setReset] = useState(false);

  const [captchaData, setCaptchaData] = useState({});
  const [sliderCaptchaData, setSliderCaptchaData] = useState({});

  useEffect(() => {
    const fetchCaptchaType = async () => {
      const res = await request('/api/security/captcha/type');
      if (res && res.data) {
        setCaptchaData(res.data);
      }
    };
    fetchCaptchaType();
  }, []);

  // 获取publicKey和publicRandom
  const fetchRsaData = async () => {
    const res = await request('/api/security/encrypt/rsa');
    if (res && res.data) {
      return res.data;
    }
    return {};
  };

  // 滑块验证成功回调
  const successCallback = data => {
    const { sceneSite } = captchaData;
    const nocaptchaData = {
      token: data.token,
      sessionId: data.csessionid,
      sig: data.sig,
      scene: sceneSite,
    };
    setSliderCaptchaData(nocaptchaData);
  };

  const [form] = Form.useForm();

  const [captchaRandom, setCaptchaRandom] = useState(getRandom(7));

  // 提交表单事件
  const onFinish = values => {
    setLoading(true);
    fetchRsaData().then(async rsaData => {
      const crypt = new JSEncrypt();
      crypt.setPublicKey(rsaData.publicKey);
      const newValues = {
        username: SM.SM2.sm2Encrypt(values.username.trim()),
        password: crypt.encrypt(values.password),
      };
      const defaultData = {
        captchaType: captchaData.captchaType,
        signinType: 201,
        type: 'account',
        publicRandom: rsaData.publicRandom,
        captchaRandom,
      };

      const fd = convertFormData(
        Object.assign({}, newValues, defaultData, sliderCaptchaData),
      );
      submitForm(fd);
    });
  };

  // 登录提交表单
  const submitForm = async data => {
    const res = await request('/api/security/signin', {
      data,
      method: 'post',
      headers: {
        Authorization: LoginAuthorization,
      },
    });
    setLoading(false);
    if (res && res.code === 200) {
      const data = res.data;
      const decryptName = SM.SM2.sm2Decrypt(data.additionalInformation.name);
      data.additionalInformation.name = decryptName;
      localStorage.setItem('loginInfo', JSON.stringify(data));
      localStorage.setItem('token', data.value);
      localStorage.setItem('s', md5(data.value + salt));
      Cookies.set('t', data.value, { expires: 30 });
      getServerTime();
    } else {
      setReset(true);
    }
  };

  // 获取服务器时间
  const getServerTime = () => {
    request.get('/comm/get_server_time').then(res => {
      if (res.code === 200) {
        history.push('/');
        localStorage.setItem('serverTime', res.data - Date.now());
      }
    });
  };

  const handleRandomChange = () => {
    setCaptchaRandom(getRandom(7));
  };

  const captchaImg = `/api/security/captcha/image/${captchaRandom}`;

  const renderCaptcha = () => {
    if (isEmptyObj(captchaData)) return null;

    if (captchaData.captchaPcType === 1) {
      return (
        <Row gutter={8}>
          <Col span={24}>
            <SliderCaptcha
              captchaTypes={captchaData}
              isReset={isReset}
              successCallback={successCallback}
            />
          </Col>
        </Row>
      );
    }

    return (
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item name="captcha" rules={[{ required: true }]} noStyle>
            <Input placeholder="验证码" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <a
            title="点击刷新"
            onClick={handleRandomChange}
            style={{ width: 80 }}
          >
            <img src={captchaImg} />
          </a>
        </Col>
      </Row>
    );
  };

  return (
    <div style={{ width: 500, margin: 'auto' }}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="username" label="账号" rules={[{ required: true }]}>
          <Input placeholder="账号" />
        </Form.Item>

        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input placeholder="密码" type="password" />
        </Form.Item>
        <Form.Item label="验证码">{renderCaptcha()}</Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
