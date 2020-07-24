import api from "../../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import confirmDialog from "../../../dialogs/index";
const MySwal = withReactContent(Swal);

//Função para criar e enviar um post para o back-end!
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

      if (title === "" || body === "") {
        MySwal.fire("Preencha os campos corretamente!");
      } else {
        api.post("posts", data).then(() => {
          confirmDialog("Post criado com sucesso!");
          window.location.reload();
        });
      }
    },
  });
}

export default createPost;
