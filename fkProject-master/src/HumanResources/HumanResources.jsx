import React, { useState } from 'react'
import '../index.css';
import { Link } from 'react-router-dom';

export default function SideNavbar() {
    const [isExpanded, setExpanded] = useState(false);
    const menuItems = [
		{
			text: "User",
			icon: "icons/user.png",
			to:"user"
		},
		{
			text: "Salary",
			icon: "icons/salary.png",
			to:"salary"
		},
		{
			text: "Application",
			icon: "icons/application.png",
			to:"application"
		},
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
			text: "Country",
			icon: "icons/country.png",
			to:"country"
		},
        {
			text: "State",
			icon: "icons/state.png",
			to:"state"
		},
        {
			text: "City",
			icon: "icons/city.png",
			to:"city"
		},
	];
  return (
    <div className={isExpanded? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
        <div className="nav-upper">
            <div className="nav-heading">
                <div className="nav-brand">
                    <img src='icons/hr.png' alt='nav-brand'></img>
                    <h3>HR</h3>
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
                        <img src={icon} alt='icon' className='icon-img'></img>
                        {isExpanded && <p>{text}</p>}
				    </Link> 
                ))}
            </div>
        </div>
    </div>
  )
}
