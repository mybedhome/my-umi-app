import React, { PureComponent } from 'react';
import { connect, useModel, Link } from 'umi';

const Demo = props => {
  console.log('app state', props.app);
  const data = useModel('useTest');
  console.log('data', data);

  const handleClick = () => {
    data.setCode(200);
    data.setData([1, 3]);
  };
  return (
    <div>
      <h1 onClick={handleClick}>demo page</h1>
      <Link to="/test">跳转test</Link>
    </div>
  );
};

export default connect(({ app }) => ({ app }))(Demo);
