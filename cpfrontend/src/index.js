import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyNavBar from './Components/NavBar/navBar';
import { Provider } from "react-redux";
import store from './Redux/store';
import DisplayErrorMessage from './Components/DisplayErrorMessage/displayErrorMessage';

class App extends React.Component {
	render() {
		return [
			<MyNavBar />,
			<DisplayErrorMessage
				interval={3000}
			></DisplayErrorMessage>
		];
	}
		
}

ReactDOM.render( 
	<Provider store={store}>
		<App/>
	</Provider>
	, document.getElementById('root'));