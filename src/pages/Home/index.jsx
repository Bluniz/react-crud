import React, { useState, useEffect } from "react";
import "./styles.css";
import { format } from "date-fns";
import api from "../../service/api";

import createPost from "../../service/Requests/post/createPost";
import Header from "./Components/header/index";
import PostList from "./Components/postList/index";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("posts").then((response) => {
      parsePost(response.data);
    });
  }, []);

  //Formatar as datas vindas do Back-end!
  function parsePost(data) {
    let newYears;
    let formattedDate;
    data.map((post) => {
      newYears = new Date(post.created_updated_at);
      formattedDate = format(newYears, `dd/MM/yyyy`);
      post.created_updated_at = formattedDate;

      post.comments.map((comment) => {
        newYears = new Date(comment.created_updated_at);
        formattedDate = format(newYears, `dd/MM/yyyy`);
        comment.created_updated_at = formattedDate;
      });
    });

    setPosts(data);
  }

  return (
    <div>
      <Header title="CRUD" createPost={createPost} btnText="Criar Post" />
      <main>
        <PostList posts={posts} />
      </main>
    </div>
  );
};

export default Home;
