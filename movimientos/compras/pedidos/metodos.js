var datosSesion = JSON.parse(sessionStorage.getItem("datosSesion"));
var usuarioLogueado = datosSesion;
var token = sessionStorage.getItem("accessToken");
var datosFuncionario = null;

var rutaPantalla = "movimientos/compras/pedidos/";

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
                title:'Listado de Pedidos Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Pedidos Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Pedidos Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Pedidos Compras'
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
        text: "¿Desea salir de la ventana de pedidos?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: true
    }, function () {
        window.location.href = "../../../menu.php";
    });
}

function agregar(){
    if (!tienePermiso(rutaPantalla, "crear")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para agregar pedidos.", "warning");
        return;
    }
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#txtFecha").val(obtenerFechaActualSistema());
    $("#txtFecAprob").val("");
    $("#txtFecAprob").attr("disabled","true");
    cargarDatosFuncionario();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

function editar(){
    if (!tienePermiso(rutaPantalla, "modificar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para modificar pedidos.", "warning");
        return;
    }
    $("#txtOperacion").val(2);

    $("#txtFecha").attr("disabled","true");
    $("#txtFecAprob").attr("disabled","true");

    if ($("#txtFecAprob").val() === "null" || $("#txtFecAprob").val() === null) {
        $("#txtFecAprob").val("");
    }

    cargarDatosFuncionario();
    
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function anular(){
    if (!tienePermiso(rutaPantalla, "anular")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para anular pedidos.", "warning");
        return;
    }
    $("#txtOperacion").val(3);
    console.log("Operación de Anular activada, txtOperacion:", $("#txtOperacion").val());

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    if (!tienePermiso(rutaPantalla, "confirmar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para confirmar pedidos.", "warning");
        return;
    }
    $("#txtOperacion").val(4);
    console.log("Operación de Confirmar activada, txtOperacion:", $("#txtOperacion").val());

    $("#txtFecAprob").val(obtenerFechaActualSistema());

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
        url: getUrl()+"pedido_comp_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            console.log("Registro obtenido:", rs);
            var fechaAprob = rs.pedido_comp_fec_aprob == null ? "" : rs.pedido_comp_fec_aprob;
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionPedido(" +rs.id+ ",'" +rs.pedido_comp_fec+ "','" +fechaAprob+ "',"+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.user_id+",'"+rs.encargado+"','"+rs.pedido_comp_estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido_comp_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + fechaAprob;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.suc_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.encargado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido_comp_estado;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}

function seleccionPedido(id_pedido, pedido_fecha, pedido_fec_aprob, empresa_id, empresa_desc, sucursal_id, suc_desc, user_id, encargado, pedido_estado) {
    
    $("#id").val(id_pedido);
    $("#txtFecha").val(pedido_fecha);
    $("#txtFecAprob").val(pedido_fec_aprob);
    $("#emp_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);
    $("#suc_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#user_id").val(user_id);
    $("#user_name").val(encargado);
    $("#pedido_estado").val(pedido_estado);

    $("#detalles").attr("style","display:block;");
    $("#registros").attr("style","display:none;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnAnular, #btnConfirmar").attr("disabled", "true");
    $("#btnCancelar").removeAttr("disabled");

    if(pedido_estado === "PENDIENTE") {
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        if (tienePermiso(rutaPantalla, "anular")) {
            $("#btnAnular").removeAttr("disabled");
        }

        if (tienePermiso(rutaPantalla, "confirmar")) {
            $("#btnConfirmar").removeAttr("disabled");
        }

        if (tienePermiso(rutaPantalla, "modificar")) {
            $("#btnEditar").removeAttr("disabled");
        }

        $("#formDetalles").attr("style","display:block;");
    }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "pedido_comp_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "pedido_comp_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "pedido_comp_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "pedido_comp_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'pedido_comp_fec': $("#txtFecha").val(), 
            'pedido_comp_fec_aprob': $("#txtFecAprob").val(), 
            'pedido_comp_estado': estado,
            'empresa_id': $("#emp_id").val(),
            'sucursal_id': $("#suc_id").val(),
            'user_id': usuarioLogueado.id,
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
                if(resultado.registro.pedido_comp_estado != "PENDIENTE"){
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
    $("#emp_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);

    $("#listaEmpresas").html("");
    $("#listaEmpresas").attr("style","display:none;");
}*/
/*function buscarSucursales(){
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

function seleccionSucursal(suc_id, suc_desc){
    $("#suc_id").val(suc_id);
    $("#suc_desc").val(suc_desc);

    $("#listaSucursales").html("");
    $("#listaSucursales").attr("style","display:none;");
}*/
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

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    console.log("Operación de editarDetalle activada, txtOperacionDetalle:", $("#txtOperacionDetalle").val());
    $("#det_cantidad").removeAttr("disabled");
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
    if ($("#txtOperacionDetalle").val() != 3) {

        if ($("#producto_id").val() === "" || $("#producto_id").val() === "0") {
            swal("Atención", "Debe seleccionar un producto válido de la lista", "warning");
            return;
        }

        if ($("#det_cantidad").val() === "") {
            swal("Atención", "Debe ingresar la cantidad del producto", "warning");
            return;
        }

        var cantidad = parseInt($("#det_cantidad").val());

        if (isNaN(cantidad) || cantidad <= 0) {
            swal("Atención", "La cantidad debe ser un número mayor a cero", "warning");
            return;
        }
    }

    var endpoint = "pedido_comp_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "pedido_comp_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "pedido_comp_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "pedido_comp_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "pedido_comp_cant":$("#det_cantidad").val()
        }
    })
    .done(function(respuesta) {
        listarDetalles();
    })
    .fail(function(a,b,c){
        let mensaje = "Ocurrió un error al guardar el registro";

        if (a.responseJSON && a.responseJSON.mensaje) {
            mensaje = a.responseJSON.mensaje;
        }

        swal("Atención", mensaje, "warning");
        console.log(a.responseText);
    });
    
    $("#btnAgregarDetalle").attr("Style","display:inline");
    $("#btnEditarDetalle").attr("Style","display:inline");
    $("#btnEliminarDetalle").attr("Style","display:inline");
    $("#btnGrabarDetalle").attr("Style","display:none");

    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").val("");
    $("#det_cantidad").val("");
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
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

function seleccionProducto(producto_id,prod_desc){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);

    $("#ListaProductos").html("");
    $("#ListaProductos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    $.ajax({
        url:getUrl()+"pedido_comp_det/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.producto_id+",'"+rs.prod_desc+"',"+rs.pedido_comp_cant+");\">";
                lista = lista + "<td>";
                lista = lista + rs.producto_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prod_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido_comp_cant;
                lista = lista +"</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalles").html(lista);
        if($("#pedido_estado").val() === "PENDIENTE" && cantidadDetalle > 0 && tienePermiso(rutaPantalla, "confirmar")) {
            $("#btnConfirmar").removeAttr("disabled");
        }else{
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    })
}
function seleccionDetalle(producto_id, prod_desc, det_cantidad){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(det_cantidad);
}

function cargarDatosFuncionario(){
    $.ajax({
        url: getUrl()+"funcionario/datosFuncionario",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        datosFuncionario = resultado;

        $("#emp_id").val(resultado.empresa_id);
        $("#empresa_desc").val(resultado.empresa_desc);

        $("#suc_id").val(resultado.sucursal_id);
        $("#suc_desc").val(resultado.suc_desc);

        $(".form-line").attr("class","form-line focused");
    })
    .fail(function(xhr, status, error){
        swal("Error", "No se pudieron obtener los datos del funcionario logueado", "error");
        console.log(xhr.responseText);
    });
}