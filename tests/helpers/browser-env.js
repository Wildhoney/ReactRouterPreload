import browserEnv from 'browser-env';

browserEnv(['window', 'document', 'navigator', 'requestAnimationFrame'], { url: 'http://www.example.org/example' });
global.requestAnimationFrame = cb => cb();
