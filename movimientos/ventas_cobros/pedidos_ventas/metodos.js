listar();
campoFecha();
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
                title:'Listado de Pedidos de Clientes'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Pedidos de Clientes'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Pedidos de Clientes'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Pedidos de Clientes'
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
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecConf").removeAttr("disabled");
    $("#txtFecEnv").removeAttr("disabled");
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled");
    $("#cliente_ci").removeAttr("disabled");

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
    $("#txtOperacion").val(2);
    console.log("Operación de Editar activada, txtOperacion:", $("#txtOperacion").val());
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecConf").removeAttr("disabled");
    $("#txtFecEnv").removeAttr("disabled");
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled");
    $("#cliente_ci").removeAttr("disabled");
    
    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function anular(){
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
    $("#txtOperacion").val(4);
    console.log("Operación de Confirmar activada, txtOperacion:", $("#txtOperacion").val());

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
        url: getUrl()+"pedidos_vent_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            console.log("Registro obtenido:", rs);
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionPedidoVenta(" +rs.id+ ",'" +rs.pedido_vent_fec+ "','"+rs.pedido_vent_fec_conf+"','"+rs.pedido_vent_fec_env+"',"+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.cliente_id+","+rs.cliente_ci+",'"+rs.nombre_cliente+"','"+rs.cli_ruc+"','"+rs.pedido_vent_estado+"',"+rs.user_id+",'"+rs.vendedor+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido_vent_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido_vent_fec_conf;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido_vent_fec_env;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.suc_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cliente_ci;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.nombre_cliente;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cli_ruc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido_vent_estado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.vendedor;
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

function seleccionPedidoVenta(id, pedido_vent_fec, pedido_vent_fec_conf, pedido_vent_fec_env, empresa_id, empresa_desc, sucursal_id, suc_desc, cliente_id, cliente_ci, nombre_cliente, cli_ruc, pedido_vent_estado, user_id, vendedor){
    
    $("#id").val(id);
    $("#txtFecha").val(pedido_vent_fec);
    $("#txtFecConf").val(pedido_vent_fec_conf ? pedido_vent_fec_conf : '');
    $("#txtFecEnv").val(pedido_vent_fec_env ? pedido_vent_fec_env : '');
    $("#emp_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);
    $("#suc_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#cliente_id").val(cliente_id);
    $("#cliente_ci").val(cliente_ci);
    $("#nombre_cliente").val(nombre_cliente);
    $("#cli_ruc").val(cli_ruc);
    $("#pedido_vent_estado").val(pedido_vent_estado);
    $("#user_id").val(user_id);
    $("#vendedor").val(vendedor);

    $("#detalles").attr("style","display:block;");
    $("#registros").attr("style","display:none;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();

    $("#btnAgregar, #btnEditar, #btnGrabar, #btnCancelar, #btnAnular, #btnConfirmar").attr("disabled", "true");
    $("#btnCancelar").removeAttr("disabled");

    if(pedido_vent_estado === "PENDIENTE") {
        
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "pedidos_vent_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "pedidos_vent_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "pedidos_vent_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "pedidos_vent_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'empresa_id': $("#emp_id").val(),
            'sucursal_id': $("#suc_id").val(),
            'user_id': $("#user_id").val(),
            'pedido_vent_fec': $("#txtFecha").val(), 
            'pedido_vent_fec_conf': $("#txtFecConf").val(), 
            'pedido_vent_fec_env': $("#txtFecEnv").val(),
            'cliente_id': $("#cliente_id").val(),
            'pedido_vent_estado': estado,
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
                if(resultado.registro.pedido_vent_estado != "PENDIENTE"){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
        let mensaje = "Error desconocido";
        try {
            let json = JSON.parse(a.responseText);
            mensaje = json.message || mensaje;
        } catch (e) {
            mensaje = a.responseText;
        }

        // Usar SweetAlert v1
        swal("Error", mensaje, "error");
    });
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
    $("#emp_id").val(empresa_id);
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

function seleccionSucursal(suc_id, suc_desc){
    $("#suc_id").val(suc_id);
    $("#suc_desc").val(suc_desc);

    $("#listaSucursales").html("");
    $("#listaSucursales").attr("style","display:none;");
}

function buscarClientes(){
    $.ajax({
        url: getUrl()+"clientes/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'cliente_ci': $("#cliente_ci").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCliente("+rs.cliente_id+",'"+rs.nombre_cliente+"',"+rs.cliente_ci+",'"+rs.cli_ruc+"');\">"+rs.cliente_ci+" - "+rs.nombre_cliente+" - "+rs.cli_ruc+"</li>";
        }
        lista += "</ul>";
        $("#listaClientes").html(lista);
        $("#listaClientes").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionCliente(cliente_id, nombre_cliente, cliente_ci, cli_ruc){
    $("#cliente_ci").val(cliente_ci);
    $("#cliente_id").val(cliente_id);
    $("#nombre_cliente").val(nombre_cliente);
    $("#cli_ruc").val(cli_ruc);

    $("#listaClientes").html("");
    $("#listaClientes").attr("style","display:none;");
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
    $("#det_precio").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    console.log("Operación de editarDetalle activada, txtOperacionDetalle:", $("#txtOperacionDetalle").val());
    $("#det_cantidad").removeAttr("disabled");
    $("#det_precio").removeAttr("disabled");
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
    var endpoint = "pedidos_vent_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "pedidos_vent_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "pedidos_vent_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "pedido_vent_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "pedido_vent_cant":$("#det_cantidad").val(),
            "pedido_vent_precio":$("#det_precio").val()
        }
    })
    .done(function(respuesta) {
        listarDetalles();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
        let mensaje = "Error desconocido";
        try {
            let json = JSON.parse(a.responseText);
            mensaje = json.message || mensaje;
        } catch (e) {
            mensaje = a.responseText;
        }

        // Usar SweetAlert v1
        swal("Error", mensaje, "error");
    });
    
    $("#btnAgregarDetalle").attr("Style","display:inline");
    $("#btnEditarDetalle").attr("Style","display:inline");
    $("#btnEliminarDetalle").attr("Style","display:inline");
    $("#btnGrabarDetalle").attr("Style","display:none");

    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").val("");
    $("#det_cantidad").val("");
    $("#det_precio").val("");
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
    var totalGral = 0;
    $.ajax({
        url:getUrl()+"pedidos_vent_det/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.producto_id+",'"+rs.prod_desc+"',"+rs.pedido_vent_cant+","+rs.pedido_vent_precio+");\">";
                lista = lista + "<td>";
                lista = lista + rs.producto_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prod_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido_vent_cant;
                lista = lista +"</td>";
                lista = lista + "<td class='text-right'>";
                lista = lista + rs.pedido_vent_precio;
                lista = lista +"</td>";
                lista = lista + "<td class='text-right'>";
                lista = lista + (rs.pedido_vent_cant*rs.pedido_vent_precio);
                lista = lista +"</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
            totalGral += (rs.pedido_vent_precio * rs.pedido_vent_cant); 
        }
        $("#tableDetalles").html(lista);
        $("#txtTotalGral").text(totalGral);
        if($("#pedido_vent_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
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
function seleccionDetalle(producto_id, prod_desc, det_cantidad, det_precio){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(det_cantidad);
    $("#det_precio").val(det_precio);
}