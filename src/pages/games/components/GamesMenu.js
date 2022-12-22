import React from 'react'
import './GamesMenu.css'
import SiteContext from '../GamesContext'
import { useNavigate } from "react-router-dom";
const Menu = () =>  {
	const navigate = useNavigate();

    const goto = (url) => {
     navigate(url);
    }

	return (
		<nav id="games-nav">
			<span onClick={() => goto('/games')}>exit</span>
		</nav>
	)
}
export default Menu;
