// funciones para entrar ocultar divs y mostrar olvidar contraseña
var changesub = 0;
function olvide(){
 $("#olvide").show();
 $("#main").hide();
 $("#registro").hide();
 $(".mensaje").html("");
}

function cancelacontra() {
  $("#olvide").hide();
  $("#cargando").hide();
  $("#registro").hide();
  $("#main").show();
  $(".mensaje").html("");
}

function registro() {
  $("#olvide").hide();
  $("#main").hide();
  $("#registro").show();
  $(".mensaje").html("");
}

//funcion de login
function login(){
 var usuario = document.getElementById("correo").value;
 var pass = document.getElementById("pass").value;
 if (usuario == "") {
   $(".mensaje").html("Rellena todos los capos"); 
 } else if (pass == ""){
   $(".mensaje").html("Rellena todos los capos");   
 } else{
    var url = "http://lacascarita.esy.es/restaurante/login.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           dataType: "json",
           url: url,
           data: $("#login").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
           cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
           }); 
           },
           success: function(data) {
               cordova.plugin.pDialog.dismiss();
             if (data.error == 3) {
               $(".mensaje").html("Datos Incorrectos");
             } else if (data.error == 1) {
               window.location = "negocio.html";
             } else if (data.error == 2) {
               localStorage.setItem("restaurante", data.msj);
               localStorage.setItem("simbolo", data.simbolo);
               window.location = "main.html";
             }
            
            
           }
         });

    return false; // Evitar ejecutar el submit del formulario.  
 }
};

// funcion registro
function registrarme(){
 var usuario = document.getElementById("nombre").value;
 var correoregistro = document.getElementById("correoregistro").value;
 var recorreoregistro = document.getElementById("recorreoregistro").value;   
 var passregistro = document.getElementById("passregistro").value;
 if (usuario == "") {
   $(".mensaje").html("Rellena todos los capos"); 
 } else if (correoregistro == ""){
   $(".mensaje").html("Rellena todos los capos");   
 } else if(recorreoregistro == ""){
   $(".mensaje").html("Rellena todos los capos"); 
 } else if(passregistro == ""){
   $(".mensaje").html("Rellena todos los capos"); 
 } else if(correoregistro == recorreoregistro){
   var url = "http://lacascarita.esy.es/restaurante/registro.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#formregistro").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });   
            $("#cargando").show();
            $("#registro").hide();
          },
           success: function(data) {
               cordova.plugin.pDialog.dismiss();
             if (data == 1) {
             $.notify({
	               // options
	               message: "Registro correcto"

                    },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
                cancelacontra();
             } else if (data == 0) {
               alert("Ocurrio un error");
               
             } else if(data == 2) {
               
                $.notify({
	               // options
	               message: "Este correo ya esta registrado"

                    },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
                cancelacontra();  
             }  
             $("#cargando").hide();
             $("#registro").hide();
           }
         });

    return false; // Evitar ejecutar el submit del formulario.    
 } else{
   $(".mensaje").html("Tu corro no coincide"); 
 }
};

//funcion guarda mesas y pisos
var mesa =""
var piso = 1;
function agregapisos(){
var nombrepiso = document.getElementById("nompiso").value;
var cantmesas = document.getElementById("cantmesas").value;
var newdiv = document.createElement('tr');
newdiv.innerHTML = '<td><input type="text" name="p' + piso + '" value="' + nombrepiso + '" class="form-control"></td><td><input type="number" name="c' + piso + '" class="form-control" value="'+ cantmesas +'"></td>';
document.getElementById("mesas").appendChild(newdiv);  
piso++;
$("#nompiso").val("");
$("#cantmesas").val("");
}

