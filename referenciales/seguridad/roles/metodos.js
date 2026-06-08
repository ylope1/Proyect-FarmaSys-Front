var rutaPantalla = "referenciales/seguridad/roles/";

if (validarAccesoPantalla(rutaPantalla, "../../../menu.php")) {
    listar();
}

function aplicarPermisosBotones() {
    controlarBotonPorPermiso(rutaPantalla, "crear", "#btnAgregar");
    controlarBotonPorPermiso(rutaPantalla, "modificar", "#btnEditar");
    controlarBotonPorPermiso(rutaPantalla, "anular", "#btnAnular");
}

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
                title:'Listado de Roles' 
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Roles'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Roles'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Roles'
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
    if (!tienePermiso(rutaPantalla, "crear")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para agregar roles.", "warning");
        return;
    }
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#txtDescripcion").removeAttr("disabled");
    $("#txtAbreviatura").removeAttr("disabled");
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
    if (!tienePermiso(rutaPantalla, "modificar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para modificar roles.", "warning");
        return;
    }
    if ($("#txtCodigo").val() == 0) {
        mensajeOperacion("Atención", "Debe seleccionar un rol para editar.", "warning");
        return;
    }
    $("#txtOperacion").val(2);
    $("#txtDescripcion").removeAttr("disabled");
    $("#txtAbreviatura").removeAttr("disabled");
    $("#txtEstado").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");    

    $(".form-line").attr("class","form-line focused");
}

function anular(){
    if (!tienePermiso(rutaPantalla, "anular")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para anular roles.", "warning");
        return;
    }
    if ($("#txtCodigo").val() == 0) {
        mensajeOperacion("Atención", "Debe seleccionar un rol para anular.", "warning");
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
    var abreviatura = $("#txtAbreviatura").val().trim().toUpperCase();
    var estado = $("#txtEstado").val();

    if ($("#txtOperacion").val() == 3) {
        return true;
    }

    if (descripcion === "") {
        mensajeOperacion("Error", "La descripción del rol no puede estar vacía.", "error");
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

    if (abreviatura === "") {
        mensajeOperacion("Error", "La abreviatura del rol no puede estar vacía.", "error");
        return false;
    }

    if (abreviatura.length < 2 || abreviatura.length > 10) {
        mensajeOperacion("Error", "La abreviatura debe tener entre 2 y 10 caracteres.", "error");
        return false;
    }

    if (!/^[A-Z]+$/.test(abreviatura)) {
        mensajeOperacion("Error", "La abreviatura solo debe contener letras, sin espacios.", "error");
        return false;
    }

    if (estado !== "ACTIVO" && estado !== "INACTIVO") {
        mensajeOperacion("Error", "El estado seleccionado no es válido.", "error");
        return false;
    }

    $("#txtDescripcion").val(descripcion);
    $("#txtAbreviatura").val(abreviatura);

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
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
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
        url: getUrl() + "rol/read",
        method:"GET",
        dataType: "json",
        headers: ajaxHeaders()
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionRol("+rs.id+",'"+rs.rol_desc+"','"+rs.rol_abreviatura+"','"+rs.rol_estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rol_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rol_abreviatura;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rol_estado;
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

function seleccionRol(codigo, descripcion, abreviatura, estado){
    $("#txtCodigo").val(codigo);
    $("#txtDescripcion").val(descripcion);
    $("#txtAbreviatura").val(abreviatura);
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
    var endpoint = "rol/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "rol/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "rol/anular/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    $.ajax({
        url:getUrl() + endpoint,
        method:metodo,
        dataType: "json",
        headers: ajaxHeaders(),
        data: { 
            'id': $("#txtCodigo").val(),
            'rol_desc': $("#txtDescripcion").val().trim().toUpperCase(),
            'rol_abreviatura': $("#txtAbreviatura").val().trim().toUpperCase(),
            'rol_estado': $("#txtEstado").val()
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