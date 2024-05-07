import React from "react";
import Home from "./pages/home";
import ReactDOM from "react-dom/client";
import Page from "./pages/page";
import Chapters from "./pages/chapters";
import Editor from "./pages/editor";
import { HashRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/editor" Component={Editor} />
                <Route path="/chapters" Component={Chapters} />
                <Route path="/page" Component={Page} />
            </Routes>
        </HashRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
