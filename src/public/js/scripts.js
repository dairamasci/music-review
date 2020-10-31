// ir a reseña seleccionada
$('#resenia_id').click(function (e) {
  e.preventDefault();

  const reseniaId = $(this).data('id');

  window.location.assign('/resenias/' + reseniaId);
});