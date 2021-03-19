export const TokenType = 'Bearer';

export const LoginAuthorization = 'Basic Ympuc2NfY2RwX3dlYjpoJERtWm1VNU9sSFA=';

export const PublicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4O/HLH94WtW0o8TwqsJsIJz9BsDRTfJZ9bOXA0SqwsmjxGdVbnFC1p//HuXC2OgjPZ46gwQxDB86QNWQ9UbJUqB4u6XriuY3D6Bt5PeeBMqu85++xD5ky6cyp9By9N1tx8JgOv2y1Jkibm71v7c3CxuHZYoEjo6JyJKTQh90a0QIDAQAB';

export const RegisterPublicKey =
  '041B33EBFF3DF93784C73E34B01446939B76AD71D19B728BB07B8AC00FDA14D20F39B75447BF1EF56F78F211E3EEE29F57CB5EF9F0F35535681B936F6C119AEC58';

// 私钥，对应RegisterPublicKey
export const SM2PrivateKey =
  '39EEA5AC0595474659F16BD7ED2C8CE73F335F887EE0E8EA462306CC3B48EEBD';

export const salt = '7dd5a7eb1014dea4';

//所有菜单分类
export const allMenuType = [
  { name: '全部', key: '' },
  { name: '进度', key: 'project' },
  { name: '队伍', key: 'team' },
  { name: '技术', key: 'technology' },
  { name: '安全', key: 'safe' },
  { name: '质量', key: 'quality' },
  { name: '技经', key: 'expert' },
  { name: '系统配置', key: 'system' },
  { name: '工具', key: 'none' },
  { name: '公共', key: 'common' },
];

export const allStage = [
  { key: 'project_prev', name: '项目前期' },
  { key: 'enginee_prev', name: '工程前期' },
  { key: 'enginee_constuct', name: '工程建设' },
  { key: 'conclusion', name: '总结评价' },
];
