import React from 'react';
import ReactDOM from 'react-dom';
import CMSEditor from './CMSEditor';

document.addEventListener('DOMContentLoaded', () => {
  let rootNode = document.createElement('div');
  document.body.appendChild(rootNode);
  ReactDOM.render(
    <CMSEditor />,
    rootNode,
  );
});
