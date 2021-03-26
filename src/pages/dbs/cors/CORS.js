import React from 'react'
import PageLayout from '../../../components/layout-templates/PageLayout';
import AWSCORS from './aws/AWSCORS';

export default class CRUD extends React.Component {
    state = {
        active: 'aws',
        buttons: ['aws', 'preflight']
      }
      onChange = (active) => {   
       this.setState({active})
      }
    render() {
        let activeComponent;
        if (this.state.active === 'aws') {
          activeComponent = <AWSCORS />
        } 
         return (
           <PageLayout 
            activeString={this.state.active} 
            buttons={this.state.buttons} 
            onChange={this.onChange} 
            activeComponent={activeComponent}
            />
        )
    }
   
}
