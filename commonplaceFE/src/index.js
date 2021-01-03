import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyNavBar from './Components/NavBar/navBar';
import { Provider } from "react-redux";
import store from './Redux/store';
import DisplayMessage from './Components/DisplayMessage/displayMessage';

class App extends React.Component {
	render() {
		return [
			<MyNavBar key="navBar"/>,
			<DisplayMessage
				key="error-display"
				interval={4900}
			></DisplayMessage>
		];
	}
}

ReactDOM.render( 
	<Provider store={store}>
		<App/>
	</Provider>
	, document.getElementById('root'));