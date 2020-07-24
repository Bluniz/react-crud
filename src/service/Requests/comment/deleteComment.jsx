import api from "../../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import confirmDialog from "../../../dialogs/index";

const MySwal = withReactContent(Swal);

//Deletar e enviar requisição de delete de comentário ao back-end a partir de seu ID
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
        confirmDialog("Comentário deletado com sucesso");
        window.location.reload();
      });
    }
  });
}

export default deleteComment;
