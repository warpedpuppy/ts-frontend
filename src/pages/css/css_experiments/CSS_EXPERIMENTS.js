import React from 'react'
import PageLayout from '../../../components/layout-templates/PageLayout';
import FallingSigns from './experiments/FallingSigns';
import Rainbow from './experiments/Rainbow';
export default class CSS_Experiments extends React.Component {
    state = {
        active: 'rainbow',
        buttons: ['rainbow', 'falling signs']
    }
    onChange = (string) => {   
        this.setState({active: string})
    }
    render() {
    
        let activeComponent;
        if (this.state.active === 'rainbow') {
            activeComponent = <Rainbow />
        } else {
            activeComponent = <FallingSigns />
        }
        return  <PageLayout activeString={this.state.active} buttons={this.state.buttons} activeComponent={activeComponent} onChange={this.onChange} />
    }
    }
