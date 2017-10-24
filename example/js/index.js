import React from 'react';
import { render } from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {

    const mountNode = document.querySelector('section.app');
    render(<div>Hi</div>, mountNode);

});
