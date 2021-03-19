import React from 'react';

const AppContext = React.createContext({
    browserWidth: 0,
    browserHeight: 0,
    loggedIn: false
})
export default AppContext;