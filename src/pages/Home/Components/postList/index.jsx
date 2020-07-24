import React from "react";
import "../../styles.css";
import Post from "../post/index";

//Componente de lista de POST
class PostList extends React.Component {
  render() {
    let posts = this.props.posts;

    return (
      <div className="cardList">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  }
}

export default PostList;
