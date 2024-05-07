import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
    <div className="header">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/editor">Editor</Link>
        <Link className="link" to="/chapters">Chapters</Link>
    </div>
);

export default Header;
