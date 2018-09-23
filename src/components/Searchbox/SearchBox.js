import React, { Component, Fragment } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import CustomRadio from '../common/CustomRadio';
import { ROUNDTRIP, SINGLETRIP } from '../helpers/constants';
import Airplane from '../../images/airplane.svg';

class SearchBox extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		flightType: SINGLETRIP,
		departureDate: '',
		returnDate: '',
		origin: '',
		destination: '',
		passengerCount: 1,
		errors: {
			departureDate: '',
			returnDate: '',
			origin: '',
			destination: '',
			passengerCount: '',
		},
	};

	handleInputChange = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};
	handleValidation = () => {
		let fields = this.state;
		let errors = {
			departureDate: '',
			returnDate: '',
			origin: '',
			destination: '',
			passengerCount: '',
		};
		let formIsValid = true;

		if (fields.origin === '') {
			formIsValid = false;
			errors['origin'] = 'Cannot be empty';
		}
		if (fields.destination === '') {
			formIsValid = false;
			errors['destination'] = 'Cannot be empty';
		}
		if (fields.departureDate === '') {
			formIsValid = false;
			errors['departureDate'] = 'Cannot be empty';
		}
		if (fields.flightType === ROUNDTRIP && fields.returnDate == '') {
			formIsValid = false;
			errors['returnDate'] = 'Cannot be empty';
		}
		if (fields.passengerCount < 1) {
			formIsValid = false;
			errors['passengerCount'] = 'Must be greater than 1';
		}
		if (fields.passengerCount === '') {
			formIsValid = false;
			errors['passengerCount'] = 'Cannot be empty';
		}

		this.setState({ errors: errors });
		return formIsValid;
	};
	handleFindFlightClick = () => {
		if (this.handleValidation()) {
			this.props.onFindFlightClick(this.state);
		}
	};

	render() {
		return (
			<div className="card search-box">
				<div className="text-center logo">
					<img src={Airplane} alt="Logo" />
					<span>Flight Search</span>
				</div>
				<div className="text-center one-rem-mb">
					<CustomRadio
						label="Single trip"
						id={SINGLETRIP}
						value={SINGLETRIP}
						name="flightType"
						checked={this.state.flightType === SINGLETRIP}
						onChange={this.handleInputChange}
					/>
					<CustomRadio
						label="Round trip"
						id={ROUNDTRIP}
						value={ROUNDTRIP}
						name="flightType"
						checked={this.state.flightType === ROUNDTRIP}
						onChange={this.handleInputChange}
					/>
				</div>
				<div className="row form-group">
					<div className="col-6">
						<label>Origin </label>
						<input
							type="text"
							className="form-control"
							name="origin"
							value={this.state.origin}
							onChange={this.handleInputChange}
							placeholder="eg. pnq"
						/>
						{this.state.errors['origin'] != '' && this.state.origin == '' ? (
							<div className="error"> {this.state.errors['origin']} </div>
						) : (
							''
						)}
					</div>
					<div className="col-6">
						<label>Destination</label>
						<input
							type="text"
							className="form-control"
							name="destination"
							value={this.state.destination}
							onChange={this.handleInputChange}
							placeholder="eg. del"
						/>
						{this.state.errors['destination'] != '' &&
						this.state.destination == '' ? (
							<div className="error"> {this.state.errors['destination']} </div>
						) : (
							''
						)}
					</div>
				</div>
				<div className="row">
					<div
						className={`col-sm-12 col-md-${
							this.state.flightType === ROUNDTRIP ? '6' : '12'
						}  form-group`}
					>
						<label>Departure</label>
						<DayPickerInput
							value={this.state.departureDate}
							onDayChange={day => this.setState({ departureDate: day })}
							dayPickerProps={{

								disabledDays: [
									{
										before: new Date(),
									},
								],
							}}
						/>
						{this.state.errors['departureDate'] != '' &&
						this.state.departureDate == '' ? (
							<div className="error">
								{' '}
								{this.state.errors['departureDate']}{' '}
							</div>
						) : (
							''
						)}
					</div>
					{this.state.flightType === ROUNDTRIP && (
						<div className="col-sm-12 col-md-6  form-group">
							<label>Return</label>
							<DayPickerInput
								value={this.state.returnDate}
								onDayChange={day => this.setState({ returnDate: day })}
								dayPickerProps={{
									disabledDays: [
										{
											before: this.state.departureDate,
										},
									],
								}}
							/>
							{this.state.errors['returnDate'] != '' &&
							this.state.returnDate == '' ? (
								<div className="error"> {this.state.errors['returnDate']} </div>
							) : (
								''
							)}
						</div>
					)}
				</div>
				<div className="two-rem-mb">
					<label>Passengers</label>
					<input
						type="number"
						className="form-control"
						name="passengerCount"
						value={this.state.passengerCount}
						onChange={this.handleInputChange}
					/>
					{this.state.errors['passengerCount'] != '' &&
					(this.state.passengerCount == '' || this.state.passengerCount < 1) ? (
						<div className="error"> {this.state.errors['passengerCount']} </div>
					) : (
						''
					)}
				</div>
				<button
					className="btn btn-primary btn-block find-flight-btn"
					type="button"
					onClick={this.handleFindFlightClick}
				>
					Find Flights
				</button>
			</div>
		);
	}
}

export default SearchBox;
