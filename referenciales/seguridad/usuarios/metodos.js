listar();
cargarRoles();

function getToken() {
    return sessionStorage.getItem("accessToken");
}

function ajaxHeaders() {
    return {
        "Authorization": "Bearer " + getToken()
    };
}

function formatoTabla(){
    
    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            {
                extend:'copy',
                text:'COPIAR',
                className:'btn btn-primary waves-effect',
                title:'Listado de Usuarios' 
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Usuarios'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Usuarios'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Usuarios',
            }
        ],
        iDisplayLength:5,
        language:{
            sSearch: 'Buscar:',
            sInfo: 'Mostrando resultado del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate:{
                sNext: 'Siguiente',
                sPrevious: 'Anterior'
            }
        }
    });
}
function cancelar(){
    location.reload(true);
}

function salir() {
    window.location.href = "../../../menu.php";
}

function cargarRoles(){
    $.ajax({
        url: getUrl() + "rol/buscar",
        method:"POST",
        dataType: "json",
        headers: ajaxHeaders(),
        data: { texto: "" }
    })
    .done(function(resultado){
        var lista = "<option value=\"\">-- Selecciona Rol --</option>";

        for(rs of resultado){
            lista += "<option value=\"" + rs.id + "\">" + rs.rol_desc + "</option>";
        }

        $("#txtRol").html(lista);
        $("#txtRol").selectpicker("refresh");
    })
    .fail(function (a, b, c) {
        manejarErrorAjax(a, c);
    });
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);

    $("#txtNombre").val("");
    $("#txtEmail").val("");
    $("#txtLogin").val("");
    $("#txtPassword").val("");
    $("#txtIntentos").val(0);
    $("#txtRol").val("");
    $("#txtEstado").val("ACTIVO");

    $("#txtNombre").removeAttr("disabled");
    $("#txtEmail").removeAttr("disabled");
    $("#txtLogin").removeAttr("disabled");
    $("#txtPassword").removeAttr("disabled");
    $("#txtRol").removeAttr("disabled");

    $("#txtEstado").attr("disabled", "true");

    $("#txtRol").selectpicker("refresh");
    $("#txtEstado").selectpicker("refresh");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnDesbloquear").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    if ($("#txtCodigo").val() == 0) {
        mensajeOperacion("Atención", "Debe seleccionar un usuario para modificar.", "warning");
        return;
    }

    $("#txtOperacion").val(2);

    $("#txtNombre").removeAttr("disabled");
    $("#txtEmail").removeAttr("disabled");
    $("#txtLogin").removeAttr("disabled");
    $("#txtPassword").removeAttr("disabled");
    $("#txtRol").removeAttr("disabled");

    $("#txtEstado").attr("disabled", "true");

    $("#txtRol").selectpicker("refresh");
    $("#txtEstado").selectpicker("refresh");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnDesbloquear").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function anular(){
    if ($("#txtCodigo").val() == 0) {
        mensajeOperacion("Atención", "Debe seleccionar un acceso para anular.", "warning");
        return;
    }
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnDesbloquear").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function desbloquear(){
    if ($("#txtCodigo").val() == 0) {
        mensajeOperacion("Atención", "Debe seleccionar un usuario para desbloquear.", "warning");
        return;
    }

    swal({
        title: "DESBLOQUEAR",
        text: "¿DESEA DESBLOQUEAR EL USUARIO SELECCIONADO?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url:getUrl() + "users/desbloquear/" + $("#txtCodigo").val(),
            method:"PUT",
            dataType: "json",
            headers: ajaxHeaders()
        })
        .done(function(resultado){
            swal({
                title:"Respuesta",
                text: resultado.mensaje,
                type: resultado.tipo
            },
            function(){
                if(resultado.tipo == "success"){
                    location.reload(true);
                }
            });
        })
        .fail(function (a, b, c) {
            manejarErrorAjax(a, c);
        });
    });
}

function validaciones() {
    var nombre = $("#txtNombre").val().trim().toUpperCase();
    var email = $("#txtEmail").val().trim();
    var login = $("#txtLogin").val().trim();
    var password = $("#txtPassword").val().trim();
    var rol = $("#txtRol").val();
    var estado = $("#txtEstado").val();
    var operacion = $("#txtOperacion").val();

    if (operacion == 3) {
        return true;
    }

    if (nombre === "") {
        mensajeOperacion("Error", "El nombre del usuario no puede estar vacío.", "error");
        return false;
    }

    if (nombre.length < 3 || nombre.length > 255) {
        mensajeOperacion("Error", "El nombre debe tener entre 3 y 255 caracteres.", "error");
        return false;
    }

    if (!/^[A-ZÁÉÍÓÚÑ\s]+$/.test(nombre)) {
        mensajeOperacion("Error", "El nombre solo debe contener letras y espacios.", "error");
        return false;
    }

    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        mensajeOperacion("Error", "El correo electrónico no tiene un formato válido.", "error");
        return false;
    }

    if (login === "") {
        mensajeOperacion("Error", "El login del usuario no puede estar vacío.", "error");
        return false;
    }

    if (login.length < 3 || login.length > 100) {
        mensajeOperacion("Error", "El login debe tener entre 3 y 100 caracteres.", "error");
        return false;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(login)) {
        mensajeOperacion("Error", "El login solo puede contener letras, números, punto, guion y guion bajo.", "error");
        return false;
    }

    if (operacion == 1 && password === "") {
        mensajeOperacion("Error", "Debe ingresar una contraseña para el nuevo usuario.", "error");
        return false;
    }

    if (password !== "" && password.length < 3) {
        mensajeOperacion("Error", "La contraseña debe tener al menos 3 caracteres.", "error");
        return false;
    }

    if (rol === "" || rol == null) {
        mensajeOperacion("Error", "Debe seleccionar un rol.", "error");
        return false;
    }

    $("#txtNombre").val(nombre);
    $("#txtEmail").val(email);
    $("#txtLogin").val(login);

    return true;
}

