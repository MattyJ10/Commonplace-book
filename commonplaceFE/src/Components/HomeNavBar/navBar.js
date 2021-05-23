import React from 'react'; 
import './navBar.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import Home from '../Home/home'; 
import Dashboard from '../../Screens/Dashboard/Dashboard'; 

export default class MyNavBar extends React.Component {
  
	render() {
		return(
			<Router>
				<div>
					<div className="navbar">
						<ul className="left">
							<li><Link to="/">Home</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
							<li><Link to="/about">About</Link></li>
						</ul>
						<ul className="right">
							<li><Link to="/sign-up">Sign Up</Link></li>
							{/* <li><Link to="/login">Login</Link></li> */}
							<li><Link to="/dashboard">Login</Link></li>
						</ul>
						
					</div>
					<Route exact path="/" component={Home} />
					<Route exact path="/dashboard" component={Dashboard} />
				{/*add other routes here as you create components */}
				</div>
			</Router>
		);
	}
}
