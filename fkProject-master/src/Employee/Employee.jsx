import React, { useState } from 'react'
import '../index.css';
import { Link } from 'react-router-dom';

export default function SideNavbar() {
    const [isExpanded, setExpanded] = useState(false);
    const menuItems = [
		{
			text: "Personal Info",
			icon: "icons/info.png",
            to:"personal_info"
		},
		{
			text: "education",
			icon: "icons/education.png",
            to:"education"
		},
		{
			text: "Dependents",
			icon: "icons/dependents.png",
            to:"dependents"
		},
		{
			text: "Work Experience",
			icon: "icons/exp.png",
            to:"work_experience"
		},
		{
			text: "Leave Application",
			icon: "icons/application.png",
            to:"leave_application"
		},
	];
  return (
    <div className={isExpanded? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
        <div className="nav-upper">
            <div className="nav-heading">
                <div className="nav-brand">
                <i class="fas fa-user-friends"></i>
                    <h3 className='h3'>Employee</h3>
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
