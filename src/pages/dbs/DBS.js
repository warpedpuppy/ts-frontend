import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Submenu from '../../components/layout-templates/SubMenu';
import CRUD from './crud/CRUD';
// import JoinPopulate from './JoinPopulate';
// import CORS from './cors/CORS';
import NotFound from '../NotFound';
const DBS = () => {
	const [ active, setActive ] = useState('crud')
	const categories = ['crud'];
	return (
		<section className="css-page">
			<Submenu 
				active={ active }
				title={`dbs - ${ active }`} 
				setActive={ setActive }
				menuItems={ categories } 
			/>
			<Routes>
				<Route index element={ <></> } />
				<Route path='crud/*' element={ <CRUD /> } />
				<Route path='*' element={ <NotFound /> }/>
			</Routes>
		</section>
	);
}
export default DBS;