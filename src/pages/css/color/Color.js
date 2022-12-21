import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hexadecimal from './hexadecimal/Hexadecimal';
import HSL from './hsl/HSL';
import RGB from './rgb/RGB';
import PageLayout from '../../../components/layout-templates/PageLayout';
const Color = () =>  {

	const [ active, setActive ] = useState('hexadecimal')
	const categories = ['hexadecimal', 'hsl', 'rgb'];

	return (
		<Routes>
			<Route path="/" element={ <PageLayout active={active} categories={categories} setActive={setActive} /> } >
				<Route path='hexadecimal' element={ <Hexadecimal /> }/>
				<Route path='hsl' element={ <HSL /> }/>
				<Route path='rgb' element={ <RGB /> }/>
				<Route path='*' element={ <h1>not found 2</h1> }/>
			</Route>
		</Routes>
	)
}
export default Color;