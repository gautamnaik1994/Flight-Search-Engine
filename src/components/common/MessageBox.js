import React from 'react';

const MessageBox = props => (
	<div className="message-box text-center">
		{props.icon && (
			<div className="l-icon">
				<img src={props.icon} />
			</div>
		)}
		<div className="text">{props.text}</div>
		<div className="sub-text">{props.subText}</div>
	</div>
);

export default MessageBox;
