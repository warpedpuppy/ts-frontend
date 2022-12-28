import './ConnectedToDB.css';
import { useEffect, useState } from 'react';
const ConnectedToDB = ({connected}) => {

	const [ loading, setLoading ] = useState(false)
	const [ loadingText, setLoadingText ] = useState('loading')
	const [ timeoutObject, setTimeoutObject ] = useState(undefined)
	
	useEffect(() => {
		startTime();
	}, [])
	

	const startTime = () => {
		if (!loading) {
			setLoading(true);
			let temp = setInterval(addDot, 1000)
			setTimeoutObject(temp);
		}
		
	}
	function addDot() {
		let ran = Math.random()*1000
		setLoadingText(ran)
		
	}
	return ( <span>{ loadingText }</span> );
	
	if (connected === undefined) {
		return ( <span>loading</span> );
	} else if (connected === false) {
		return ( <span>problem</span> );
	} 
	return ( <span>connected</span> );
}
 
export default ConnectedToDB;