import React, { Component } from 'react';

export default class CRUDAdmin extends Component {
  render() {
    return (
      <div> 
         <ul>
          <li>aws postgres db record count: </li>
          <li>heroku postgres db record count: </li>
          <li>empty mongoatlas db record count: </li>
          <li>local postgres db record count: </li>
          <li>local mongo db record count: </li>
        </ul>
        <ul>
          <li><button>empty aws postgres db</button></li>
          <li><button>empty heroku postgres db</button></li>
          <li><button>empty mongoatlas db</button></li>
          <li><button>empty local postgres db</button></li>
          <li><button>empty local mongo db</button></li>
        </ul>
      </div>
    );
  }
}
