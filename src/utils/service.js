import Swal from "sweetalert2";
export const Show = {
Success: function(value){
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: value
  })
},
Attention: function(value){
  Swal.fire({
    icon: 'info',
    title: 'Attention',
    text: value
  })
}
};
export const ValService = {
  IsNotEmpty: function(value){
   let rsp = true;
    if(value == undefined || value.length<1){
      rsp = false;
    }
    return rsp;
  }
  };
