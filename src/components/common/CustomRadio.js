import React from 'react';

const CustomRadio = props => (
	<div className="custom-radio">
		<input
			type="radio"
			name={props.name}
			id={props.id}
			onChange={props.onChange}
			checked={props.checked}
			value={props.value}
		/>
		<label htmlFor={props.id}>{props.label}</label>
	</div>
);
export default CustomRadio;
