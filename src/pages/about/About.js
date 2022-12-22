import React, { useState, useEffect } from 'react';
import './About.css';
import APIServices from '../../services/APIServices';
import TokenService from '../../services/TokenService';
import AppContext from '../../AppContext';
import Admin from './components/Admin';
import AboutText from './components/AboutText';
import AdminLogin from './components/AdminLogin';
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