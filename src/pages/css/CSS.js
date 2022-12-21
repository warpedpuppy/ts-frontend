import { useState } from 'react';
import './CSS.css';
import { Routes, Route } from 'react-router-dom'
import Color from './color/Color';
import Layout from './layout/Layout';
import UnitsOfMeasurement from './units-of-measurement/UnitsOfMeasurement';
import Submenu from '../../components/layout-templates/SubMenu';
import CSS_EXPERIMENTS from './css_experiments/CSS_Experiments';
import CSSLanding  from './landing/CSSLanding';
import NotFound from '../NotFound';
const CSS = () =>  {
	
	const [ active, setActive ] = useState('color')
	const categories = ['color', 'layout', 'units-of-measurement', 'experiments'];
	return (
		<section className="css-page">
			<Submenu 
				active={ active }
				title={`css - ${ active }`} 
				setActive={ setActive }
				menuItems={ categories } 
			/>
			<Routes>
				<Route index element={ <CSSLanding /> } />
				<Route path='color/*' element={ <Color /> } />
				<Route path='layout/*' element={ <Layout /> } />
				<Route path='experiments/*' element={ <CSS_EXPERIMENTS /> } />
				<Route path='units-of-measurement/*' element={ <UnitsOfMeasurement /> } />
				<Route path='*' element={ <NotFound /> }/>
			</Routes>
		</section>
	);

}
export default CSS;