function negocio (){
  var url = "http://lacascarita.esy.es/restaurante/guardamesas.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#mesaspisos").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
           cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            }); 
          },
           success: function(data) {
             cordova.plugin.pDialog.dismiss();
             var nomrestaurante = document.getElementById("restaurante").value;
             var simbolo = document.getElementById("simbolo").value;
             if (data == 0) {
               
               
               $.notify({
	               // options
	               message: "Rellene todos los campos"

                    },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
             } else if (data == 1) {
               localStorage.setItem("restaurante", nomrestaurante);
               localStorage.setItem("simbolo", simbolo);
               window.location = "main.html";
             } 
           }
         });
    return false; // Evitar ejecutar el submit del formulario.   
}


// funcion salir
function salir() {
    var url = "http://lacascarita.esy.es/restaurante/salir.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           beforeSend: function () {
           cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cerrando sesion..',
                message : 'Espere..'
            }); 
          },
           success: function(data) {
             cordova.plugin.pDialog.dismiss();
             window.location = "index.html";
           }
         });  
}

function regresar() {
   window.location = "main.html"; 
}
//funcion loggin google



function nombrerestaurante(){
  document.getElementById("nombre").innerHTML = localStorage.getItem("restaurante");
}

//funciones del menu
function pisos() {
var url = "http://lacascarita.esy.es/restaurante/pisos.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           beforeSend: function () {
             $("#main").html("<img src='loading.gif' style='width:100%'>");
           },
           success: function(data) {
               cordova.plugin.pDialog.dismiss();
            if(data == 1){
               window.location = "index.html";
            } else {
              $("#main").html(data);  
            }
           }
         });   
}

function mesas(id) {
var url = "http://lacascarita.esy.es/restaurante/mesas.php?id=" + id; // El script a dónde se realizará la petición.
    $.ajax({
           url: url,
           beforeSend: function () {
               cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });
           },
           success: function(data) {
               cordova.plugin.pDialog.dismiss();
               $("#main").html(data);  
           }
         });   
}

function menu(){
var url = "http://lacascarita.esy.es/restaurante/menu.php"; // El script a dónde se realizará la petición.
    $.ajax({
       url: url,
       beforeSend: function () {
       $("#main").html("<img src='loading.gif' style='width:100%'>");
       },
       success: function(data) {
           cordova.plugin.pDialog.dismiss();
       $("#main").html(data);  
       }
    });       
}

function crearpedido(mesaid){
   var url = "http://lacascarita.esy.es/restaurante/pedido.php?id=" + mesaid; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           beforeSend: function () {
               cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });
           },
           success: function(data) {
               cordova.plugin.pDialog.dismiss();
            if(data == 1){
             window.location = "index.html";
            } else {
             mesa = mesaid;
             $("#main").html(data);
             $("#submenu").html('<div class="row"><div class="col-xs-9 col-sm-9 col-md-9"><h3><a onclick="gcomanda()"><font color="white"> <i class="fa fa-save" aria-hidden="true"></i></font></a></h3></div><div class="col-xs-3 col-sm-3 col-md-3"><h3><a onclick="imprime()"><font color="white"> <i class="fa fa-print" aria-hidden="true"></i></font></a></h3></div></div>');
             changesub();
        }
       }
    });   
}




function categorias(){
   var url = "http://lacascarita.esy.es/restaurante/categorias.php"; // El script a dónde se realizará la petición.
    $.ajax({
       url: url,
       beforeSend: function () {
       $("#main").html("<img src='loading.gif' style='width:100%'>");
       },
       success: function(data) {
        
       cordova.plugin.pDialog.dismiss();
       $("#main").html(data);  
       }
    }); 
}


function agregacat(){
 var nombre = document.getElementById("nombre").value;
 
 if (nombre == "") {
   alert("Rellena todos los capos"); 
 } else { 
    var url = "http://lacascarita.esy.es/restaurante/guardacategoria.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#categoria").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
               
             cordova.plugin.pDialog.dismiss();
             if (data == 1) {
               
               window.location = "index.html";
             } else if (data == 0) {
               alert("Ocurrio un error");
              
             } else if(data == 2) {
               
               
                $.notify({
	               // options
	               message: "Categoria Guardada correctamente"
                   },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
               categorias(); 
             }  
             
           }
         });

    return false; // Evitar ejecutar el submit del formulario.    
  }
};

