import React from 'react';
import CrudBody from '../components/CrudBody';
import PostgresqlServices from './services/postgresql-services';

export default function PostgresQL () {
 return <CrudBody service={PostgresqlServices} />;
}
