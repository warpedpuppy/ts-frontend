import { render, screen } from '@testing-library/react';
import CRUD from '../pages/dbs/crud/CRUD';
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom';

describe("<CRUD /> component", () => {
    let CRUDWrapper;
    beforeAll(() => {
        CRUDWrapper = mount(<Router><CRUD /></Router>);
    });
    test('renders', () => {
        console.log(CRUDWrapper)
        // const eventObject = { };
        // CRUDWrapper.find("#create-button").simulate("click", eventObject);

    });

});