function agregaarticulo(){
 var nombre = document.getElementById("nombre").value;
 var precio = document.getElementById("precio").value;   
 
 var stock = document.getElementById("stock").value;
 if (nombre == ""){
   alert("Rellena todos los capos");   
 } else if(precio == ""){
   alert("Rellena todos los capos"); 
 } else { 
    var url = "http://lacascarita.esy.es/restaurante/guardaarticulo.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#producto").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
             cordova.plugin.pDialog.dismiss();
             if (data == 1) {
               window.location = "index.html";
             } else if (data == 0) {
               alert("Ocurrio un error");
               
             } else if(data == 2) {
               $.notify({
	               // options
	               message: "Articulo guardado correctamente"
                   },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
               menu();
             } else {
                 
             }
                 
             
           }
         });

    return false; // Evitar ejecutar el submit del formulario.    
  }
};


var cont = 0;
function agregacomanda(id, precio, nombre){
 
               var cantidad = "t" + cont;
               var simbolo = localStorage.getItem("simbolo");
               
               
               var newdiv = document.createElement('tr');
                newdiv.setAttribute("id", "tr" + cont);
                newdiv.innerHTML = '<td><input type="hidden" name="mesa" value="'+ mesa +'"><input type="hidden" name="p' + cont +'" value="'+ id +'"><small>'+ nombre +'</small></td><td><h4><i class="fa fa-minus-circle" aria-hidden="true" onclick="menos('+ precio +', '+ cont +')"></i></h4></td><td><small class="tt' +cont +'">1</small></td><td><small>'+ simbolo +'</small> <small class="pre' +cont +'">' + precio +'</small><input type="hidden" class="t' + cont +'" id="t' + cont +'"  value="1" name="c'+ cont +'"></td><td><h4><i class="fa fa-plus-circle" aria-hidden="true" onclick="mas('+ precio +', '+ cont +')"></i></h4></td>';
                document.getElementById("comanda").appendChild(newdiv);
                cont++;
                var total = document.getElementById("total").value;
                var aumenta = 0;
                aumenta = parseInt(total) + parseInt(precio);
                $("#total").val(aumenta);
                $(".totaltext").text(aumenta);
                
         
        
}

function menos(precio, con){
    var cant = document.getElementById("t" + con).value;
    if (cant == 1){
      var total = document.getElementById("total").value;
      var aumenta = parseInt(total) - parseInt(precio);
      $(".total").val(aumenta);
      $(".totaltext").text(aumenta);
      $("#tr" + con).remove(); 
    } else {
    var preciot = precio * cant;
    var total = document.getElementById("total").value;
    var aumenta = parseInt(total) - parseInt(precio);
    var uno = 1;
    $(".total").val(aumenta);
    $(".totaltext").text(aumenta);
    
    var cantidad =  parseInt(cant) - parseInt(uno);
    $(".t" + con).val(cantidad);
    $(".tt"+ con).text(cantidad);
    var preciot = precio * cantidad;
    $(".pre" + con).text(preciot);
    }
    
}


function mas(precio, con){
    var cant = document.getElementById("t" + con).value;
    
    
    var total = document.getElementById("total").value;
    var uno = 1;
    var aumenta = parseInt(total) + parseInt(precio);
    $(".total").val(aumenta);
    $(".totaltext").text(aumenta);
    
    var cantidad =  parseInt(cant) + parseInt(uno);
    $(".t" + con).val(cantidad);
    $(".tt"+ con).text(cantidad);
    var preciot = precio * cantidad;
    $(".pre" + con).text(preciot);
}

function gcomanda() {
    var url = "http://lacascarita.esy.es/restaurante/guardacomanda.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#formcomanda").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
             cordova.plugin.pDialog.dismiss();
             if (data == 1) {
               crearpedido(mesa);
               window.location = "index.html";
             } else if (data == 0) {
               alert("Ocurrio un error");
               crearpedido(mesa);
             } else if(data == 2) {
               crearpedido(mesa);
               changesub();    
             }  
             
           }
         }); 
}

