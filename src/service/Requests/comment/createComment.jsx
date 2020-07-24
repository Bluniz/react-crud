import api from "../../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import confirmDialog from "../../../dialogs/index";

const MySwal = withReactContent(Swal);

//Criar e enviar comentário para o back-end a partir do ID do post!
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

      if (body === "") {
        MySwal.fire("Preencha todos os campos corretamente!");
      } else {
        api.post(`posts/${id}/comments`, data).then(() => {
          confirmDialog("Comentário criado com sucesso!");
          window.location.reload();
        });
      }
    },
  });
}

export default createComment;
