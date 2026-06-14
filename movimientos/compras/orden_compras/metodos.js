var datosSesion = JSON.parse(sessionStorage.getItem("datosSesion"));
var usuarioLogueado = datosSesion;
var token = sessionStorage.getItem("accessToken");
var datosFuncionario = null;

var rutaPantalla = "movimientos/compras/orden_compras/";

if (!datosSesion || !usuarioLogueado || !token) {
    swal("Sesión expirada", "Debe iniciar sesión nuevamente", "warning");
    setTimeout(function(){
        window.location.href = "../../../index.html";
    }, 1500);
} else {
    $("#user_id").val(usuarioLogueado.id);
    $("#user_name").val(usuarioLogueado.name);

    $.ajaxSetup({
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (validarAccesoPantalla(rutaPantalla, "../../../menu.php")) {
        listar();
        campoFecha();
        aplicarPermisosBotones();
        toggleCampoCondicionVta();
        validarCamposNumericos();
    }
}

function aplicarPermisosBotones() {
    controlarBotonPorPermiso(rutaPantalla, "crear", "#btnAgregar");
    controlarBotonPorPermiso(rutaPantalla, "modificar", "#btnEditar");
    controlarBotonPorPermiso(rutaPantalla, "anular", "#btnAnular");
    controlarBotonPorPermiso(rutaPantalla, "confirmar", "#btnConfirmar");
    controlarBotonPorPermiso(rutaPantalla, "rechazar", "#btnRechazar");
    controlarBotonPorPermiso(rutaPantalla, "aprobar", "#btnAprobar");
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
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ordenes de Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ordenes de Compras'
            }
        ],
        iDisplayLength:5,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
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

function salir(){
    swal({
        title: "Salir",
        text: "¿Desea salir de la ventana de ordenes de compras?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: true
    }, function () {
        window.location.href = "../../../menu.php";
    });
}
function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
}

