import './ConnectedToDB.css';
import { useEffect, useState, useRef } from 'react';
const ConnectedToDB = ({ connected }) => {

	const [ loadingText, setLoadingText ] = useState('loading')
	const intervalObject = useRef();

	useEffect(() => { 
		let counter = 0;
		let str = 'loading ';
		function addDot() {
			counter ++;
			if (counter > 10) {
				counter = 0;
				str = 'loading ';
			}
			str += ". ";
			setLoadingText(str);
		}
		intervalObject.current = setInterval(addDot, 50);
	}, [])

	useEffect(() => {
		if (connected !== undefined) {
			clearInterval(intervalObject.current);
		}
	}, [connected])
	
	

	if (connected === undefined) {
		return ( <span className='db-loading home-db'>{ loadingText }</span> );
	} else if (connected === false) {
		return ( <span className='db-problem home-db'>problem</span> );
	} 
	return ( <span className='db-connected home-db'>connected</span> );
}
 
export default ConnectedToDB;