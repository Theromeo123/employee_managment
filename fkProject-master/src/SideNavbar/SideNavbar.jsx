import React, { useState } from 'react'
import '../index.css';
import { Link } from 'react-router-dom';

export default function SideNavbar() {
    const [isExpanded, setExpanded] = useState(false);
    const menuItems = [
		{
			text: "Role",
			icon: "icons/role.png",
            to:"role"
		},
		{
			text: "Position",
			icon: "icons/position.png",
            to:"position"
		},
		{
			text: "Department",
			icon: "icons/department.png",
            to:"department"
		},
		{
			text: "Project Bidding",
			icon: "icons/bidding.png",
            to:"project_bidding"
		},
		{
			text: "Portal Master",
			icon: "icons/portal.png",
            to:"portal_master"
		},
	];
  return (
    <div className={isExpanded? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
        <div className="nav-upper">
            <div className="nav-heading">
                <div className="nav-brand">
                    <i class="fa fa-user-circle me-3"></i>
                    <h3 className='h3'>Admin</h3>
                </div>
                <button className={isExpanded? 'hamburger hamburger-in' : 'hamburger hamburger-out'}
                onClick={() => setExpanded(!isExpanded)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div className="nav-menu">
                {menuItems.map(({text, icon,to}) => (
                    <Link to={to} className={isExpanded ? 'menu-item' : 'menu-item menu-item-NX'}>
                        <img src={icon} alt='icon'></img>
                        {isExpanded && <p>{text}</p>}
                   </Link>
                ))}
            </div>
        </div>
    </div>
  )
}
