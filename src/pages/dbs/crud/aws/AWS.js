import React from 'react';
import CrudBody from '../components/CrudBody';
import AWSServices from '../../../../services/aws-services';

export default function AWS () {
    return <CrudBody service={AWSServices} />;
}
