myApp.onPageInit('login', function (page) {
    // run createContentPage func after link was clicked
   $$('.left').on('click',function(){
    mainView.router.back();
   });

   $$('#btnLogin').on('click',function() {
     $.ajax({
       //url: 'https://inventariapp.000webhostapp.com/API/inventario/login/login',
       url: 'http://localhost/stockapp_apiv2/API/inventario/login',
       type: 'POST',
       dataType: 'json',
       data: {user: $("input[name='user']").val(),
            pass: $("input[name='pass']").val()
            },
       beforeSend: function(){
          myApp.addNotification({
            message: 'Enviando...',
              button: {
                      text: 'OK',
                       color: 'yellow'
                     }
          });
      }
     })
     .done(function(rta) {
         if(rta.login){
                    $("input[name='user']").val('');
                    $("input[name='pass']").val('');
          myApp.addNotification({
            message: 'Bienvenido',
              button: {
                      text: 'OK',
                       color: 'blue'
                     }
          });
                    localStorage.setItem('idUser',rta.id);
                    localStorage.setItem('user',rta.user);    
                    mainView.router.loadPage('principal.html');
                  }else{
                    myApp.addNotification({
                      message: rta.msj,
                        button: {
                                text: 'OK',
                                 color: 'red'
                               }
                  });
                    myApp.alert(rta.msj,"Error");
                  }
     })
     .fail(function(rta) {
      myApp.addNotification({
                      message: rta,
                        button: {
                                text: 'OK',
                                 color: 'red'
                               }
                  }); 
      myApp.alert(rta,"Error");
     })
     .always(function() {
       console.log("complete");
     });
   });
   $$('#btnCancel').on('click',function() {
        $("input[name='user']").val('');
        $("input[name='pass']").val('');
   });
});