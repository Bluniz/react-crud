import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);



function confirmDialog(text){
  MySwal.fire({
    position: "center",
    icon: "success",
    title: text,
    showConfirmButton: false,
    timer: 1500
  })
}


export default confirmDialog;