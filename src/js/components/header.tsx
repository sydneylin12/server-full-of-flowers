import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

const Header = () => (
    <div className="header">
        <Link className="header-tab" to="/">Home</Link>
        <Link className="header-tab" to="/editor">Editor</Link>
        <Link className="header-tab" to="/chapters">Chapters</Link>
        <div className="header-tab" onClick={() => signOut()}>Logout</div>
    </div>
);

export default Header;
