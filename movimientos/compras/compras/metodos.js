var datosSesion = JSON.parse(sessionStorage.getItem("datosSesion"));
var usuarioLogueado = datosSesion;
var token = sessionStorage.getItem("accessToken");
var datosFuncionario = null;

var rutaPantalla = "movimientos/compras/compras/";

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
                title:'Listado de Registros de Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Registros de Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Registros de Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Registros de Compras'
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
        text: "¿Desea salir de la ventana de compras?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: true
    }, function () {
        window.location.href = "../../../menu.php";
    });
}

function agregar() {
    if (!tienePermiso(rutaPantalla, "crear")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para agregar compras.", "warning");
        return;
    }

    $("#txtOperacion").val(1);
    $("#id").val(0);

    $("#orden").removeAttr("disabled");
    $("#deposito_desc").removeAttr("disabled");
    $("#txtFecha").val(obtenerFechaActualSistema());
    $("#txtTimbrado").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");

    $("#txtFecRecep").attr("disabled", "true");
    $("#proveedor_desc").attr("disabled", "true");
    $("#empresa_desc").attr("disabled", "true");
    $("#suc_desc").attr("disabled", "true");
    cargarDatosFuncionario();
    $("#contado").attr("disabled", "true");
    $("#credito").attr("disabled", "true");
    toggleCampoCondicionVta();
    $("#txtCantCta").attr("disabled", "true");
    $("#intervalo_fecha_vto").attr("disabled", "true");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $("#registros").attr("style", "display:none;");
    $(".form-line").attr("class", "form-line focused");
}

function editar() {
    if (!tienePermiso(rutaPantalla, "modificar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para modificar compras.", "warning");
        return;
    }

    if ($("#compra_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Atención", "Solo se pueden modificar compras en estado PENDIENTE.", "warning");
        return;
    }

    $("#txtOperacion").val(2);

    $("#deposito_desc").removeAttr("disabled");
    $("#txtFecha").removeAttr("disabled");
    $("#txtTimbrado").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");

    $("#orden").attr("disabled", "true");
    $("#txtFecRecep").attr("disabled", "true");
    if ($("#txtFecRecep").val() === "null" || $("#txtFecRecep").val() === null) {
        $("#txtFecRecep").val("");
    }
    $("#proveedor_desc").attr("disabled", "true");
    $("#empresa_desc").attr("disabled", "true");
    $("#suc_desc").attr("disabled", "true");
    $("#contado").attr("disabled", "true");
    $("#credito").attr("disabled", "true");
    $("#txtCantCta").attr("disabled", "true");
    $("#intervalo_fecha_vto").attr("disabled", "true");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}

