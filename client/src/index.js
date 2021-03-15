import React from 'react';
import ReactDOM from 'react-dom';
import LoadingMetaMask from 'components/Custom/LoadingMetaMask';
import StyleLayout from 'components/Base/StyleLayout';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/fonts/fonts.css';

ReactDOM.render(
  <StyleLayout>
    <LoadingMetaMask/>
  </StyleLayout>,
  document.getElementById('root'),
);
