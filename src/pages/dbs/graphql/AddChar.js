import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import Utils from '../../../services/Utils';
import Faker from 'faker';
import Mutations from './services/mutations';
export default function AddChar(props) {

    // const ADD_CHARS = gql`
    // mutation createCharacter {
    //     createCharacter(input: {
    //         name: "${Faker.name.findName()}",
    //         color: "${ Utils.randomHex() }"
    //     }) {
    //         name
    //         color
    //     }
    // }`;
    // const [addChar] = useMutation(ADD_CHARS, {
    //     refetchQueries: [
    //         {
    //             query: props.GET_CHARS
    //         }
    //     ]
    // });


    return (
        <div>
            <Button onClick={e => Mutations.addChar()}>create</Button>
        </div>
    )
}
