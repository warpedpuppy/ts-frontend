import { useEffect } from 'react'
import './SubMenu.css';
import { useNavigate } from "react-router-dom";
const SubMenu = props =>  {
	const navigate = useNavigate();
   
	useEffect(() => {
		navigate(`${props.active}`);
	})

    const clickHandler = (e) => {
        e.preventDefault();
		navigate(`${e.target.innerHTML}`);
		props.setActive(e.target.innerHTML)
        document.getElementById('sub-checkbox').checked = false;
    }

	return (
		<nav className="nav-wrapper sub">
			<div className="nav-brand">{ props.title }</div>
			<input className="nav-hamburger" id="sub-checkbox" type="checkbox" />
			<div className="nav-hamburger-spans sub">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className="nav-links">
				{
					props.menuItems.map( (item, index) => <div key={index} onClick={ clickHandler }>{item}</div> )
				}
			</div>
		</nav>
	)
    
    
}
export default SubMenu;
