import React, { useState } from 'react';
import PageLayout from '../../components/layout-templates/PageLayout';
import MazeSolver from './mazeSolver/MazeSolver';
import RecursivePermutation from './recursivePermutation/RecursivePermutation';
// import EveryCombo from './everyCombo/EveryCombo';
// import ObjectPooling from './objectPooling/ObjectPooling';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../NotFound';
const JS = props => {
  
	const [ active, setActive ] = useState('maze-solver-code')
	const categories = ['maze-solver-code', 'recursive-permutation'];
	return (
		<Routes>
			<Route path="/" element={ <PageLayout active={active} categories={categories} setActive={setActive} /> } >
				<Route path='maze-solver-code' element={ <MazeSolver /> }/>
				<Route path='recursive-permutation' element={ <RecursivePermutation /> }/>
				<Route path='*' element={ <NotFound /> }/>
			</Route>
		</Routes>
	)
}
export default JS;
