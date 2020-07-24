import api from "../../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import confirmDialog from "../../../dialogs/index";

const MySwal = withReactContent(Swal);

//Atualizar dados de um post e enviar requisição para o back-end!
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

      api.put(`posts/${post.id}`, data).then(() => {
        confirmDialog("Post atualizado com sucesso!");
        window.location.reload();
      });
    },
  });
}

export default updatePost;
