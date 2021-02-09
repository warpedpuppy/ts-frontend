import React from 'react';
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import AddChar from './AddChar';
export default function DisplayChars() {

    const CHARS = gql`
    query GetCharacters {
        characters {
          id
          name
          color
        }
      }`;

   



    const { loading, error, data, refetch, networkStatus } = useQuery(CHARS,  {
        notifyOnNetworkStatusChange: true,
      });
    if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        console.log(networkStatus)
    return (
        <>
        {data.characters.map(c => <div key={c.id}>{c.name}</div>)}
        <button onClick={() => refetch()}>Refetch!</button>
        <AddChar GET_CHARS={CHARS} />
        </>
        )
}
