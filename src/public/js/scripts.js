// ir a reseña seleccionada
$('#resenia_id').click(function (e) {
  console.log("asdsa")
  e.preventDefault();

  const reseniaId = $(this).data('id');
  console.log(reseniaId);
  window.location.assign('/resenias/' + reseniaId);
});

$('#comentar_resenia').click(function (e) {
  e.preventDefault();
  const reseniaId = $(this).data('id');
  const data = {
    comentario: $('#comentario').val(),
  }

  function generarComentario(data) {
    return `
      <div class="container__comentarios">
        <div class="container_coment_ind">
          <div class="div_cont_c">
            <p class="p_datos_user_c">${data.comentario_nuevo[0].usuario_creador} - ${data.comentario_nuevo[0].rango} - ${data.comentario_nuevo[0].fecha_comentario}</p>
            <p class="p_contenido_c">
              ${data.comentario_nuevo[0].contenido}
            </p>
            <br>
          </div>
          <div class="div_dis-likes_c">
            <a href="">
              <i class="fas fa-thumbs-up text-white fa-lg mr-3"></i>
            </a>
            <a href="">
              <i class="fas fa-thumbs-down text-white fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  $.post(`/resenias/${reseniaId}`, data)
    .done(data => {
      setTimeout(() => {
        $('#lista_comentarios').append(generarComentario(data));
        $('#comentario').val('');
      }, 800)
    })
    .fail(() => console.log('error'))
});

$('#img_nuevaResenia').on('change', function () {
  var fileReader = new FileReader();

  fileReader.onload = function () {
    var result = fileReader.result;  // data <-- in this var you have the file data in Base64 format
    $("#imagen2").attr("src", result);
  }
  fileReader.readAsDataURL($('#img_nuevaResenia').prop('files')[0]);
});