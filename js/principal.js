myApp.onPageInit('principal', function (page) {
    // run createContentPage func after link was clicked
   $$('.left').on('click',function(){
    mainView.router.back();
   });
   $$('.cierraSesion').on('click', function () {
    myApp.confirm('¿Esta Seguro?',"Cerrar Sesion", function () {
        localStorage.removeItem('idUser');
        localStorage.removeItem('user');
        $(location).attr('href','index.html');
        myApp.closePanel();
    });
});
   $("#user").text('Bienvenido '+localStorage.getItem('user'));
   $("#articulos").on('click', function() {
  if ($("#resultadosArticulo ul li").length>0) {
    $("#resultadosArticulo ul li").remove(); 
  } else {
    $.getJSON('http://localhost/stockapp_apiv2/API/inventario/articulo/lista').done(function(datos_de_ws){
    $.each(datos_de_ws, function(index, val) {
      $("#resultadosArticulo ul").append('<a href="#" class="item-link"><li class="item-content"> <div class="item-inner"><div class="item-title">'+val.art_nom+'</div></div></li></a>');
    }); 
    $("#resultadosArticulo ul").append('<a href="#" class="item-link color-blue"><li class="item-content"><div class="item-inner"><div class="item-title">'+"Agregar"+"</div></div></li></a>");
    });
  } 
}); 
$$("#categorias").on('click', function() {
  if ($("#resultadosCategoria ul li").length>0) {
    $("#resultadosCategoria ul li").remove();
  } else {
    $.getJSON('http://localhost/stockapp_apiv2/API/inventario/categoria/lista').done(function(datos_de_ws){
    $.each(datos_de_ws, function(index, val) {
      $("#resultadosCategoria ul").append('<a href="#" class="item-link"><li class="item-content"> <div class="item-inner"><div class="item-title">'+val.cat_name+'</div></div></li></a>');
    });
    $("#resultadosCategoria ul").append('<a href="#" class="item-link color-blue"><li class="item-content"><div class="item-inner"><div class="item-title">'+"Agregar"+"</div></div></li></a>");
    });
  }
});
});
