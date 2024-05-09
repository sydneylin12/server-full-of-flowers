import AmplifyConfiguration from '../amplifyconfiguration.json';
import React from "react";
import Home from "./pages/home";
import ReactDOM from "react-dom/client";
import Page from "./pages/page";
import Chapters from "./pages/chapters";
import Editor from "./pages/editor";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';

// Use the service's auth config
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

const AuthenticatedApp: React.FC = () => (
    <Authenticator>
        <App />
    </Authenticator>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<AuthenticatedApp />);
