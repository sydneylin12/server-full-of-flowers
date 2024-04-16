import React from 'react';
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="home"></div>';

// Render your React component instead
// @ts-ignore
const root = createRoot(document.getElementById('home'));

root.render(
    <div className="header">
        <a className="link" href="./home.html">Home</a>
        <a className="link" href="./editor.html">Editor</a>
        <a className="link" href="./chapters.html">Chapters</a>
    </div>
);