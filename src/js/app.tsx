import React from "react";
import Home from "./pages/home";
import ReactDOM from "react-dom/client";
import Page from "./pages/page";
import Chapters from "./pages/chapters";
import Editor from "./pages/editor";
import { HashRouter, Route, Routes, useParams } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";

// @ts-ignore
import AmplifyConfiguration from '../amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';
Amplify.configure(AmplifyConfiguration);

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/editor" Component={Editor} />
                <Route path="/editor/:id" Component={Editor} />
                <Route path="/chapters" Component={Chapters} />
                <Route path="/page/:id" Component={Page} />
            </Routes>
        </HashRouter>
    );
};

const AuthenticatedApp: React.FC = withAuthenticator(App);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<AuthenticatedApp />);
