import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CommentItem from './comment-item.js';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function localStorageSet(key, value) {
    localStorage.clear();
    localStorage.setItem(key, JSON.stringify(value));
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCommentUser: '',
            newCommentText: '',
            comments: JSON.parse(localStorage.getItem("comments")) || []

        };
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        // this.deleteComment = this.deleteComment.bind(this);
    }

    onChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    submitForm(event) {
        event.preventDefault();
        let date = new Date();
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        const year = date.getFullYear();
        const comments = this.state.comments;

        comments.push({
            user: this.state.newCommentUser,
            text: this.state.newCommentText,
            date: (day + ' ' + month + ' ' + year),
            time: date.toLocaleTimeString()
        });

        this.setState({
            comments,
            newCommentUser: '',
            newCommentText: ''
        });
        localStorageSet("comments", comments);
    }

    deleteComment(key) {
        const comments = this.state.comments;
        comments.map(function (comment, id) {
            if (key === id) {
                comments.splice(id, 1);
            }
        });

        localStorageSet("comments", comments);

        this.setState({
            comments
        });
    }

    render() {
        return (
            <div>
                <div className="comments">
                    {
                        this.state.comments.map((comment, id) => {
                            return (
                                <CommentItem
                                    key={id}
                                    user={comment.user}
                                    text={comment.text}
                                    date={comment.date}
                                    time={comment.time}
                                    deleteComment={this.deleteComment.bind(this, id)}
                                />
                            )
                        })
                    }
                </div>
                <div className="wrapper wrapper-bottom">
                    <form onSubmit={this.submitForm} className="addComment">
                        <label className="lable input-lable">Имя</label>
                        <input
                            className="MyName"
                            name="newCommentUser"
                            required
                            value={this.state.newCommentUser}
                            onChange={this.onChange}
                        />
                        <p>
                            <label className="lable textarea-lable">Сообщение</label>
                            <textarea
                                name="newCommentText"
                                rows="5"
                                className="MyComment"
                                value={this.state.newCommentText}
                                onChange={this.onChange} />
                        </p>
                        <input type="submit"
                            className="submit"
                            value="Отправить" />
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <CommentForm />,
    document.querySelector('#app')
);


