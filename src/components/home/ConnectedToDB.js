import './ConnectedToDB.css';
import { useEffect, useState } from 'react';
const ConnectedToDB = ({ connected }) => {

	const [ loadingText, setLoadingText ] = useState('loading')
	let counter = 0;
	let str = 'loading ';
	let obj;
	useEffect(() => {
		obj = setInterval(addDot, 50);
	}, [])

	useEffect(() => {
		if (connected !== undefined) {
			clearInterval(obj);
		}
	}, [connected])
	
	function addDot() {
		clearInterval(obj);
		counter ++;
		if (counter > 10) {
			counter = 0;
			str = 'loading ';
		}
		str += ". ";
		setLoadingText(str);
	}

	if (connected === undefined) {
		return ( <span className='db-loading home-db'>{ loadingText }</span> );
	} else if (connected === false) {
		return ( <span className='db-problem home-db'>problem</span> );
	} 

	return ( <span className='db-connected home-db'>connected</span> );
}
 
export default ConnectedToDB;