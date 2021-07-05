import React from 'react';
import CrudBody from '../components/CrudBody';
import AWSServices from '../../../../services/aws-services';
import AppContext from '../../../../AppContext';

export default class AWS extends React.Component {
    componentDidMount = () => {
        console.log(this.context.userID)
        AWSServices.setUserID(this.context.userID)
    }
    render() {
        return <CrudBody service={AWSServices} />;
    }
}
AWS.contextType = AppContext;