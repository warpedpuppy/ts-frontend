import './ConnectedToDB.css';

const ConnectedToDB = ({connected}) => {

	if (connected === undefined) {
		return ( <span>loading</span> );
	} else if (connected === false) {
		return ( <span>problem</span> );
	} 
	return ( <span>connected</span> );
}
 
export default ConnectedToDB;