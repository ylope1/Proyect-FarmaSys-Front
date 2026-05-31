var datosSesion = JSON.parse(sessionStorage.getItem("datosSesion"));
var usuarioLogueado = datosSesion ? datosSesion.user : null;
var token = datosSesion ? datosSesion.accessToken : null;
var datosFuncionario = null;

if (!datosSesion || !usuarioLogueado || !token) {
    swal("Sesión expirada", "Debe iniciar sesión nuevamente", "warning");
    setTimeout(function(){
        window.location.href = "../../../index.php";
    }, 1500);
} else {
    $("#user_id").val(usuarioLogueado.id);
    $("#user_name").val(usuarioLogueado.name);

    $.ajaxSetup({
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    listar();
    campoFecha();
    validarCamposNumericos();
}
function salir(){
    swal({
        title: "Salir",
        text: "¿Desea salir de la ventana de presupuestos?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: true
    }, function () {
        window.location.href = "../../../menu.php";
    });
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
                title:'Listado de Presupuestos de Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Presupuestos de Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Presupuestos de Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Presupuestos de Compras'
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

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);

    $("#txtFecha").val(obtenerFechaActualSistema());
    $("#txtFecAprob").val("");
    $("#txtFecAprob").attr("disabled","true");

    $("#proveedor_desc").removeAttr("disabled");
    $("#pedido").removeAttr("disabled");

    $("#empresa_desc").attr("disabled","true");
    $("#suc_desc").attr("disabled","true");

    $("#proveedor_id").val(0);
    $("#proveedor_desc").val("");

    $("#pedido_comp_id").val(0);
    $("#pedido").val("");

    $("#pre_estado").val("PENDIENTE");

    cargarDatosFuncionario();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

function editar(){
    $("#txtOperacion").val(2);

    $("#txtFecha").removeAttr("disabled");
    $("#txtFecAprob").attr("disabled","true");

    $("#proveedor_desc").removeAttr("disabled");
    $("#pedido").attr("disabled","true");

    $("#empresa_desc").attr("disabled","true");
    $("#suc_desc").attr("disabled","true");

    if ($("#txtFecAprob").val() === "null" || $("#txtFecAprob").val() === null) {
        $("#txtFecAprob").val("");
    }

    cargarDatosFuncionario();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function anular(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
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
        pregunta = "¿DESEA RECHAZAR EL PRESUPUESTO SELECCIONADO?";
    }
    if(oper===6){
        titulo = "APROBAR";
        pregunta = "¿DESEA APROBAR EL PRESUPUESTO SELECCIONADO?";
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
        url:getUrl()+"presup_comp_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";

        for(rs of resultado){
            var fechaAprob = rs.presup_comp_fec_aprob == null ? "" : rs.presup_comp_fec_aprob;

            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionPresupuesto("
                + rs.id + ",'"
                + rs.presup_comp_fec + "','"
                + fechaAprob + "',"
                + rs.proveedor_id + ",'"
                + rs.proveedor_desc + "',"
                + rs.empresa_id + ",'"
                + rs.empresa_desc + "',"
                + rs.sucursal_id + ",'"
                + rs.suc_desc + "',"
                + rs.pedido_comp_id + ",'"
                + rs.pedido + "','"
                + rs.presup_comp_estado + "',"
                + rs.user_id + ",'"
                + rs.name + "');\">";

            lista = lista + "<td>" + rs.id + "</td>";
            lista = lista + "<td>" + rs.presup_comp_fec + "</td>";
            lista = lista + "<td>" + fechaAprob + "</td>";
            lista = lista + "<td>" + rs.proveedor_desc + "</td>";
            lista = lista + "<td>" + rs.empresa_desc + "</td>";
            lista = lista + "<td>" + rs.suc_desc + "</td>";
            lista = lista + "<td>" + rs.name + "</td>";
            lista = lista + "<td>" + rs.presup_comp_estado + "</td>";
            lista = lista + "<td>" + rs.pedido + "</td>";
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
function seleccionPresupuesto(id, presup_comp_fec, presup_comp_fec_aprob, proveedor_id, proveedor_desc, empresa_id, empresa_desc, sucursal_id, suc_desc, pedido_comp_id, pedido, pre_estado, user_id, name){
    $("#id").val(id);
    $("#txtFecha").val(presup_comp_fec);
    $("#txtFecAprob").val(presup_comp_fec_aprob);

    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);

    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);

    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);

    $("#pedido_comp_id").val(pedido_comp_id);
    $("#pedido").val(pedido);

    $("#pre_estado").val(pre_estado);
    $("#user_id").val(user_id);
    $("#user_name").val(name);

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
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnCancelar").removeAttr("disabled");

    if (pre_estado === "PENDIENTE"){
        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (pre_estado === "CONFIRMADO"){
        $("#btnRechazar").removeAttr("disabled");
        $("#btnAprobar").removeAttr("disabled");
    }

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "presup_comp_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "presup_comp_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "presup_comp_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "presup_comp_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    if($("#txtOperacion").val()==5){
        endpoint = "presup_comp_cab/rechazar/"+$("#id").val();
        metodo = "PUT";
        estado = "RECHAZADO";
    } 
    if($("#txtOperacion").val()==6){
        endpoint = "presup_comp_cab/aprobar/"+$("#id").val();
        metodo = "PUT";
        estado = "APROBADO";
    }
    if($("#txtOperacion").val()==1 || $("#txtOperacion").val()==2){

        if ($("#proveedor_id").val() === "" || $("#proveedor_id").val() === "0") {
            swal("Atención", "Debe seleccionar un proveedor válido de la lista", "warning");
            return;
        }

        if ($("#txtOperacion").val()==1 && ($("#pedido_comp_id").val() === "" || $("#pedido_comp_id").val() === "0")) {
            swal("Atención", "Debe seleccionar un pedido válido de la lista", "warning");
            return;
        }

        if ($("#txtFecha").val() === "") {
            swal("Atención", "Debe ingresar la fecha del presupuesto", "warning");
            return;
        }
    }
    if($("#txtOperacion").val()==6){
        if ($("#txtFecAprob").val() === "") {
            swal("Atención", "Debe ingresar la fecha de aprobación del presupuesto", "warning");
            return;
        }
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'user_id': usuarioLogueado.id,
            'proveedor_id': $("#proveedor_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'pedido_comp_id': $("#pedido_comp_id").val(),
            'presup_comp_fec': $("#txtFecha").val(), 
            'presup_comp_fec_aprob': $("#txtFecAprob").val(),              
            'presup_comp_estado': estado,
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
                if(resultado.registro.pre_estado!= "PENDIENTE"){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(a,b,c){
        let mensaje = "Ocurrió un error al procesar el registro";

        if (a.responseJSON && a.responseJSON.mensaje) {
            mensaje = a.responseJSON.mensaje;
        }

        swal("Atención", mensaje, "warning");
        console.log(a.responseText);
    });
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function validarCamposNumericos(){
    $("#det_cantidad, #det_costo").on("keypress", function(e){
        var charCode = (e.which) ? e.which : e.keyCode;

        if (charCode >= 48 && charCode <= 57) {
            return true;
        }

        if (charCode == 46) {
            return true;
        }

        return false;
    });
}

function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    //$("#prod_desc").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function grabarDetalle(){ 
    if ($("#id").val() === "" || $("#id").val() === "0") {
        swal("Atención", "Debe grabar primero la cabecera del presupuesto", "warning");
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
            swal("Atención", "El costo debe ser un número mayor o igual a cero", "warning");
            return;
        }
    }
    if ($("#txtOperacionDetalle").val() == 3) {
        if ($("#producto_id").val() === "" || $("#producto_id").val() === "0") {
            swal("Atención", "Debe seleccionar un producto para eliminar", "warning");
            return;
        }
    }
    var endpoint = "presup_comp_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "presup_comp_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "presup_comp_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "presup_comp_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "presup_comp_cant":$("#det_cantidad").val(),
            "presup_comp_costo":$("#det_costo").val()
        }
    })
    .done(function(respuesta) {
        listarDetalles();

        $("#btnAgregarDetalle").attr("Style","display:inline");
        $("#btnEditarDetalle").attr("Style","display:inline");
        $("#btnEliminarDetalle").attr("Style","display:inline");
        $("#btnGrabarDetalle").attr("Style","display:none");

        $("#txtOperacionDetalle").val(1);
        $("#producto_id").val("0");
        $("#prod_desc").val("");
        $("#det_cantidad").val("");
        $("#det_costo").val("");
    })
    .fail(function(a,b,c){
        let mensaje = "Ocurrió un error al guardar el registro";

        if (a.responseJSON && a.responseJSON.mensaje) {
            mensaje = a.responseJSON.mensaje;
        }

        swal("Atención", mensaje, "warning");
        console.log(a.responseText);
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

function listarDetalles() {
    var cantidadDetalle = 0;
    var totalGral = 0;
    $.ajax({
        url:getUrl()+"presup_comp_det/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.producto_id+",'"+rs.prod_desc+"',"+rs.presup_comp_cant+","+rs.presup_comp_costo+");\">";
            lista = lista + "<td>";
            lista = lista + rs.producto_id;
            lista = lista +"</td>";
            lista = lista + "<td>";
            lista = lista + rs.prod_desc;
            lista = lista +"</td>";
            lista = lista + "<td>";
            lista = lista + rs.presup_comp_cant;
            lista = lista +"</td>";
            lista = lista + "<td class='text-right'>";
            lista = lista + rs.presup_comp_costo;
            lista = lista +"</td>";
            lista = lista + "<td class='text-right'>";
            lista = lista + (rs.presup_comp_cant*rs.presup_comp_costo);
            lista = lista +"</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
            totalGral +=(rs.presup_comp_cant*rs.presup_comp_costo);
        }
        $("#tableDetalles").html(lista);
        $("#txtTotalGral").text(totalGral);
        if($("#pre_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        }else{
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(a, b, c) {
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionDetalle(producto_id, prod_desc, presup_comp_cant, presup_comp_costo){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(presup_comp_cant);
    $("#det_costo").val(presup_comp_costo);
}

function buscarProveedores(){
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
}

function buscarPedidos(){
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
}
function buscarEmpresas(){
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
}

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