function deletep(id){
var r = confirm("Deseas eliminar este pedido");
if (r == true) {
  var url = "http://lacascarita.esy.es/restaurante/eliminapedido.php?id=" + id; // El script a dónde se realizará la petición.
    $.ajax({
           url: url,
           beforeSend: function () {
               cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });
           },
           success: function(data) {
               cordova.plugin.pDialog.dismiss();
               crearpedido(mesa);  
           }
         });
} else {

}  
}

function cocina(){
   var url = "http://lacascarita.esy.es/restaurante/cocina.php"; // El script a dónde se realizará la petición.
    $.ajax({
       url: url,
       beforeSend: function () {
       $("#main").html("<img src='loading.gif' style='width:100%'>");
       },
       success: function(data) {
        cordova.plugin.pDialog.dismiss();
       $("#main").html(data);  
       }
    }); 
}

function updatec(){
  var url = "http://lacascarita.esy.es/restaurante/cocina.php"; // El script a dónde se realizará la petición.
    $.ajax({
       url: url,
       beforeSend: function () {
       cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });
       },
       success: function(data) {
           cordova.plugin.pDialog.dismiss();
       $("#main").html(data);  
       }
    });    
}

function play(id, status){
var url = "http://lacascarita.esy.es/restaurante/updatepedido.php?id=" + id + '&status=' + status; // El script a dónde se realizará la petición.
    $.ajax({
           url: url,
           beforeSend: function () {
           cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });    
           },
           success: function(data) {
               cordova.plugin.pDialog.dismiss();
             updatec();  
           }
     });
}

function cobrar(tipo, mesa, total, impuesto){
    if (tipo == 0){
     var descuento = document.getElementById("desc").value;   
    } else {
     var descuento = document.getElementById("desc1").value;     
}
        
    
    var url = "http://lacascarita.esy.es/restaurante/cobrar.php?mesa=" + mesa + "&tipo=" + tipo + "&total=" + total + "&descuento=" + descuento + "&impuesto=" + impuesto; // El script a dónde se realizará la petición.
    $.ajax({
           type: "GET",
           url: url,
           data: $("#efectivo").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
           cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Cargando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
             cordova.plugin.pDialog.dismiss();
             if (data == 2) {
             
             $("#submenu").html('<div class="row"><div class="col-xs-9 col-sm-9 col-md-9"><h3><a onclick="gcomanda()"><font color="white"> <i class="fa fa-save" aria-hidden="true"></i></font></a></h3></div><div class="col-xs-3 col-sm-3 col-md-3"><h3><a onclick="imprime()"><font color="white"> <i class="fa fa-print" aria-hidden="true"></i></font></a></h3></div></div>');
             localStorage.setItem("alert", 1);
             window.location = "main.html";   
             } else if (data == 3) {
               alert("Ocurrio un error");
               crearpedido(mesa);
             } else {
               alert("Ocurrio un error"); 
               crearpedido(mesa);
             }  
            
           }
         });

    return false; // Evitar ejecutar el submit del formulario. 
}

function bmesas(){
  var url = "http://lacascarita.esy.es/restaurante/bmesas.php"; // El script a dónde se realizará la petición.
    $.ajax({
       url: url,
       beforeSend: function () {
       $("#main").html("<img src='loading.gif' style='width:100%'>");
       },
       success: function(data) {
        
       cordova.plugin.pDialog.dismiss();
       $("#main").html(data);  
       }
    });  
}

function mmesa(idmesa, namemesa, idpiso, piso){
  $("#idpiso").val(idmesa);
  $("#nombre").val(namemesa);
}

function gmesas(){
 var piso = document.getElementById("piso").value;
  
    var url = "http://lacascarita.esy.es/restaurante/guardamesa.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#mesa").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Guardando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
               
             cordova.plugin.pDialog.dismiss();
             if (data == 1) {
               
               window.location = "index.html";
             } else if (data == 0) {
               alert("Ocurrio un error");
              
             } else if(data == 2) {
                $.notify({
	               // options
	               message: "Mesa Guardada correctamente"
                   },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
               bmesas(); 
             }  
             
           }
         });

    return false; // Evitar ejecutar el submit del formulario.    
  
};

