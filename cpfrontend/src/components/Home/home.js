import React from 'react'; 
import './home.css'; 
import Description from '../Description/Description'; 

import Features from '../Features/Features'; 


export default class Home extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="banner"> 
					<h1 className="title">Common Place</h1>
				</div>
				<Description />
				<Features />
			</div>
		);
	}
}