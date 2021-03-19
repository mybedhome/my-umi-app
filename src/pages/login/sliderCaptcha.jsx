/*
 * @Descripttion:
 * @version:
 * @Author: rxzhu
 * @Date: 2020-12-02 18:48:16
 * @LastEditors: rxzhu
 * @LastEditTime: 2020-12-08 18:14:25
 */
import { getRandom } from '@bj-nsc/functions';
import React, { PureComponent } from 'react';
import './nocaptcha.css';
class SliderCaptcha extends PureComponent {
  static defaultProps = {
    isReset: false, // 是否重置滑块验证器
  };

  nc = null;

  state = {
    containerId: 'captcha-container-' + getRandom(5),
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (this.nc === null) {
      this.init();
    }

    if (
      this.nc &&
      this.props.isReset !== prevProps.isReset &&
      this.props.isReset
    ) {
      this.resetNoCaptcha();
    }
  }

  init() {
    const { captchaTypes } = this.props;
    if (this.nc === null && captchaTypes && captchaTypes.appKeySite) {
      this.loadNoCaptchaJs();
    }
  }

  // 重置滑块
  resetNoCaptcha() {
    if (this.nc) {
      this.nc.reload();
    }
  }

  loadNoCaptchaJs() {
    const scriptNode = document.createElement('script');
    scriptNode.src = '//g.alicdn.com/sd/ncpc/nc.js?t=2015052012';
    scriptNode.type = 'text/javascript';
    scriptNode.onload = () => {
      this.initNoCaptcha();
    };
    document.querySelector('head').appendChild(scriptNode);
  }

  initNoCaptcha() {
    const { appKeySite, sceneSite } = this.props.captchaTypes || {};
    const nc_token = ['appKeySite', new Date().getTime(), Math.random()].join(
      ':',
    );

    const NC_Opt = {
      renderTo: '#' + this.state.containerId,
      appkey: appKeySite,
      scene: sceneSite,
      token: nc_token,
      customWidth: (300 * 100) / window.innerWidth + 'vw',
      trans: { key1: 'code0' },
      elementID: ['usernameID'],
      is_Opt: 0,
      language: 'cn',
      isEnabled: true,
      timeout: 5000,
      times: 5,
      callback: data => {
        const { successCallback } = this.props;
        successCallback && successCallback(data);
        document.querySelector('.nc_bg').style.width = '100%';
      },
    };
    this.nc = new noCaptcha(NC_Opt);
    this.nc.upLang('cn', {
      _startTEXT: '向右滑动验证',
      _yesTEXT: '验证通过',
      _error300:
        '哎呀出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
      _errorNetwork:
        '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>',
    });
  }

  render() {
    const { containerId } = this.state;
    return <div id={containerId} className={'nc-container'}></div>;
  }
}

export default SliderCaptcha;
