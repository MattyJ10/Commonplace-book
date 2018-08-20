import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyNavBar from './components/NavBar/navBar';

class App extends React.Component {
	render() {
		return (
			<MyNavBar />
		);
	}
		
}

ReactDOM.render( <App />, document.getElementById('root'));