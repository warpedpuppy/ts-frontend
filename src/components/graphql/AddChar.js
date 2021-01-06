import React from 'react'
import { gql, useMutation } from '@apollo/client';
export default function AddChar(props) {

    const ADD_CHARS = gql`
    mutation createCharacter {
        createCharacter(input: {
            name: "testName${Math.floor(Math.random()*1000).toString()}",
            color: "purple"
        }) {
            name
            color
        }
    }`;
    const [addChar, { data }] = useMutation(ADD_CHARS, {
        refetchQueries: [
            {
                query: props.GET_CHARS
            }
        ]
    });

    return (
        <div>
            <button onClick={e => addChar()}>click me</button>
        </div>
    )
}
