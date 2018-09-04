import React from 'react'; 
import './Features.css'; 

export default class Features extends React.Component {
	render() {
		return(
			<div className="features">
				<div className="feature">
					<h1 className="h1f">Easy Lookup</h1>
					<p className="pf">Easily search/sort your saved cards based on category, content, source and more.</p>
				</div>
				<div className="feature">
					<h1 className="h1f">Favorites</h1>
					<p className="pf">Keep track of your favorite cards by favoiriting them. These cards will be presented to you at the top of your page and can be changed at any time
					based on which ones you want to focus on.</p>
				</div>
				<div className="feature">
					<h1 className="h1f">Reminders</h1>
					<p className="pf">Set reminders for various times of day to send you specified quotes while you are away from your computer. </p>
				</div>

			</div>
		)
	}
}