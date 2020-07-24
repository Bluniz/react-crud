import React from "react";
import "../../styles.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import updateComment from "../../../../service/Requests/comment/updateComment";
import deleteComment from "../../../../service/Requests/comment/deleteComment";

//Componente de comentário
class Comment extends React.Component {
  render() {
    let comment = this.props.comment;

    return (
      <div className="comment" key={comment.id}>
        <div className="row-dropdown">
          <div className="dropdown">
            <button className="dropbtn">
              <FaEdit />
            </button>
            <div className="dropdown-content">
              <button
                onClick={() => {
                  updateComment(comment);
                }}
              >
                Editar comentário
              </button>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">
              <FaTrash />
            </button>
            <div className="dropdown-content">
              <button
                onClick={() => {
                  deleteComment(comment.id);
                }}
              >
                Remover comentário
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="comment-body">
            <p>{comment.body}</p>
          </div>
        </div>
        <div className="row">
          <span className="comment-date">
            Criado|Atualizado em {comment.created_updated_at}
          </span>
        </div>
      </div>
    );
  }
}

export default Comment;
