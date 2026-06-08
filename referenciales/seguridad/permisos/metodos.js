cargarRoles();

function getToken() {
    return sessionStorage.getItem("accessToken");
}

function ajaxHeaders() {
    return {
        "Authorization": "Bearer " + getToken()
    };
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
        data: {
            texto: ""
        }
    })
    .done(function(resultado){
        var lista = "<option value=\"\">-- Selecciona Rol --</option>";

        for(rs of resultado){
            if(rs.rol_estado === "ACTIVO"){
                lista = lista + "<option value=\"" + rs.id + "\">";
                lista = lista + rs.rol_desc;
                lista = lista + "</option>";
            }
        }

        $("#txtRol").html(lista);
        $("#txtRol").selectpicker("refresh");
    })
    .fail(function (a, b, c) {
        manejarErrorAjax(a, c);
    });
}

function consultarPermisos(){

    var rol_id = $("#txtRol").val();

    if (rol_id === "" || rol_id == null) {
        mensajeOperacion("Atención", "Debe seleccionar un rol para consultar permisos.", "warning");
        return;
    }

    $.ajax({
        url: getUrl() + "permisos/buscar-por-rol/" + rol_id,
        method:"GET",
        dataType: "json",
        headers: ajaxHeaders()
    })
    .done(function(resultado){

        armarTablaPermisos(resultado);

        $("#btnGrabar").removeAttr("disabled");
        $("#btnCancelar").removeAttr("disabled");

    })
    .fail(function (a, b, c) {
        manejarErrorAjax(a, c);
    });
}

function armarTablaPermisos(resultado){

    var lista = "";

    if(resultado.length === 0){
        lista = lista + "<tr>";
        lista = lista + "<td colspan=\"10\" class=\"text-center\">";
        lista = lista + "No existen accesos activos registrados.";
        lista = lista + "</td>";
        lista = lista + "</tr>";

        $("#tableBody").html(lista);
        return;
    }

    for(rs of resultado){

        lista = lista + "<tr>";
            lista = lista + "<td>";
            lista = lista + rs.mod_desc;
            lista = lista + "</td>";

            lista = lista + "<td>";
            lista = lista + rs.acc_desc;
            lista = lista + "<input type=\"hidden\" class=\"acceso_id\" value=\"" + rs.acceso_id + "\">";
            lista = lista + "</td>";

            lista = lista + crearCheckbox("ver", rs.acceso_id, rs.ver);
            lista = lista + crearCheckbox("crear", rs.acceso_id, rs.crear);
            lista = lista + crearCheckbox("modificar", rs.acceso_id, rs.modificar);
            lista = lista + crearCheckbox("anular", rs.acceso_id, rs.anular);
            lista = lista + crearCheckbox("confirmar", rs.acceso_id, rs.confirmar);
            lista = lista + crearCheckbox("aprobar", rs.acceso_id, rs.aprobar);
            lista = lista + crearCheckbox("rechazar", rs.acceso_id, rs.rechazar);
            lista = lista + crearCheckbox("imprimir", rs.acceso_id, rs.imprimir);
        lista = lista + "</tr>";
    }

    $("#tableBody").html(lista);
}

function crearCheckbox(accion, acceso_id, marcado){

    var id = accion + "_" + acceso_id;
    var checked = "";

    if (marcado === true || marcado === 1 || marcado === "1" || marcado === "t") {
        checked = "checked";
    }

    var columna = "";

    columna = columna + "<td class=\"text-center\">";
        columna = columna + "<input type=\"checkbox\" id=\"" + id + "\" class=\"filled-in chk-col-green permiso-check\" data-accion=\"" + accion + "\" data-acceso=\"" + acceso_id + "\" " + checked + ">";
        columna = columna + "<label for=\"" + id + "\"></label>";
    columna = columna + "</td>";

    return columna;
}

function confirmarOperacion() {

    if (!validaciones()) {
        return;
    }

    swal({
        title: "GRABAR",
        text: "¿DESEA GRABAR LOS PERMISOS DEL ROL SELECCIONADO?",
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

function validaciones(){

    var rol_id = $("#txtRol").val();

    if (rol_id === "" || rol_id == null) {
        mensajeOperacion("Error", "Debe seleccionar un rol.", "error");
        return false;
    }

    if ($("#tableBody .acceso_id").length === 0) {
        mensajeOperacion("Error", "Debe consultar los accesos antes de grabar.", "error");
        return false;
    }

    return true;
}

function grabar(){

    var rol_id = $("#txtRol").val();
    var permisos = [];

    $("#tableBody .acceso_id").each(function(){

        var acceso_id = $(this).val();

        permisos.push({
            acceso_id: acceso_id,
            ver: $("#ver_" + acceso_id).is(":checked"),
            crear: $("#crear_" + acceso_id).is(":checked"),
            modificar: $("#modificar_" + acceso_id).is(":checked"),
            anular: $("#anular_" + acceso_id).is(":checked"),
            confirmar: $("#confirmar_" + acceso_id).is(":checked"),
            aprobar: $("#aprobar_" + acceso_id).is(":checked"),
            rechazar: $("#rechazar_" + acceso_id).is(":checked"),
            imprimir: $("#imprimir_" + acceso_id).is(":checked")
        });

    });
    console.log(permisos);
    $.ajax({
        url: getUrl() + "permisos/create",
        method:"POST",
        dataType: "json",
        headers: ajaxHeaders(),
        data: {
            rol_id: rol_id,
            permisos: permisos
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

function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
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