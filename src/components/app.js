import React, { Component, Fragment } from 'react';
import '../styles/app.scss';

import { ROUNDTRIP, BASE_URL } from './helpers/constants';
import { getDayfromDate, getTimeFromDate } from './helpers/utils';
import Loader from './common/Loader';
import SearchBox from './Searchbox/SearchBox';
import FlightList from './FlightList/FlightList';
import SearchParameters from './SearchParameters/SearchParameters';
import MessageBox from './common/MessageBox';
import Sorry from '../images/sorry.svg';
import Airplane from '../images/airplane.svg';

class App extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		filteredList: [],
		isRoundTrip: false,
		loading: undefined,
		error: false,
		errorMessage: '',
	};

	findFlight = filters => {
		const isRoundTrip = filters.flightType == ROUNDTRIP;
		const departureDay = getDayfromDate(filters.departureDate);
		const returnDay = isRoundTrip ? getDayfromDate(filters.returnDate) : '';

		let url = `${BASE_URL}flights?origin=${filters.origin.toUpperCase()}&destination=${filters.destination.toUpperCase()}`;
		this.setState({
			loading: true,
			isRoundTrip,
			error: false,
			filters,
		});

		fetch(url)
			.then(res => {
				if (res.ok) {
					return res;
				} else {
					throw Error(`Request rejected with status ${res.status}`);
				}
			})
			.then(res => res.json())
			.then(flights => {
				const filteredList = flights.filter(flight => {
					if (flight.operationalDays.includes(7)) {
						return true;
					} else if (
						!isRoundTrip &&
						flight.operationalDays.includes(departureDay)
					) {
						return true;
					} else if (
						isRoundTrip &&
						flight.operationalDays.includes(departureDay) &&
						flight.operationalDays.includes(returnDay)
					) {
						return true;
					}
				});

				filteredList.forEach(flight => {
					flight.price =
						flight.price * filters.passengerCount * (isRoundTrip ? 2 : 1);
					flight.departure = getTimeFromDate(flight.departure);
					flight.arrival = getTimeFromDate(flight.arrival);
				});
				this.setState({
					filteredList,
					loading: false,
				});
			})
			.catch(error => {
				this.setState({
					loading: false,
					error: true,
					errorMessage: error,
				});
			});
	};

	renderFlightList = () => {
		if (this.state.error) {
			return (
				<div className="card no-data">
					<MessageBox
						text="Sorry, We have encountered a error"
						subText={this.state.errorMessage}
						icon={Sorry}
					/>{' '}
				</div>
			);
		}
		if (this.state.loading === undefined) {
			return (
				<div className="card no-data">
					<MessageBox
						text="Welcome to Flight Search"
						subText="Tell us where you want to go"
						icon={Airplane}
					/>
				</div>
			);
		}
		if (this.state.loading) {
			return <Loader />;
		}
		if (this.state.filteredList.length == 0) {
			return (
				<div className="card no-data">
					<MessageBox
						text="Looks like there are no flights available"
						subText="Try changing the date or location"
						icon={Sorry}
					/>{' '}
				</div>
			);
		} else {
			return (
				<Fragment>
					<SearchParameters data={this.state.filters} />
					<FlightList
						filteredList={this.state.filteredList}
						isRoundTrip={this.state.isRoundTrip}
					/>
				</Fragment>
			);
		}
	};

	render() {
		return (
			<div className="landing-page">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<SearchBox onFindFlightClick={this.findFlight} />
						</div>
						<div className="col-lg-8">{this.renderFlightList()}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
