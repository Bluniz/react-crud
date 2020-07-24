import api from '../../api'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import confirmDialog from '../../../dialogs/index'

const MySwal = withReactContent(Swal);


//Enviar requisição de delete para o back-end!
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
      api.delete(`posts/${id}`).then(()=>{
        confirmDialog('Post deletado com sucesso!');
        window.location.reload();

      });
    }
  });
}


export default deletePost;