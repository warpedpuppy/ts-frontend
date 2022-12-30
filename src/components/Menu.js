import { Link } from 'react-router-dom';
import './Menu.css';
import { useNavigate } from "react-router-dom";
const Menu = () => {
	const navigate = useNavigate();
    const clickHandler = (e) => {
        let route = e.target.innerText;
        navigate(`/${route}`);
        document.getElementById('main-checkbox').checked = false;
    }

    return (
        <nav className="nav-wrapper">
            <Link to="/" className="nav-brand">trying something</Link>
            <input className="nav-hamburger" id="main-checkbox" type="checkbox" />
            <div className="nav-hamburger-spans">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="nav-links">
                <div onClick={clickHandler}>css</div> 
                <div onClick={clickHandler}>js</div>
                <div onClick={clickHandler}>dbs</div>
                <div onClick={clickHandler}>games</div>
                {/* <div >art</div> */}
                <div onClick={clickHandler}>about</div>
            </div>
        </nav>
    )

}
export default Menu; 
