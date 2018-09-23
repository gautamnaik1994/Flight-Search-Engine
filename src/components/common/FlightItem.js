import React from 'react';

const FlightItem = ({ data }) => (
	<div className="flight-item card row">
		<div className="col-md-8  left-sec">
			<div className="d-flex">
				<div className="col-3">
					<div className="airline-logo" data-airline-code={data.airlineCode} />
					<div className="airline-id text-muted">
						{data.airlineCode}-{data.flightNumber}
					</div>
				</div>
				<div className="col-9 d-flex location">
					<div>
						<div className="semi-bold">{data.departure}</div>
						<div className="text-muted">{data.origin}</div>
					</div>
					<div>
						<div className="semi-bold">{data.arrival}</div>
						<div className="text-muted">{data.destination}</div>
					</div>
				</div>
			</div>
			{data.isRoundTrip && (
				<div className="d-flex one-rem-mt">
					<div className="col-3">
						<div
							className="airline-logo"
							data-airline-code={data.airlineCode}
						/>
						<div className="airline-id text-muted">
							{data.airlineCode}-{data.flightNumber}
						</div>
					</div>
					<div className="col-9 d-flex location reverse">
						<div>
							<div className="semi-bold">{data.arrival}</div>
							<div className="text-muted">{data.destination}</div>
						</div>
						<div>
							<div className="semi-bold">{data.departure}</div>
							<div className="text-muted">{data.origin}</div>
						</div>
					</div>
				</div>
			)}
		</div>
		<div className="col-md-3 offset-md-1 text-center price-box">
			<div className="price">Rs {data.price} </div>
			<button type="button" className="btn btn-primary">
				Book Flight{' '}
			</button>
		</div>
	</div>
);

export default FlightItem;
