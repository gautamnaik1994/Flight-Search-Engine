import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/app';

const MainRoute = () => (
	<Router>
		<Route path="/" component={App} />
	</Router>
);
export default hot(module)(MainRoute);
