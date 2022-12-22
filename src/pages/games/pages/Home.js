import { useEffect } from 'react'
import './Home.css'
import HomeButtons from '../animations/homeAnimations/home_buttons'
import Spinners from '../components/Spinners';
import Assets from '../animations/utils/assetCreation';
import { useNavigate } from "react-router-dom";

const Home = () =>  {

	const navigate = useNavigate();
	let home_buttons;
	useEffect (() => {
		Assets.init();
		home_buttons = HomeButtons(showButtons)
		home_buttons.init()
	}, [])

	const showButtons = () => {
		document.getElementById('home_page').style.display = "block";
		document.getElementById('home-page-spinners').style.display = "none";
	}

	const gotoGame = (game) => {
		// home_buttons.stop();
		navigate(game);
	}

    return (
      <>
      <div id="home-page-spinners"><Spinners /></div>
      <div className="general-page-layout" id="home_page">
      
        <div className="home-page-buttons">
          <div
            id="tab_1"
            tabIndex="0"
            role="button"
            aria-controls="tabpanel_1"
            className="home-button-cont"
            // onKeyPress={(e) => keyHitHandler(e, 'fly-game')}
           	onClick={(e) => gotoGame('/games/fly-game')}
          >
            <div className="gameShell fly" id="fly-home" />
            <div className="screen" />
          </div>

          <div
            id="tab_2"
            tabIndex="0"
            role="button"
            aria-controls="tabpanel_2"
            className="home-button-cont"
            // onKeyPress={(e) => keyHitHandler(e, 'jump-game')}
           onClick={(e) => gotoGame('/games/jump-game')}
          >
            <div className="gameShell jump" id="jump-home" />
            <div className="screen" />
          </div>



          <div
            id="tab_3"
            tabIndex="0"
            role="button"
            aria-controls="tabpanel_3"
            className="home-button-cont"
            // onKeyPress={(e) => keyHitHandler(e, 'swim-game')}
            onClick={(e) => gotoGame('/games/swim-game')}
          >
            <div className="gameShell swim" id="swim-home" />
            <div className="screen" />
          </div>


        </div>
      </div>
      </>
    )

}
export default Home;