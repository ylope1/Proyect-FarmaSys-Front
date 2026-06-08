listar();

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
                title:'Listado de Modulos' 
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Modulos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Modulos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Modulos'
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

function agregar(){
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#txtDescripcion").removeAttr("disabled");
    $("#txtOrden").removeAttr("disabled");
    $("#txtEstado").val("ACTIVO");
    $("#txtEstado").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");    

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    if ($("#txtCodigo").val() == 0) {
        mensajeOperacion("Atención", "Debe seleccionar un modulo para editar.", "warning");
        return;
    }
    $("#txtOperacion").val(2);
    $("#txtDescripcion").removeAttr("disabled");
    $("#txtOrden").removeAttr("disabled");
    $("#txtEstado").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");    

    $(".form-line").attr("class","form-line focused");
}

function anular(){
    if ($("#txtCodigo").val() == 0) {
        mensajeOperacion("Atención", "Debe seleccionar un modulo para anular.", "warning");
        return;
    }
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function validaciones() {
    var descripcion = $("#txtDescripcion").val().trim().toUpperCase();
    var orden = $("#txtOrden").val();
    var estado = $("#txtEstado").val();

    if ($("#txtOperacion").val() == 3) {
        return true;
    }

    if (descripcion === "") {
        mensajeOperacion("Error", "La descripción del modulo no puede estar vacía.", "error");
        return false;
    }

    if (descripcion.length < 3 || descripcion.length > 50) {
        mensajeOperacion("Error", "La descripción debe tener entre 3 y 50 caracteres.", "error");
        return false;
    }

    if (!/^[A-ZÁÉÍÓÚÑ\s]+$/.test(descripcion)) {
        mensajeOperacion("Error", "La descripción solo debe contener letras", "error");
        return false;
    }

    if (orden === "") {
        mensajeOperacion("Error", "El orden del modulo no puede estar vacío.", "error");
        return false;
    }

    if (!/^[0-9]+$/.test(orden)) {
        mensajeOperacion("Error", "El orden solo debe contener números enteros positivos.", "error");
        return false;
    }

    if (parseInt(orden) <= 0) {
        mensajeOperacion("Error", "El orden no puede ser menor o igual a cero.", "error");
        return false;
    }

    if (estado !== "ACTIVO" && estado !== "INACTIVO") {
        mensajeOperacion("Error", "El estado seleccionado no es válido.", "error");
        return false;
    }

    $("#txtDescripcion").val(descripcion);
    $("#txtOrden").val(parseInt(orden));

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
        url: getUrl() + "modulos/read",
        method:"GET",
        dataType: "json",
        headers: ajaxHeaders()
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionModulo("+rs.id+",'"+rs.mod_desc+"',"+rs.mod_orden+",'"+rs.mod_estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.mod_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.mod_orden;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.mod_estado;
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

function seleccionModulo(codigo, descripcion, orden, estado){
    $("#txtCodigo").val(codigo);
    $("#txtDescripcion").val(descripcion);
    $("#txtOrden").val(orden);
    $("#txtEstado").val(estado);

    $("#btnEditar").removeAttr("disabled");

    if (estado === "ACTIVO") {
        $("#btnAnular").removeAttr("disabled");
    } else {
        $("#btnAnular").attr("disabled", "true");
    }

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "modulos/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "modulos/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "modulos/anular/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    $.ajax({
        url:getUrl() + endpoint,
        method:metodo,
        dataType: "json",
        headers: ajaxHeaders(),
        data: { 
            'id': $("#txtCodigo").val(),
            'mod_desc': $("#txtDescripcion").val().trim().toUpperCase(),
            'mod_orden': $("#txtOrden").val(),
            'mod_estado': $("#txtEstado").val()
        }

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