import React from 'react'
import PageLayout from '../../../components/layout-templates/PageLayout';
import Rainbow from './experiments/Rainbow';
export default class CSS_Experiments extends React.Component {
    state = {
        active: 'rainbow',
        buttons: ['rainbow']
    }
    onChange = (string) => {   
        this.setState({active: string})
    }
    render() {
    
        let activeComponent;
        if (this.state.active === 'rainbow') {
        activeComponent = <Rainbow />
        } 
        return  <PageLayout activeString={this.state.active} buttons={this.state.buttons} activeComponent={activeComponent} onChange={this.onChange} />
    }
    }
