import React from 'react'; 
import './Description.css'; 

export default class Description extends React.Component {
	render() {
		return(
			<div className="desc">
				<h2>What Is A Commonplace Book?</h2>
				<p>A commonplace book is way for you to keep track of any interesting/useful tidbits of information you come across. Often times, it can be hard to read through a book 
				and remember everything that you found valuable from that text. This app will provide a clean and organized way to store all the pieces of wisdom you don't want to forget!
				</p> 
			</div>
		)
	}
}