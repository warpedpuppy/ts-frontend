import React from 'react';
import CrudBody from '../components/CrudBody';
import MongoServices from '../../../../services/mongo-services';
import AppContext from '../../../../AppContext';

export default class Mongo extends React.Component {

    componentDidMount = () => {
        MongoServices.setUserID(this.context.userID);
    }
    render () {
        return <CrudBody service={MongoServices} />;
    }
}
Mongo.contextType = AppContext;