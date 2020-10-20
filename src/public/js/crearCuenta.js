$(document).ready(function() {
  
  // Mostrar ocultar contraseña
  $("#icono-click-c").click(function() {
    $("#icono-c").toggleClass('fa-eye-slash');

    let inputc = $("#contraseña");
    if(inputc.attr("type") === "password") {
      inputc.attr("type","text");
    }
    else {
      inputc.attr("type","password");
    }

  });

  // Mostrar ocultar repetir contraseña
  $("#icono-click-rc").click(function() {
    $("#icono-rc").toggleClass('fa-eye-slash');

    let inputrc = $("#repetirContraseña");
    if(inputrc.attr("type") === "password") {
      inputrc.attr("type","text");
    }
    else {
      inputrc.attr("type","password");
    }

  });

  // Mostrar ocultar input codigo administrador según el switch
  $("#switch-admin").change(function(e) {
    let value = e.target.value;
    let check = ('value', $("#switch-admin").is(':checked'));

    let codigoAdmin = $("#codigoAdmin");

    if (check === true) {
      if(codigoAdmin.attr("style") === "display: none;") 
        codigoAdmin.attr("style","display: block;")

    } else{

      if(codigoAdmin.attr("style") === "display: block;") 
        codigoAdmin.attr("style","display: none;")

    }
  })
});