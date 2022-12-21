import { useEffect } from 'react';
import './PageLayout.css';
import { useNavigate, Outlet } from "react-router-dom";
const PageLayout = props => {
	const navigate = useNavigate();
  
	useEffect(() => {
		navigate(`${props.active}`);
	}, [])

    const clickHandler = (e) => {
        e.preventDefault();
		navigate(`${e.target.innerHTML}`);
		props.setActive(e.target.innerHTML)
    }

	return (
		<div className="page"> 
		<aside className="page-menu">
		{
		props.categories.map( (item, index) => <div key={index} className={ item === props.active ? `active` : `` } onClick={clickHandler}>{item}</div>)
		}
		</aside>
		<main className="page-content">
			<Outlet />
		</main>
		</div>
	)
   
}

export default PageLayout;
