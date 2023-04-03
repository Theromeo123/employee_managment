import React from "react";
import "./Navbar.css";

function Navbar(props) {
	return (
		<nav className="nav p-3">
            <img src="./icons/1.png"></img>
            <div className="navbar">
            <ul>
            <i class="fa fa-user-circle-o m-0"></i>
            <a style={{color:"white"}}>User user</a>
            </ul>
            </div>
        </nav>
	);
}

export default Navbar;