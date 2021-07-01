import React from 'react';
import CrudBody from '../components/CrudBody';
import PostgresqlServices from '../../../../services/postgresql-services';
import AppContext from '../../../../AppContext';

export default class PostgresQL extends React.Component {
    componentDidMount = () => {
        PostgresqlServices.setUserId(this.context.userID);
    }
    render () {
        return <CrudBody service={PostgresqlServices} />;
    }
}
PostgresQL.contextType = AppContext;