import React, { PureComponent } from 'react';
import { connect } from 'umi';

const Demo = props => {
  console.log('app state', props.app);
  return <h1>demo page</h1>;
};

export default connect(({ app }) => ({ app }))(Demo);
