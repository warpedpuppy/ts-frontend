import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Home extends Component {
  render() {
    return (
      <>
        <dl>
            <dt>css</dt>
                <dd>
                    <dt>color units</dt>
                        <dd><Link to="/css/color/hexidecimal">hexadecimal</Link></dd>
                    <dt>font units</dt>
                </dd>
            <dt>dbs</dt>
                <dd>graphql</dd>
                <dd>postresql</dd>
                <dd>mongo</dd>
        </dl>


      </>
    );
  }
}
