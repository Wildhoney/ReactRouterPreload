import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import express from 'express';
import base64 from 'base-64';
import compression from 'compression';
import render from '../js/server';

const app = express();

app.get(/\.html$/i, async (request, response) => {

    const html = readFileSync(`${__dirname}/../index.html`, 'utf8');
    const dom = new JSDOM(html);
    const mountNode = dom.window.document.querySelector('section.app');
    const { layout, state } = await render(request.url);

    const scriptNode = dom.window.document.createElement('script');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.innerHTML = `window.__STATE__ = '${base64.encode(JSON.stringify(state))}'`;
    dom.window.document.head.appendChild(scriptNode);

    mountNode.innerHTML = layout;
    response.send(dom.serialize());

});

app.use(compression());
app.use(express.static(`${__dirname}/..`));
app.listen(process.env.PORT || 8080);
