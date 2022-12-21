import { useState } from 'react';
import PageLayout from '../../../components/layout-templates/PageLayout';
import GraphQL from './graphql/GraphQL';
import Mongo from './mongo/Mongo';
import PostgresQL from './postresql/PostgresQL';
import AWS from './aws/AWS';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../NotFound';

const CRUD = () =>  {
  
	const [ active, setActive ] = useState('graphql')
	const categories = ['graphql', 'postgresql', 'mongo', 'serverless-aws'];

	return (
		<Routes>
			<Route path="/" element={ <PageLayout active={ active } categories={categories} setActive={setActive} /> } >
				<Route path='graphql' element={ <GraphQL /> }/>
				<Route path='postgresql' element={ <PostgresQL /> }/>
				<Route path='mongo' element={ <Mongo /> }/>
				<Route path='serverless-aws' element={ <AWS /> }/>
				<Route path='*' element={ <NotFound /> }/>
			</Route>
		</Routes>
	)
   
}
export default CRUD;