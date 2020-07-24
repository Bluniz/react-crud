import React from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "../../styles.css";
import CommentList from "../commentList/index";
import updatePost from "../../../../service/Requests/post/updatePost";
import deletePost from "../../../../service/Requests/post/deletePost";
import createComment from "../../../../service/Requests/comment/createComment";

//Componente de Post!
class Post extends React.Component {
  render() {
    let post = this.props.post;

    return (
      <div className="post" key={post.id}>
        <div className="row-dropdown">
          <div className="dropdown">
            <button className="dropbtn">
              <FaPlus />
            </button>
            <div className="dropdown-content">
              <button
                onClick={() => {
                  createComment(post.id);
                }}
              >
                Criar comentário
              </button>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">
              <FaEdit />
            </button>
            <div className="dropdown-content">
              <button
                onClick={() => {
                  updatePost(post.id);
                }}
              >
                Editar Post
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
                  deletePost(post.id);
                }}
              >
                Remover Post
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="post-header">
            <h1>{post.title}</h1>
          </div>
        </div>

        <div className="row">
          <div className="post-body">
            <p>{post.body}</p>
          </div>
        </div>

        <div className="row-date">
          <span>Criado|Atualizado em {post.created_updated_at}</span>
        </div>
        <div className="row-comment">
          <span className="comment-title">Comentários</span>
        </div>
        <div className="row">
          <CommentList comment={post.comments} />
        </div>
      </div>
    );
  }
}

export default Post;