function confirmarOperacion() {
    if (!validaciones()) {
        return; // No continuar si las validaciones no pasan
    }
    var oper= parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";
    
    if(oper===2){
        titulo = "EDITAR";
        pregunta = "¿DESEA MODIFICAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
        titulo = "ANULAR";
        pregunta = "¿DESEA INACTIVAR EL REGISTRO SELECCIONADO?";
    }
    swal({
        title: titulo,
        text: pregunta,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function () {
        grabar();
    });
}

function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
}

function listar(){
    $.ajax({
        url: getUrl() + "users/read",
        method:"GET",
        dataType: "json",
        headers: ajaxHeaders()
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionUsuario("+rs.id+",'"+rs.name+"','"+rs.login+"','"+(rs.email ? rs.email : "")+"',"+rs.intentos+","+rs.rol_id+",'"+rs.rol_desc+"','"+rs.user_estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.name;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.login;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + (rs.email ? rs.email : "");
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.intentos;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rol_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.user_estado;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function (a, b, c) {
        manejarErrorAjax(a, c);
    });
}

function seleccionUsuario(codigo, nombre, login, email, intentos, rol_id, rol_desc, estado){
    $("#txtCodigo").val(codigo);
    $("#txtNombre").val(nombre);
    $("#txtLogin").val(login);
    $("#txtEmail").val(email);
    $("#txtPassword").val("");
    $("#txtIntentos").val(intentos);
    $("#txtRol").val(rol_id);
    $("#txtRol").selectpicker("refresh");
    $("#txtEstado").val(estado);
    $("#txtEstado").selectpicker("refresh");
    console.log("Usuario seleccionado: " + codigo + " - " + estado);
    $("#btnEditar").removeAttr("disabled");
    controlarBotonesEstado(estado, intentos);
    $(".form-line").attr("class","form-line focused");
}
function controlarBotonesEstado(estado, intentos){
    if (estado === "ACTIVO") {
        $("#btnAnular").removeAttr("disabled");
        $("#btnAgregar").attr("disabled", "true");
    } else {
        $("#btnAnular").attr("disabled", "true");
    }

    if (estado === "INACTIVO" || parseInt(intentos) >= 3) {
        $("#btnDesbloquear").removeAttr("disabled");
        $("#btnAgregar").attr("disabled", "true");
    } else {
        $("#btnDesbloquear").attr("disabled", "true");
    }
}   

function grabar(){
    var endpoint = "users/create";
    var metodo = "POST";
    var datos = {
        'id': $("#txtCodigo").val(),
        'name': $("#txtNombre").val().trim().toUpperCase(),
        'email': $("#txtEmail").val().trim(),
        'login': $("#txtLogin").val().trim(),
        'password': $("#txtPassword").val().trim(),
        'rol_id': $("#txtRol").val()
    };
    if($("#txtOperacion").val()==1){
        endpoint = "users/create";
        metodo = "POST";
        datos.user_estado = "ACTIVO";
    }
    if($("#txtOperacion").val()==2){
        endpoint = "users/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "users/anular/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    $.ajax({
        url:getUrl() + endpoint,
        method:metodo,
        dataType: "json",
        headers: ajaxHeaders(),
        data: datos
    })
    .done(function(resultado){
        swal({
            title:"Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        },
        function(){
            if(resultado.tipo == "success"){
                location.reload(true);
            }
        });
    })
    .fail(function (a, b, c) {
        manejarErrorAjax(a, c);
    });
}

function manejarErrorAjax(a, c) {
    var mensajeError = "Ocurrió un error inesperado.";

    if (a.status === 401) {
        mensajeError = "No está autenticado. Debe iniciar sesión nuevamente.";
    } else if (a.status === 403) {
        mensajeError = "No tiene permiso para realizar esta acción.";
    } else if (a.responseJSON && a.responseJSON.mensaje) {
        mensajeError = a.responseJSON.mensaje;
    } else if (a.responseJSON && a.responseJSON.message) {
        mensajeError = a.responseJSON.message;
    } else if (a.responseJSON && a.responseJSON.errores) {
        mensajeError = JSON.stringify(a.responseJSON.errores);
    } else if (a.responseText) {
        mensajeError = a.responseText;
    } else if (c) {
        mensajeError = c;
    }

    swal({
        title: "Error",
        text: mensajeError,
        type: "error"
    });

    console.error(a.responseText);
}