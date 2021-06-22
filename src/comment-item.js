import React from 'react';

const CommentItem = (props) => {
	return (
		<div className="wrapper">
			<div className="comment">
				<div className="author">{props.user}</div>
				<div className="text">{props.text}</div>
				<div className="date">{props.date}</div>
				<div className="time">{props.time}</div>
			</div>
			<button
				className="delete"
				id={props.user}
				onClick={props.deleteComment}>
				Удалить
			</button>
		</div>
	);
}

export default CommentItem;