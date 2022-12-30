import React, { useState, useEffect } from 'react';
import './About.css';
import AboutText from './components/AboutText';
const About = () =>  {

	const [ yearsWorking, setYearsWorking ] = useState(0)

	useEffect(() => {
		let date = new Date();
		let currentYear = date.getFullYear();
		setYearsWorking(currentYear - 2004)
	}, [])
	return (
		<>
			<AboutText yearsWorking={yearsWorking} />
			<span id="see-admin-login">🤪</span>
		</>
	)
   
}
export default About;