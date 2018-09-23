import React from 'react';
import { getDateMonthYear } from '../helpers/utils';
import { ROUNDTRIP } from '../helpers/constants';

const SearchParameters = ({ data }) => (
	<div className="search-parameters card d-flex">
		<div className="left-sec">
			<span>{data.origin}</span>
			<i className="icon-flight" />
			<span>{data.destination}</span>
		</div>
		<div className="right-sec">
			<span>
				<label>Departure</label> {getDateMonthYear(data.departureDate)}{' '}
			</span>
			{data.flightType === ROUNDTRIP && (
				<span>
					{' '}
					<label>Return</label> {getDateMonthYear(data.returnDate)}{' '}
				</span>
			)}
		</div>
	</div>
);
export default SearchParameters;
