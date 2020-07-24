import api from "../../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import confirmDialog from "../../../dialogs/index";
const MySwal = withReactContent(Swal);

//Enviar e criar requisição de atualização de comentário ao back-end!
function updateComment(comment) {
  MySwal.fire({
    title: "Atualizar comentário",
    html: `<input type ="text" id="swal-input1" class="swal2-input" value="${comment.body}">`,
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

      api.put(`comments/${comment.id}`, data).then(() => {
        confirmDialog("Comentário atualizado com sucesso!");
        window.location.reload();
      });
    },
  });
}

export default updateComment;
