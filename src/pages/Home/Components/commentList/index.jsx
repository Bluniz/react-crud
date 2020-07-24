import React from "react";
import "../../styles.css";
import Comment from "../comment/index";

//Componente de lista de comentário!
class CommentList extends React.Component {
  render() {
    let comments = this.props.comment;

    return (
      <div className="row">
        <div className="comment-list">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default CommentList;
