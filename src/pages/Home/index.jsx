import React, { useState, useEffect } from "react";
import "./styles.css";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { format } from "date-fns";
import api from "../../service/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState("0");

  useEffect(() => {
    api.get("posts").then((response) => {
      parsePost(response.data);
    });
  }, [count]);

  let confirmDialog = (text, icon) => {
    MySwal.fire({
      position: "center",
      icon: icon,
      title: text,
      showConfirmButton: false,
      timer: 1500

    })
  }

  function parsePost(data) {
    let newYears;
    let formattedDate;
    data.map((date) => {
      newYears = new Date(date.created_updated_at);
      formattedDate = format(newYears, `dd/MM/yyyy`);
      date.created_updated_at = formattedDate;

      date.comments.map((date2) => {
        newYears = new Date(date2.created_updated_at);
        formattedDate = format(newYears, `dd/MM/yyyy`);
        date2.created_updated_at = formattedDate;
      });
    });

    setPosts(data);
  }

  function createPost() {
    MySwal.fire({
      title: "Criar Post",
      html:
        '<label for="swal-input1"> Titulo</label><input id="swal-input1" class="swal2-input">' +
        '<label for="swal-input2">Corpo</label><input type="text" id="swal-input2" class="swal2-input" >',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Criar",
      cancelButtonText: "Cancelar criação",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let title = document.getElementById("swal-input1").value;
        let body = document.getElementById("swal-input2").value;
        const data = {
          title: title,
          body: body,
        };

        api.post("posts", data).then((response) => {
          setCount(count + 1);
        });

       confirmDialog("Post criado com sucesso!", "success")
      },
    });
  }

  function updatePost(post) {
    MySwal.fire({
      title: "Atualizar Post",
      html:
        `<label for="swal-input1"> Titulo</label> <input type = "text" id="swal-input1" class="swal2-input" value="${post.title}" >` +
        `<label for="swal-input2">Corpo</label><input type="text" id="swal-input2" class="swal2-input" value="${post.body}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Atualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let title = document.getElementById("swal-input1").value;
        let body = document.getElementById("swal-input2").value;
        const data = {
          title: title,
          body: body,
        };

        api.put(`posts/${post.id}`, data).then((response) => {
          setCount(count + 1);
        });

        confirmDialog("Post atualizado com sucesso!", "success")
      },
    });
  }

  function deletePost(id) {
    MySwal.fire({
      title: "Você tem certeza???",
      text: "Você não poderá voltar atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Delete este Post!",
    }).then((result) => {
      if (result.value) {
        api.delete(`posts/${id}`).then((response) => {
          confirmDialog("Post deletado com sucesso!", "success");
          setCount(count + 1);
        });
      }
    });
  }

  function createComment(id) {
    MySwal.fire({
      title: "Criar comentário",
      html: `<input type ="text" id="swal-input1" class="swal2-input" placeholder="Digite aqui seu comentário">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Criar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let body = document.getElementById("swal-input1").value;

        let data = {
          body: body,
        };

        api.post(`posts/${id}/comments`, data).then((response) => {
          setCount(count + 1);
        });

        confirmDialog("Comentário criado com sucesso!", "success");
      },
    });
  }

  function updateComment(comment) {
    MySwal.fire({
      title: "Atualizar comentário",
      html: `<input type ="text" id="swal-input1" class="swal2-input" value="${String(
        comment.body
      )}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Atualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let body = document.getElementById("swal-input1").value;

        let data = {
          body: body,
        };


        api.put(`comments/${comment.id}`, data).then(response =>{
          setCount(count+1)
        confirmDialog("Comentário atualizado com sucesso!", "success")
        });

       
      },
    });
  }

  function deleteComment(id) {
    MySwal.fire({
      title: "Você tem certeza???",
      text: "Você não poderá voltar atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Delete este Comentário!",
    }).then((result) => {
      if (result.value) {
        api.delete(`comments/${id}`).then(() => {
          confirmDialog("Comentário Deletado!", "success");
          setCount(count+1);
        });
      }
    });
  }

  return (
    <div>
      <header>
        <h1>CRUD</h1>
        <button onClick={createPost}>Criar post</button>
      </header>

      <main>
        <div className="cardList">
          {posts.map((post) => (
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
                        updatePost(post);
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
                <div className="comment-list">
                  {post.comments.map((comment) => (
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
                          {" "}
                          Criado|Atualizado em {comment.created_updated_at}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
};

export default Home;
