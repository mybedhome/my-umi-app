import React, { PureComponent } from 'react';

export default props => {
  console.log('props', props);
  return (
    <div>
      <h1>test page2</h1>
      <h2>param参数 id: {props.match.params.id}</h2>
      <h3>query参数 {JSON.stringify(props.location.query)} </h3>
    </div>
  );
};
