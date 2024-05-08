import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

const Header = () => (
    <div className="header">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/editor">Editor</Link>
        <Link className="link" to="/chapters">Chapters</Link>
        <div className="link" onClick={() => signOut()}>Logout</div>
    </div>
);

export default Header;
