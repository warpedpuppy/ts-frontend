import React from 'react';
import CrudBody from '../components/CrudBody';
import MongoServices from './services/mongo-services';

export default function Mongo () {
    return <CrudBody service={MongoServices} />;
}
