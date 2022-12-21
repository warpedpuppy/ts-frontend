import { useState } from 'react';
import Grid from './grid/Grid';
import Flex from './flex/Flex';
import { Routes, Route } from 'react-router-dom';
import PageLayout from '../../../components/layout-templates/PageLayout';
import NotFound from '../../NotFound';
const Layout = props => {
  
	const [ active, setActive ] = useState('grid')
	const categories = ['flex', 'grid'];

	return (
		<Routes>
			<Route path="/" element={ <PageLayout active={active} categories={categories} setActive={setActive} /> } >
				<Route path='flex' element={ <Flex /> }/>
				<Route path='grid' element={ <Grid /> }/>
				<Route path='*' element={ <NotFound /> }/>
			</Route>
		</Routes>
	)
}
export default Layout;