function agregar() {
    if (!tienePermiso(rutaPantalla, "crear")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para agregar ordenes de compras.", "warning");
        return;
    }

    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#txtFecha").val(obtenerFechaActualSistema());
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecAprob").removeAttr("");
    $("#txtFecAprob").attr("disabled", "true");
    $("#proveedor_desc").attr("disabled", "true");
    $("#empresa_desc").attr("disabled", "true");
    $("#suc_desc").attr("disabled", "true");
    cargarDatosFuncionario();
    $("#pedido").attr("disabled", "true");

    $("#presupuesto").removeAttr("disabled");

    $("#contado").removeAttr("disabled");
    $("#credito").removeAttr("disabled");

    toggleCampoCondicionVta();

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");
    $("#btnRechazar").attr("disabled", "true");
    $("#btnAprobar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $("#detalles").attr("style","display:none;");
    $("#registros").attr("style", "display:none;");

    $(".form-line").attr("class", "form-line focused");
}

function editar() {
    if (!tienePermiso(rutaPantalla, "modificar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para modificar ordenes de compras.", "warning");
        return;
    }
    if ($("#ord_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Operación no permitida", "Solo se puede modificar una orden en estado PENDIENTE.", "warning");
        return;
    }

    $("#txtOperacion").val(2);
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecAprob").attr("disabled", "true");
    if ($("#txtFecAprob").val() === "null" || $("#txtFecAprob").val() === null) {
        $("#txtFecAprob").val("");
    }
    $("#presupuesto").attr("disabled", "true");
    $("#proveedor_desc").attr("disabled", "true");
    $("#empresa_desc").attr("disabled", "true");
    $("#suc_desc").attr("disabled", "true");
    $("#pedido").attr("disabled", "true");

    $("#contado").removeAttr("disabled");
    $("#credito").removeAttr("disabled");

    toggleCampoCondicionVta();

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");
    $("#btnRechazar").attr("disabled", "true");
    $("#btnAprobar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}

function anular(){
    if (!tienePermiso(rutaPantalla, "anular")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para anular ordenes de compras.", "warning");
        return;
    }
    if ($("#ord_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Operación no permitida", "Solo se pueden anular órdenes en estado PENDIENTE.", "warning");
        return;
    }

    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    if (!tienePermiso(rutaPantalla, "confirmar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para confirmar ordenes de compras.", "warning");
        return;
    }

    if ($("#ord_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Operación no permitida", "Solo se pueden confirmar órdenes en estado PENDIENTE.", "warning");
        return;
    }

    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function rechazar(){
    if (!tienePermiso(rutaPantalla, "rechazar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para rechazar ordenes de compras.", "warning");
        return;
    } 

    if ($("#ord_estado").val() !== "CONFIRMADO") {
        mensajeOperacion("Operación no permitida", "Solo se pueden rechazar órdenes en estado CONFIRMADO.", "warning");
        return;
    }

    $("#txtOperacion").val(5);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function aprobar(){
    if (!tienePermiso(rutaPantalla, "aprobar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para aprobar ordenes de compras.", "warning");
        return;
    }

    if ($("#ord_estado").val() !== "CONFIRMADO") {
        mensajeOperacion("Operación no permitida", "Solo se pueden aprobar órdenes en estado CONFIRMADO.", "warning");
        return;
    }

    $("#txtOperacion").val(6);
    $("#txtFecAprob").val(obtenerFechaActualSistema());

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if(oper===2){
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
        titulo = "ANULAR";
        pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        titulo = "CONFIRMAR";
        pregunta = "¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===5){
        titulo = "RECHAZAR";
        pregunta = "¿DESEA RECHAZAR LA ORDEN DE COMPRA SELECCIONADA?";
    }
    if(oper===6){
        titulo = "APROBAR";
        pregunta = "¿DESEA APROBAR LA ORDEN DE COMPRA SELECCIONADA?";
    }
    swal({
        title: titulo,
        text: pregunta,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#458E49",
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
        url:getUrl()+"orden_comp_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        console.log("ORDENES DE COMPRA:", resultado);

        var lista = "";

        for(rs of resultado){
            var fechaAprob = rs.orden_comp_fec_aprob == null ? "" : rs.orden_comp_fec_aprob;
            var presupuesto = rs.presupuesto == null ? "" : rs.presupuesto;
            var pedido = rs.pedido == null ? "" : rs.pedido;

            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionOrdencompra("
                + rs.id + ",'"
                + rs.orden_comp_fec + "','"
                + fechaAprob + "',"
                + rs.proveedor_id + ",'"
                + rs.proveedor_desc + "',"
                + rs.empresa_id + ",'"
                + rs.empresa_desc + "',"
                + rs.sucursal_id + ",'"
                + rs.suc_desc + "',"
                + rs.user_id + ",'"
                + rs.name + "',"
                + rs.pedido_comp_id + ",'"
                + pedido + "',"
                + rs.presup_comp_id + ",'"
                + presupuesto + "','"
                + rs.orden_comp_estado + "','"
                + rs.orden_comp_ifv + "',"
                + rs.tipo_fact_id + ",'"
                + rs.tipo_fact_desc + "');\">";

            lista = lista + "<td>" + rs.id + "</td>";
            lista = lista + "<td>" + rs.orden_comp_fec + "</td>";
            lista = lista + "<td>" + fechaAprob + "</td>";
            lista = lista + "<td>" + rs.proveedor_desc + "</td>";
            lista = lista + "<td>" + rs.empresa_desc + "</td>";
            lista = lista + "<td>" + rs.suc_desc + "</td>";
            lista = lista + "<td>" + rs.name + "</td>";
            lista = lista + "<td>" + rs.orden_comp_estado + "</td>";
            lista = lista + "<td>" + pedido + "</td>";
            lista = lista + "<td>" + presupuesto + "</td>";
            lista = lista + "<td>" + rs.orden_comp_ifv + "</td>";
            lista = lista + "<td>" + rs.tipo_fact_desc + "</td>";

            lista = lista + "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionOrdencompra(id,orden_comp_fec, orden_comp_fec_aprob, proveedor_id, proveedor_desc, empresa_id, empresa_desc, sucursal_id, suc_desc, user_id, name, pedido_comp_id, pedido, presup_comp_id, presupuesto, ord_estado, orden_comp_ifv, tipo_fact_id, tipo_fact_desc){
    $("#id").val(id);
    $("#txtFecha").val(orden_comp_fec);
    $("#txtFecAprob").val(orden_comp_fec_aprob);
    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#user_id").val(user_id);
    $("#user_name").val(name);
    $("#pedido_comp_id").val(pedido_comp_id);
    $("#pedido").val(pedido);
    $("#presup_comp_id").val(presup_comp_id);
    $("#presupuesto").val(presupuesto);
    $("#ord_estado").val(ord_estado);
    
    if (tipo_fact_id == 6) {
        document.getElementById("contado").checked = true;
    } else if (tipo_fact_id == 7) {
        document.getElementById("credito").checked = true;
    }
    // Actualiza el select de intervalo según la condición
    toggleCampoCondicionVta();
       
    // --- Manejo del selectpicker ---
    $("#intervalo_fecha_vto").val(orden_comp_ifv);
    if (typeof $ !== "undefined" && typeof $('#intervalo_fecha_vto').selectpicker === "function") {
        $('#intervalo_fecha_vto').selectpicker('refresh');
    }
    
    $("#detalles").attr("style","display:block;");
    $("#registros").attr("style","display:none;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();   

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").removeAttr("disabled");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");
    
    if (ord_estado === "PENDIENTE"){   
        if (tienePermiso(rutaPantalla, "modificar")) {
            $("#btnEditar").removeAttr("disabled");
        }
        if (tienePermiso(rutaPantalla, "anular")) {
            $("#btnAnular").removeAttr("disabled");
        }

        if (tienePermiso(rutaPantalla, "confirmar")) {
            $("#btnConfirmar").removeAttr("disabled");
        }

        $("#formDetalles").attr("style","display:block;");
    }

    if (ord_estado === "CONFIRMADO"){   
        if (tienePermiso(rutaPantalla, "rechazar")) {
            $("#btnRechazar").removeAttr("disabled");
        }
        if (tienePermiso(rutaPantalla, "aprobar")) {
            $("#btnAprobar").removeAttr("disabled");
        }
    }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){ 

    if($("#txtOperacion").val()==1 || $("#txtOperacion").val()==2){

        if ($("#txtOperacion").val()==1 && ($("#presup_comp_id").val() === "" || $("#presup_comp_id").val() === "0")) {
            swal("Atención", "Debe seleccionar un presupuesto aprobado válido de la lista", "warning");
            return;
        }

        if ($("#proveedor_id").val() === "" || $("#proveedor_id").val() === "0") {
            swal("Atención", "El presupuesto seleccionado no tiene un proveedor válido", "warning");
            return;
        }

        if ($("#empresa_id").val() === "" || $("#empresa_id").val() === "0") {
            swal("Atención", "No se pudo determinar la empresa del funcionario logueado", "warning");
            return;
        }

        if ($("#sucursal_id").val() === "" || $("#sucursal_id").val() === "0") {
            swal("Atención", "No se pudo determinar la sucursal del funcionario logueado", "warning");
            return;
        }

        if ($("#txtFecha").val() === "") {
            swal("Atención", "Debe ingresar la fecha de la orden de compra", "warning");
            return;
        }

        if (!$("input[name='tipo_fact_id']:checked").val()) {
            swal("Atención", "Debe seleccionar la condición de compra", "warning");
            return;
        }

        if ($("#intervalo_fecha_vto").val() === "" || $("#intervalo_fecha_vto").val() === null) {
            swal("Atención", "Debe seleccionar el intervalo de fecha de vencimiento", "warning");
            return;
        }
    }

    if($("#txtOperacion").val()==3){
        if ($("#id").val() === "" || $("#id").val() === "0") {
            swal("Atención", "Debe seleccionar una orden de compra para anular", "warning");
            return;
        }

        if ($("#ord_estado").val() !== "PENDIENTE") {
            swal("Atención", "Solo se pueden anular órdenes de compra en estado PENDIENTE", "warning");
            return;
        }
    }

    if($("#txtOperacion").val()==4){
        if ($("#id").val() === "" || $("#id").val() === "0") {
            swal("Atención", "Debe seleccionar una orden de compra para confirmar", "warning");
            return;
        }

        if ($("#ord_estado").val() !== "PENDIENTE") {
            swal("Atención", "Solo se pueden confirmar órdenes de compra en estado PENDIENTE", "warning");
            return;
        }
    }

    if($("#txtOperacion").val()==5){
        if ($("#id").val() === "" || $("#id").val() === "0") {
            swal("Atención", "Debe seleccionar una orden de compra para rechazar", "warning");
            return;
        }

        if ($("#ord_estado").val() !== "CONFIRMADO") {
            swal("Atención", "Solo se pueden rechazar órdenes de compra en estado CONFIRMADO", "warning");
            return;
        }
    }

    if($("#txtOperacion").val()==6){
        if ($("#id").val() === "" || $("#id").val() === "0") {
            swal("Atención", "Debe seleccionar una orden de compra para aprobar", "warning");
            return;
        }

        if ($("#ord_estado").val() !== "CONFIRMADO") {
            swal("Atención", "Solo se pueden aprobar órdenes de compra en estado CONFIRMADO", "warning");
            return;
        }
    }

    var endpoint = "orden_comp_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "orden_comp_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "orden_comp_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "orden_comp_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    if($("#txtOperacion").val()==5){
        endpoint = "orden_comp_cab/rechazar/"+$("#id").val();
        metodo = "PUT";
        estado = "RECHAZADO";
    } 
    if($("#txtOperacion").val()==6){
        endpoint = "orden_comp_cab/aprobar/"+$("#id").val();
        metodo = "PUT";
        estado = "APROBADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'presup_comp_id': $("#presup_comp_id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'user_id': usuarioLogueado.id,
            'sucursal_id': $("#sucursal_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'pedido_comp_id': $("#pedido_comp_id").val(),
            'tipo_fact_id': $("input[name='tipo_fact_id']:checked").val(),
            'orden_comp_fec': $("#txtFecha").val(), 
            'orden_comp_fec_aprob': $("#txtFecAprob").val(),
            'orden_comp_ifv': $("#intervalo_fecha_vto").val(),              
            'orden_comp_estado': estado,
            'operacion': $("#txtOperacion").val()
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
                //location.reload(true);
                $("#id").val(resultado.registro.id);
                $("#detalles").attr("style","display:block;");
                listarDetalles();
                if(resultado.registro.orden_comp_estado != "PENDIENTE"){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function agregarDetalle(){
    if ($("#ord_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Operación no permitida", "Solo se puede agregar detalle en una orden PENDIENTE.", "warning");
        return;
    }

    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    if ($("#ord_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Operación no permitida", "Solo se puede modificar detalle en una orden PENDIENTE.", "warning");
        return;
    }

    $("#txtOperacionDetalle").val(2);
    $("#det_cantidad").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");

    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function eliminarDetalle(){
    if ($("#ord_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Operación no permitida", "Solo se puede eliminar detalle en una orden PENDIENTE.", "warning");
        return;
    }

    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function grabarDetalle(){ 

    if ($("#ord_estado").val() !== "PENDIENTE") {
        swal("Atención", "Solo se puede modificar el detalle de una orden en estado PENDIENTE", "warning");
        return;
    }

    if ($("#txtOperacionDetalle").val() != 3) {

        if ($("#producto_id").val() === "" || $("#producto_id").val() === "0") {
            swal("Atención", "Debe seleccionar un producto válido de la lista", "warning");
            return;
        }

        if ($("#det_cantidad").val() === "") {
            swal("Atención", "Debe ingresar la cantidad del producto", "warning");
            return;
        }

        var cantidad = parseFloat($("#det_cantidad").val());

        if (isNaN(cantidad) || cantidad <= 0) {
            swal("Atención", "La cantidad debe ser un número mayor a cero", "warning");
            return;
        }

        if ($("#det_costo").val() === "") {
            swal("Atención", "Debe ingresar el costo del producto", "warning");
            return;
        }

        var costo = parseFloat($("#det_costo").val());

        if (isNaN(costo) || costo <= 0) {
            swal("Atención", "El costo debe ser un número mayor a cero", "warning");
            return;
        }
    }

    if ($("#txtOperacionDetalle").val() == 3) {
        if ($("#producto_id").val() === "" || $("#producto_id").val() === "0") {
            swal("Atención", "Debe seleccionar un producto para eliminar", "warning");
            return;
        }
    }
    var endpoint = "orden_comp_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "orden_comp_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "orden_comp_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "orden_comp_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "orden_comp_cant":$("#det_cantidad").val(),
            "orden_comp_costo":$("#det_costo").val()
        }
    })
    .done(function(respuesta) {
        swal("Respuesta", respuesta.mensaje, respuesta.tipo);
        listarDetalles();
    })
    .fail(function(a,b,c){
        var respuesta = a.responseJSON;
        if (respuesta && respuesta.mensaje) {
            swal("Error", respuesta.mensaje, "error");
        } else {
            swal("Error", "No se pudo grabar el detalle", "error");
        }
        console.log(a.responseText);
    });
    
    $("#btnAgregarDetalle").attr("Style","display:inline");
    $("#btnEditarDetalle").attr("Style","display:inline");
    $("#btnEliminarDetalle").attr("Style","display:inline");
    $("#btnGrabarDetalle").attr("Style","display:none");

    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").val("");
    $("#det_cantidad").val("");
    $("#det_costo").val("");
}

function buscarProductos(){
    $.ajax({
        url:getUrl()+"producto/search",
        method:"POST",
        dataType: "json",
        data: {
            'prod_desc': $("#prod_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("+rs.producto_id+",'"+rs.prod_desc+"');\">"+rs.prod_desc+"</li>";
        }
        lista += "</ul>";
        $("#ListaProductos").html(lista);
        $("#ListaProductos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c) {
        swal("Error", "No se pudo buscar productos", "error");
        console.log(a.responseText);
    });
}

function seleccionProducto(producto_id, prod_desc){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);

    $("#ListaProductos").html("");
    $("#ListaProductos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var totalGral = 0;
    $.ajax({
        url:getUrl()+"orden_comp_det/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.producto_id+",'"+rs.prod_desc+"',"+rs.orden_comp_cant+","+rs.orden_comp_costo+");\">";
            lista = lista + "<td>";
            lista = lista + rs.producto_id;
            lista = lista +"</td>";
            lista = lista + "<td>";
            lista = lista + rs.prod_desc;
            lista = lista +"</td>";
            lista = lista + "<td>";
            lista = lista + rs.orden_comp_cant;
            lista = lista +"</td>";
            lista = lista + "<td class='text-right'>";
            lista = lista + rs.orden_comp_costo;
            lista = lista +"</td>";
            lista = lista + "<td class='text-right'>";
            lista = lista + (rs.orden_comp_cant*rs.orden_comp_costo);
            lista = lista +"</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
            totalGral +=(rs.orden_comp_cant*rs.orden_comp_costo);
        }
        $("#tableDetalles").html(lista);
        $("#txtTotalGral").text(totalGral);
        if($("#ord_estado").val() === "PENDIENTE" && cantidadDetalle > 0 && tienePermiso(rutaPantalla, "confirmar")) {
            $("#btnConfirmar").removeAttr("disabled");
        }else{
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(a, b, c) {
        swal("Error", "No se pudo listar el detalle", "error");
        console.log(a.responseText);
    })
}
function seleccionDetalle(producto_id, prod_desc, orden_comp_cant, orden_comp_costo){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(orden_comp_cant);
    $("#det_costo").val(orden_comp_costo);
}

/*function buscarProveedores(){
    $.ajax({
        url:getUrl()+"proveedore/buscar",
        method:"POST",
        dataType: "json",
        data: {
            "proveedor_desc": $("#proveedor_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProveedor("+rs.proveedor_id+",'"+rs.proveedor_desc+"');\">"+rs.proveedor_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaProveedores").html(lista);
        $("#listaProveedores").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionProveedor(proveedor_id, proveedor_desc){
    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);

    $("#listaProveedores").html("");
    $("#listaProveedores").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}*/

/*function buscarPedidos(){
    $.ajax({
        url:getUrl()+"pedido_comp_cab/buscar",
        method:"POST",
        dataType: "json",
        data: {
            'user_id': $("#user_id").val(),
            'name': $("#pedido").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPedido("+rs.pedido_comp_id+",'"+rs.pedido+"')\">"+rs.pedido+"</li>";
        }
        lista += "</ul>";
        $("#listaPedidos").html(lista);
        $("#listaPedidos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionPedido(pedido_comp_id, pedido){
    $("#pedido_comp_id").val(pedido_comp_id);
    $("#pedido").val(pedido);

    $("#listaPedidos").html("");
    $("#listaPedidos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}*/

function buscarPresupuesto(){
    $.ajax({
        url:getUrl()+"presup_comp_cab/buscar",
        method:"POST",
        dataType: "json",
        data: {
            'name': $("#presupuesto").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPresupuesto("+rs.presup_comp_id+",'"+rs.presupuesto+"',"+rs.proveedor_id+",'"+rs.proveedor_desc+"',"+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.pedido_comp_id+");\">"+rs.presupuesto+"</li>";
        }
        lista += "</ul>";
        $("#listaPresupuestos").html(lista);
        $("#listaPresupuestos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        swal("Error", "No se pudo buscar presupuestos aprobados", "error");
        console.log(a.responseText);
    })
}
function seleccionPresupuesto(presup_comp_id, presupuesto, proveedor_id, proveedor_desc, empresa_id, empresa_desc, sucursal_id, suc_desc, pedido_comp_id){
    $("#presup_comp_id").val(presup_comp_id);
    $("#presupuesto").val(presupuesto);

    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);

    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);

    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);

    $("#pedido_comp_id").val(pedido_comp_id);
    $("#pedido").val("PEDIDO NRO: " + pedido_comp_id);

    $("#listaPresupuestos").html("");
    $("#listaPresupuestos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

/*function buscarEmpresas(){
    $.ajax({
        url: getUrl()+"empresa/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'empresa_desc': $("#empresa_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionEmpresa("+rs.id+",'"+rs.empresa_desc+"');\">"+rs.empresa_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaEmpresas").html(lista);
        $("#listaEmpresas").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionEmpresa(empresa_id, empresa_desc){
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);

    $("#listaEmpresas").html("");
    $("#listaEmpresas").attr("style","display:none;");
}
function buscarSucursales(){
    $.ajax({
        url: getUrl()+"sucursale/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'suc_desc': $("#suc_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.id+",'"+rs.suc_desc+"');\">"+rs.suc_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursales").html(lista);
        $("#listaSucursales").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionSucursal(sucursal_id, suc_desc){
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);

    $("#listaSucursales").html("");
    $("#listaSucursales").attr("style","display:none;");
}*/

/*document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Con_Pedido").addEventListener("change", toggleCampoPedido);
    document.getElementById("Sin_Pedido").addEventListener("change", toggleCampoPedido);
});*/

/*function toggleCampoPedido() {
    const conPedido = document.getElementById("Con_Pedido").checked;
    const campoPedido = document.getElementById("pedido");

    if (conPedido) {
        campoPedido.removeAttribute("disabled");
    } else {
        campoPedido.setAttribute("disabled", "true");
        campoPedido.value = "";  // Limpiar el campo si se desactiva
    }
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Con_Presupuesto").addEventListener("change", toggleCampoPresupuesto);
    document.getElementById("Sin_Presupuesto").addEventListener("change", toggleCampoPresupuesto);
});

function toggleCampoPresupuesto() {
    const conPresupuesto = document.getElementById("Con_Presupuesto").checked;
    const campoPresupuesto = document.getElementById("presupuesto");

    if (conPresupuesto) {
        campoPresupuesto.removeAttribute("disabled");
    } else {
        campoPresupuesto.setAttribute("disabled", "true");
        campoPresupuesto.value = "";  // Limpiar el campo si se desactiva
    }
}*/

// Función para actualizar las opciones del campo intervalo_fecha_vto según la condición de venta
function toggleCampoCondicionVta() {
    const contado = document.getElementById("contado").checked;
    const intervaloFechaVto = document.getElementById("intervalo_fecha_vto");

    // Limpiar opciones existentes
    intervaloFechaVto.innerHTML = '';

    if (contado) {
        // Solo opción 0 días para contado
        intervaloFechaVto.innerHTML = '<option value="1">0 días</option>';
        intervaloFechaVto.value = "1";
        intervaloFechaVto.setAttribute('disabled', 'disabled');
    } else {
        // Opciones para crédito: 30, 60, 90, 120 días
        intervaloFechaVto.innerHTML =
            '<option value="2">30 días</option>' +
            '<option value="3">60 días</option>' +
            '<option value="4">90 días</option>' +
            '<option value="5">120 días</option>';
        intervaloFechaVto.value = "2"; // Por defecto 30 días
        intervaloFechaVto.removeAttribute('disabled');
    }
    // Refrescar el select si usas bootstrap-select por que osino no trae las opciones
    if (typeof $ !== "undefined" && typeof $('#intervalo_fecha_vto').selectpicker === "function") {
        $('#intervalo_fecha_vto').selectpicker('refresh');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contado").addEventListener("change", toggleCampoCondicionVta);
    document.getElementById("credito").addEventListener("change", toggleCampoCondicionVta);
    toggleCampoCondicionVta();
});

function obtenerFechaActualSistema() {
    var fecha = new Date();

    var dia = ("0" + fecha.getDate()).slice(-2);
    var mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    var anho = fecha.getFullYear();

    var hora = ("0" + fecha.getHours()).slice(-2);
    var minuto = ("0" + fecha.getMinutes()).slice(-2);
    var segundo = ("0" + fecha.getSeconds()).slice(-2);

    return dia + "/" + mes + "/" + anho + " " + hora + ":" + minuto + ":" + segundo;
}

function cargarDatosFuncionario(){
    $.ajax({
        url: getUrl()+"funcionario/datosFuncionario",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        datosFuncionario = resultado;

        $("#empresa_id").val(resultado.empresa_id);
        $("#empresa_desc").val(resultado.empresa_desc);

        $("#sucursal_id").val(resultado.sucursal_id);
        $("#suc_desc").val(resultado.suc_desc);

        $(".form-line").attr("class","form-line focused");
    })
    .fail(function(xhr, status, error){
        swal("Error", "No se pudieron obtener los datos del funcionario logueado", "error");
        console.log(xhr.responseText);
    });
}

function validarCamposNumericos(){

    $("#det_cantidad, #det_costo").on("keypress", function(e){

        var charCode = (e.which) ? e.which : e.keyCode;

        if (charCode >= 48 && charCode <= 57){
            return true;
        }

        if (charCode == 46){

            if ($(this).val().indexOf('.') !== -1){
                return false;
            }

            return true;
        }

        return false;
    });

}