function umesas(){
    var url = "http://lacascarita.esy.es/restaurante/updatemesa.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#updatemesas").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Guardando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
               
             cordova.plugin.pDialog.dismiss();
             if (data == 1) {
               
               window.location = "index.html";
             } else if (data == 0) {
               alert("Ocurrio un error");
              
             } else if(data == 2) {
                $.notify({
	               // options
	               message: "Mesa editada correctamente"
                   },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
               bmesas(); 
             }  
             
           }
         });

    return false; // Evitar ejecutar el submit del formulario.    
  
};

function mcategoria(idcat, nombre){
  $("#idcat").val(idcat);
  $("#nombreup").val(nombre); 
}


function ucat(){
    var url = "http://lacascarita.esy.es/restaurante/updatecat.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#updatecategorias").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Guardando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
               
             cordova.plugin.pDialog.dismiss();
             if (data == 1) {
               window.location = "index.html";
             } else if (data == 0) {
               alert("Ocurrio un error");
             } else if(data == 2) {
                $.notify({
	               // options
	               message: "Categoria editada correctamente"
                   },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
               categorias() 
             }  
             
           }
         });

    return false; // Evitar ejecutar el submit del formulario.    
  
};

function marticulo(idart, nombre, precio, stock){
  $("#idart").val(idart);
  $("#nombreup").val(nombre);
  $("#precioup").val(precio);
  $("#stockup").val(stock);
}

function updatepro(){
    var url = "http://lacascarita.esy.es/restaurante/updatearticulo.php"; // El script a dónde se realizará la petición.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#updateproducto").serialize(), // Adjuntar los campos del formulario enviado.
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Guardando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
               
             cordova.plugin.pDialog.dismiss();
             if (data == 1) {
               window.location = "index.html";
             } else if (data == 0) {
               alert("Ocurrio un error");
             } else if(data == 2) {
                $.notify({
	               // options
	               message: "Articulo editado correctamente"
                   },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
               menu();
             }  
             
           }
         });

    return false; // Evitar ejecutar el submit del formulario.    
  
};

function eliminacomanda(mesa) {
   var r = confirm("deseas eliminar este pedido?");
    if (r == true) {
    var url = "http://lacascarita.esy.es/restaurante/eliminacomanda.php?id=" + mesa; // El script a dónde se realizará la petición.
    $.ajax({
           url: url,
           beforeSend: function () {
            cordova.plugin.pDialog.init({
                progressStyle : 'SPINNER',
                cancelable : false,
                title : 'Eliminando..',
                message : 'Espere..'
            });
          },
           success: function(data) {
               
             cordova.plugin.pDialog.dismiss();
             if (data == 1) {
               window.location = "index.html";
             } else if (data == 0) {
               alert("Ocurrio un error");
             } else if(data == 2) {
                $.notify({
	               // options
	               message: "Pedido eliminado correctamente"
                   },{
	               // settings
	               type: 'success',
                   placement: {
	               from: "bottom",
	               align: "center"
	               },
                });
               window.location = "main.html";
             }  
             
           }
         });
    } else {
    }
}

function listapedidos(tipo) {
 var desde = document.getElementById("desde").value;   
 var hasta =  document.getElementById("hasta").value; 
 var url = "http://lacascarita.esy.es/restaurante/listapedidos.php?tipo=" + tipo + "&desde=" + desde + "&hasta=" + hasta; // El script a dónde se realizará la petición.
    $.ajax({
       url: url,
       beforeSend: function () {
       $("#main").html("<img src='loading.gif' style='width:100%'>");
       },
       success: function(data) {
           if (data == 1) {
             window.location = "index.html";  
           } else {
             $("#main").html(data);  
           }
       }, error(data){
        $("#main").html("error de conexion");    
       }
    });  
}