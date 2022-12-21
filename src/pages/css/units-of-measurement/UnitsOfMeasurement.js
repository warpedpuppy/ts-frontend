import React, { useState } from 'react';
import PageLayout from '../../../components/layout-templates/PageLayout';
import AbsoluteUnits from './absolute/AbsoluteUnits';
import RelativeUnits from './relative/RelativeUnits';
import FontSpecific from './font-specific/FontSpecific';
import NotFound from '../../NotFound';
import { Routes, Route } from 'react-router-dom';
const UnitsOfMeasurement = props => {

  const [ active, setActive ] = useState('absolute-units')
  const categories = ['font-specific', 'absolute-units', 'relative-units'];

	return (
		<Routes>
			<Route path="/" element={ <PageLayout active={active} categories={categories} setActive={setActive} /> } >
				<Route path='absolute-units' element={ <AbsoluteUnits /> }/>
				<Route path='relative-units' element={ <RelativeUnits /> }/>
				<Route path='font-specific' element={ <FontSpecific /> }/>
				<Route path='*' element={ <NotFound /> }/>
			</Route>
		</Routes>
	)
}
export default UnitsOfMeasurement;