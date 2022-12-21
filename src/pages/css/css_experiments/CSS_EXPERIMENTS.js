import { useState } from 'react';
import PageLayout from '../../../components/layout-templates/PageLayout';
import FallingSigns from './experiments/FallingSigns';
import Rainbow from './experiments/Rainbow';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../NotFound';

const CSS_Experiments = () =>  {
   
	const [ active, setActive ] = useState('rainbow')
	const categories = ['rainbow', 'falling-signs'];

	return (
		<Routes>
			<Route path="/" element={ <PageLayout active={active} categories={categories} setActive={setActive} /> } >
				<Route path='rainbow' element={ <Rainbow /> }/>
				<Route path='falling-signs' element={ <FallingSigns /> }/>
				<Route path='*' element={ <NotFound /> }/>
			</Route>
		</Routes>
	)

}
export default CSS_Experiments;