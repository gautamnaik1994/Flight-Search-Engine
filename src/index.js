import React from 'react';
import ReactDOM from 'react-dom';
import MainRoute from './router';

function init() {
	if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('/sw.js')
				.then(registration => {
					console.log('SW registered: ', registration);
				})
				.catch(registrationError => {
					console.log('SW registration failed: ', registrationError);
				});
		});
	}
}

ReactDOM.render(<MainRoute />, document.getElementById('root'));
init();
