import React, { Component, Fragment } from 'react';
import FlightItem from '../common/FlightItem';

const FlightList = ({ filteredList, isRoundTrip }) => (
	<div className=" flight-list ">
		{filteredList.map((flight, index) => {
			const data = { ...flight, isRoundTrip };
			return <FlightItem key={index} data={data} />;
		})}
	</div>
);

export default FlightList;