function anular(){
    if (!tienePermiso(rutaPantalla, "anular")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para anular compras.", "warning");
        return;
    }

    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    if (!tienePermiso(rutaPantalla, "confirmar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para confirmar presupuestos.", "warning");
        return;
    }

    $("#txtOperacion").val(4);
    $("#txtFecRecep").val(obtenerFechaActualSistema());

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

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
        url:getUrl()+"compras_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";

        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionCompra("+
                rs.id+","+
                rs.empresa_id+",'"+rs.empresa_desc+"',"+
                rs.sucursal_id+",'"+rs.suc_desc+"',"+
                rs.deposito_id+",'"+rs.deposito_desc+"','"+
                rs.compra_fec+"','"+
                (rs.compra_fec_recep || '')+"',"+
                rs.proveedor_id+",'"+rs.proveedor_desc+"','"+
                rs.compra_timbrado+"','"+
                rs.compra_fact+"',"+
                rs.tipo_fact_id+","+
                (rs.compra_ifv || 0)+","+
                (rs.compra_cant_cta || 1)+","+
                rs.orden_comp_id+",'"+
                rs.orden+"','"+
                rs.compra_estado+"',"+
                rs.user_id+",'"+
                rs.encargado+
            "');\">";

                lista = lista + "<td>"+rs.id+"</td>";
                lista = lista + "<td>"+rs.empresa_desc+"</td>";
                lista = lista + "<td>"+rs.suc_desc+"</td>";
                lista = lista + "<td>"+rs.deposito_desc+"</td>";
                lista = lista + "<td>"+rs.compra_fec+"</td>";
                lista = lista + "<td>"+(rs.compra_fec_recep || '')+"</td>";
                lista = lista + "<td>"+rs.proveedor_desc+"</td>";
                lista = lista + "<td>"+rs.compra_fact+"</td>";
                lista = lista + "<td>"+rs.tipo_fact_desc+"</td>";
                lista = lista + "<td>"+(rs.compra_ifv || 0)+"</td>";
                lista = lista + "<td>"+(rs.compra_cant_cta || 1)+"</td>";
                lista = lista + "<td>"+rs.orden+"</td>";
                lista = lista + "<td>"+rs.compra_estado+"</td>";
                lista = lista + "<td>"+rs.encargado+"</td>";

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

function seleccionCompra(id, empresa_id, empresa_desc, sucursal_id, suc_desc, deposito_id, deposito_desc, compra_fec, compra_fec_recep, proveedor_id, proveedor_desc, compra_timbrado, compra_fact, tipo_fact_id, compra_ifv, compra_cant_cta, orden_comp_id, orden, compra_estado, user_id, encargado){ 
    $("#id").val(id);

    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   

    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);

    $("#deposito_id").val(deposito_id);
    $("#deposito_desc").val(deposito_desc);

    $("#txtFecha").val(compra_fec);
    $("#txtFecRecep").val(compra_fec_recep);

    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);

    $("#txtTimbrado").val(compra_timbrado);
    $("#txtNroFact").val(compra_fact);

    $("#txtCantCta").val(compra_cant_cta);

    $("#orden_comp_id").val(orden_comp_id);
    $("#orden").val(orden);

    $("#compra_estado").val(compra_estado);

    $("#user_id").val(user_id);
    $("#user_name").val(encargado);

    if (tipo_fact_id == 6) {
        $("#contado").prop("checked", true);
        $("#credito").prop("checked", false);
    } else if (tipo_fact_id == 7) {
        $("#credito").prop("checked", true);
        $("#contado").prop("checked", false);
    }
    cargarIntervaloFechaVto(compra_ifv);
    toggleCampoCondicionVta();
    
    $("#empresa_desc").attr("disabled", "true");
    $("#suc_desc").attr("disabled", "true");
    $("#deposito_desc").attr("disabled", "true");
    $("#txtFecha").attr("disabled", "true");
    $("#txtFecRecep").attr("disabled", "true");
    $("#proveedor_desc").attr("disabled", "true");
    $("#txtTimbrado").attr("disabled", "true");
    $("#txtNroFact").attr("disabled", "true");
    $("#contado").attr("disabled", "true");
    $("#credito").attr("disabled", "true");
    $("#txtCantCta").attr("disabled", "true");
    $("#intervalo_fecha_vto").attr("disabled", "true");
    $("#orden").attr("disabled", "true");

    $("#detalles").attr("style","display:block;");
    $("#registros").attr("style","display:none;");
    $("#formDetalles").attr("style","display:none;");

    listarDetalles();   

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnCancelar").removeAttr("disabled");

    if (compra_estado === "PENDIENTE"){   
        if (tienePermiso(rutaPantalla, "anular")) {
            $("#btnAnular").removeAttr("disabled");
        }

        if (tienePermiso(rutaPantalla, "modificar")) {
            $("#btnEditar").removeAttr("disabled");
        }

        if (tienePermiso(rutaPantalla, "confirmar")) {
            $("#btnConfirmar").removeAttr("disabled");
        }

        $("#formDetalles").attr("style","display:block;");
    }

    if (compra_estado === "RECIBIDO" || compra_estado === "ANULADO"){   
        $("#formDetalles").attr("style","display:none;");
    }

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "compras_cab/create";
    var metodo = "POST";

    if ($("#txtOperacion").val() == 1 || $("#txtOperacion").val() == 2) {
        if ($("#orden_comp_id").val() == "" || $("#orden_comp_id").val() == "0") {
            mensajeOperacion("Atención", "Debe seleccionar una orden de compra aprobada.", "warning");
            return;
        }

        if ($("#deposito_id").val() == "" || $("#deposito_id").val() == "0") {
            mensajeOperacion("Atención", "Debe seleccionar un depósito.", "warning");
            return;
        }

        if ($("#txtFecha").val().trim() == "") {
            mensajeOperacion("Atención", "Debe ingresar la fecha de la factura.", "warning");
            return;
        }

        if ($("#txtTimbrado").val().trim() == "") {
            mensajeOperacion("Atención", "Debe ingresar el timbrado.", "warning");
            return;
        }

        if ($("#txtNroFact").val().trim() == "") {
            mensajeOperacion("Atención", "Debe ingresar el número de factura.", "warning");
            return;
        }
    }
    
    if($("#txtOperacion").val()==2){
        endpoint = "compras_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "compras_cab/anular/"+$("#id").val();
        metodo = "PUT";
    }

    if($("#txtOperacion").val()==4){
        endpoint = "compras_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
    } 

    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'orden_comp_id': $("#orden_comp_id").val(),
            'deposito_id': $("#deposito_id").val(),
            'compra_fact': $("#txtNroFact").val(),
            'compra_timbrado': $("#txtTimbrado").val(),
            'compra_fec': $("#txtFecha").val(),
            'compra_cant_cta': $("#txtCantCta").val(),
            'operacion': $("#txtOperacion").val()
        }
    })
    .done(function(resultado){
        swal({
            title:"Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        }, function(){
            if(resultado.tipo == "success"){
                if (resultado.registro && resultado.registro.id) {
                    $("#id").val(resultado.registro.id);
                    $("#detalles").attr("style","display:block;");
                    listarDetalles();
                } else {
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(a,b,c){
        console.log(a.responseText);

        let mensaje = "Error desconocido";
        try {
            let json = JSON.parse(a.responseText);
            mensaje = json.mensaje || json.message || mensaje;
        } catch (e) {
            mensaje = a.responseText;
        }

        swal("Error", mensaje, "error");
    });
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function agregarDetalle(){
    if ($("#compra_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Atención", "Solo se puede agregar detalle en compras en estado PENDIENTE.", "warning");
        return;
    }

    if ($("#id").val() == "" || $("#id").val() == "0") {
        mensajeOperacion("Atención", "Primero debe grabar la cabecera de la compra.", "warning");
        return;
    }

    $("#txtOperacionDetalle").val(1);

    $("#producto_id").val(0);
    $("#prod_desc").val("");
    $("#det_cantidad").val("");
    $("#det_costo").val("");

    $("#prod_desc").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");

    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");

    $(".form-line").attr("class","form-line focused");
}

function editarDetalle(){
    if ($("#compra_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Atención", "Solo se puede modificar detalle de compras en estado PENDIENTE.", "warning");
        return;
    }

    if ($("#producto_id").val() == "" || $("#producto_id").val() == "0") {
        mensajeOperacion("Atención", "Debe seleccionar un producto del detalle.", "warning");
        return;
    }

    $("#txtOperacionDetalle").val(2);

    $("#prod_desc").attr("disabled", "true");
    $("#det_cantidad").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");

    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function eliminarDetalle(){
    if ($("#compra_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Atención", "Solo se puede eliminar detalle de compras en estado PENDIENTE.", "warning");
        return;
    }

    if ($("#producto_id").val() == "" || $("#producto_id").val() == "0") {
        mensajeOperacion("Atención", "Debe seleccionar un producto del detalle.", "warning");
        return;
    }

    $("#txtOperacionDetalle").val(3);

    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function grabarDetalle(){ 
    if ($("#compra_estado").val() !== "PENDIENTE") {
        mensajeOperacion("Atención", "Solo se puede modificar detalle de compras en estado PENDIENTE.", "warning");
        return;
    }

    if ($("#producto_id").val() == "" || $("#producto_id").val() == "0") {
        mensajeOperacion("Atención", "Debe seleccionar un producto del detalle.", "warning");
        return;
    }

    if ($("#txtOperacionDetalle").val() == 2) {
        if ($("#det_cantidad").val() == "" || Number($("#det_cantidad").val()) <= 0) {
            mensajeOperacion("Atención", "La cantidad debe ser mayor a cero.", "warning");
            return;
        }

        if ($("#det_costo").val() == "" || Number($("#det_costo").val()) < 0) {
            mensajeOperacion("Atención", "El costo no puede ser negativo.", "warning");
            return;
        }
    }

    var endpoint = "compras_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "compras_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "compras_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "compra_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "compra_cant":$("#det_cantidad").val(),
            "compra_costo":$("#det_costo").val()
        }
    })
    .done(function(respuesta) {
        mensajeOperacion("Respuesta", respuesta.mensaje, respuesta.tipo);
        listarDetalles();

        $("#btnAgregarDetalle").attr("style","display:inline");
        $("#btnEditarDetalle").attr("style","display:inline");
        $("#btnEliminarDetalle").attr("style","display:inline");
        $("#btnGrabarDetalle").attr("style","display:none");

        $("#txtOperacionDetalle").val(1);
        $("#producto_id").val(0);
        $("#prod_desc").val("");
        $("#det_cantidad").val("");
        $("#det_costo").val("");

        $("#prod_desc").attr("disabled", "true");
        $("#det_cantidad").attr("disabled", "true");
        $("#det_costo").attr("disabled", "true");
    })
    .fail(function(a,b,c){
        console.log(a.responseText);

        let mensaje = "Error desconocido";
        try {
            let json = JSON.parse(a.responseText);
            mensaje = json.mensaje || json.message || mensaje;
        } catch (e) {
            mensaje = a.responseText;
        }

        swal("Error", mensaje, "error");
    });
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
        alert(c);
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
/*
function listarDetalles() {
    var cantidadDetalle = 0;
    var totalGral = 0;
    var totalExentas = 0;
    var totalIva5 = 0;
    var totalIva10 = 0;
    $.ajax({
        url: getUrl() + "compras_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        var lista = "";

        for (let rs of resultado) {
            let cantidad = Number(rs.compra_cant) || 0;
            let costo = Number(rs.compra_costo) || 0;
            let subtotal = Number(rs.subtotal) || 0;
            let exentas = Number(rs.exentas) || 0;
            let iva5 = Number(rs.iva_5) || 0;
            let iva10 = Number(rs.iva_10) || 0;

            totalGral += subtotal;
            totalExentas += exentas;
            totalIva5 += iva5;
            totalIva10 += iva10;
            cantidadDetalle++;

            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + 
                rs.producto_id + ",'" + 
                (rs.prod_desc || '') + "'," + 
                cantidad + "," + 
                costo + ");\">";

            lista += "<td>" + rs.producto_id + "</td>";
            lista += "<td>" + (rs.prod_desc || '') + "</td>";
            lista += "<td>" + cantidad + "</td>";
            lista += "<td class='text-right'>" + costo.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + exentas.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + iva5.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + iva10.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + subtotal.toFixed(0) + "</td>";
            lista += "</tr>";
        }

        $("#tableDetalles").html(lista);

        $("#txtTotalExentas").text(totalExentas.toFixed(0));
        $("#txtTotalIva5").text(totalIva5.toFixed(0));
        $("#txtTotalIva10").text(totalIva10.toFixed(0));
        $("#txtTotalGral").text(totalGral.toFixed(0));

        if ($("#compra_estado").val() === "PENDIENTE" && cantidadDetalle > 0 && tienePermiso(rutaPantalla, "confirmar")) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function (a, b, c) {
        console.log(a.responseText);
        swal("Error", "No se pudo listar el detalle de la compra.", "error");
    });
}
function seleccionDetalle(producto_id, prod_desc, compra_cant, compra_costo){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(compra_cant);
    $("#det_costo").val(compra_costo);
}*/

function listarDetalles() {
    var cantidadDetalle = 0;

    var totalGral = 0;
    var totalExentas = 0;
    var totalGrav5 = 0;
    var totalGrav10 = 0;

    var totalIva5 = 0;
    var totalIva10 = 0;

    $.ajax({
        url: getUrl() + "compras_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        var lista = "";

        for (let rs of resultado) {
            let cantidad = Number(rs.compra_cant) || 0;
            let costo = Number(rs.compra_costo) || 0;
            let subtotal = cantidad * costo;

            let exentas = 0;
            let grav5 = 0;
            let grav10 = 0;
            let iva5 = 0;
            let iva10 = 0;

            if (Number(rs.impuesto_id) === 3) {
                exentas = subtotal;
            }

            if (Number(rs.impuesto_id) === 2) {
                grav5 = subtotal;
                iva5 = subtotal - (subtotal / 1.05);
            }

            if (Number(rs.impuesto_id) === 1) {
                grav10 = subtotal;
                iva10 = subtotal - (subtotal / 1.10);
            }

            totalGral += subtotal;
            totalExentas += exentas;
            totalGrav5 += grav5;
            totalGrav10 += grav10;
            totalIva5 += iva5;
            totalIva10 += iva10;
            cantidadDetalle++;

            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + 
                rs.producto_id + ",'" + 
                (rs.prod_desc || '') + "'," + 
                cantidad + "," + 
                costo + ");\">";

            lista += "<td>" + rs.producto_id + "</td>";
            lista += "<td>" + (rs.prod_desc || '') + "</td>";
            lista += "<td>" + cantidad + "</td>";
            lista += "<td class='text-right'>" + costo.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + exentas.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + grav5.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + grav10.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + subtotal.toFixed(0) + "</td>";
            lista += "</tr>";
        }

        $("#tableDetalles").html(lista);

        var pie = "";
        pie += "<tr>";
        pie += "<th colspan='4' class='text-right'>Totales</th>";
        pie += "<th class='text-right'>" + totalExentas.toFixed(0) + "</th>";
        pie += "<th class='text-right'>" + totalGrav5.toFixed(0) + "</th>";
        pie += "<th class='text-right'>" + totalGrav10.toFixed(0) + "</th>";
        pie += "<th class='text-right'>" + totalGral.toFixed(0) + "</th>";
        pie += "</tr>";

        pie += "<tr>";
        pie += "<th colspan='4' class='text-right'>Liquidación IVA</th>";
        pie += "<th class='text-right'>" + totalExentas.toFixed(0) + "</th>";
        pie += "<th class='text-right'>" + totalIva5.toFixed(0) + "</th>";
        pie += "<th class='text-right'>" + totalIva10.toFixed(0) + "</th>";
        pie += "<th class='text-right'>" + (totalIva5 + totalIva10).toFixed(0) + "</th>";
        pie += "</tr>";

        $("#tableDetalles").closest("table").find("tfoot").html(pie);

        if ($("#compra_estado").val() === "PENDIENTE" && cantidadDetalle > 0 && tienePermiso(rutaPantalla, "confirmar")) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function (a, b, c) {
        console.log(a.responseText);
        swal("Error", "No se pudo listar el detalle de la compra.", "error");
    });
}

function seleccionDetalle(producto_id, prod_desc, compra_cant, compra_costo){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(compra_cant);
    $("#det_costo").val(compra_costo);
}
function buscarOrdenes(){
    $.ajax({
        url:getUrl()+"orden_comp_cab/buscar",
        method:"POST",
        dataType: "json",
        data: {
            'name': $("#orden").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";

        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionOrden("+
                rs.orden_comp_id+","+
                rs.proveedor_id+",'"+
                rs.proveedor_desc+"',"+
                rs.tipo_fact_id+",'"+
                rs.tipo_fact_desc+"',"+
                (rs.orden_comp_ifv || 0)+",'"+
                rs.orden+
            "')\">"+rs.orden+"</li>";
        }

        lista += "</ul>";
        $("#listaOrdenes").html(lista);
        $("#listaOrdenes").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}
function seleccionOrden(orden_comp_id, proveedor_id, proveedor_desc, tipo_fact_id, tipo_fact_desc, orden_comp_ifv, orden){
    $("#orden_comp_id").val(orden_comp_id);
    $("#orden").val(orden);

    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);

    if (tipo_fact_id == 6) {
        $("#contado").prop("checked", true);
        $("#credito").prop("checked", false);
        $("#txtCantCta").val(1);
        $("#txtCantCta").attr("disabled", "true");
        $("#intervalo_fecha_vto").val(0);
    } else if (tipo_fact_id == 7) {
        $("#credito").prop("checked", true);
        $("#contado").prop("checked", false);
        $("#txtCantCta").val("");
        $("#txtCantCta").removeAttr("disabled");
        cargarIntervaloFechaVto(orden_comp_ifv);
    }

    toggleCampoCondicionVta();

    $("#listaOrdenes").html("");
    $("#listaOrdenes").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function buscarDepositos(){
    $.ajax({
        url: getUrl()+"deposito/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'deposito_desc': $("#deposito_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionDeposito("+rs.id+",'"+rs.deposito_desc+"');\">"+rs.deposito_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaDepositos").html(lista);
        $("#listaDepositos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionDeposito(deposito_id, deposito_desc){
    $("#deposito_id").val(deposito_id);
    $("#deposito_desc").val(deposito_desc);

    $("#listaDepositos").html("");
    $("#listaDepositos").attr("style","display:none;");
}

function toggleCampoCondicionVta() {
    $("#contado").attr("disabled", "true");
    $("#credito").attr("disabled", "true");
    $("#intervalo_fecha_vto").attr("disabled", "true");

    if (typeof $ !== "undefined" && typeof $('#intervalo_fecha_vto').selectpicker === "function") {
        $('#intervalo_fecha_vto').selectpicker('refresh');
    }
}

// Asociar eventos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contado").addEventListener("change", toggleCampoCondicionVta);
    document.getElementById("credito").addEventListener("change", toggleCampoCondicionVta);
    toggleCampoCondicionVta(); // Inicialización
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

function cargarIntervaloFechaVto(valor){
    $("#intervalo_fecha_vto").html(
        '<option value="1">0 días</option>' +
        '<option value="2">30 días</option>' +
        '<option value="3">60 días</option>' +
        '<option value="4">90 días</option>' +
        '<option value="5">120 días</option>'
    );

    $("#intervalo_fecha_vto").val(String(valor));

    $("#intervalo_fecha_vto").attr("disabled", "true");

    if (typeof $ !== "undefined" && typeof $('#intervalo_fecha_vto').selectpicker === "function") {
        $('#intervalo_fecha_vto').selectpicker('refresh');
    }
}

