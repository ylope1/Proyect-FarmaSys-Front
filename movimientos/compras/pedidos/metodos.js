listar();
campofecha();
function formatoTabla(){
    if ($.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().destroy();
    }
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

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecAprob").removeAttr("disabled");
    $("#emp_descripcion").removeAttr("disabled");
    $("#suc_descripcion").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none");

}

function editar(){
    $("#txtOperacion").val(2);
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecAprob").removeAttr("disabled");
    $("#emp_descripcion").removeAttr("disabled");
    $("#suc_descripcion").removeAttr("disabled");

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
        dataType:"json"
    })
    .done(function(resultado){
        var lista = "";
        for (rs of resultado) {
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionPedidoCab(" + rs.id + ",'" + rs.pedido_comp_fec + "','" + rs.pedido_comp_fec_aprob + "'," + rs.empresa_id + ",'" + rs.empresa_desc + "'," + rs.sucursal_id + ",'" + rs.suc_desc + "'," + rs.funcionario_id + ",'" + rs.func_nombre +"','" + rs.pedido_comp_estado + "');\">";
            
                lista = lista + "<td>" + rs.id + "</td>";
                lista = lista + "<td>" + rs.pedido_comp_fec + "</td>";
                lista = lista + "<td>" + rs.pedido_comp_fec_aprob + "</td>";
                lista = lista + "<td>" + rs.empresa_desc + "</td>";
                lista = lista + "<td>" + rs.suc_desc + "</td>";
                lista = lista + "<td>" + rs.func_nombre + "</td>";
                lista = lista + "<td>" + rs.pedido_comp_estado + "</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    });
    
}
function seleccionPedidoCab(id_pedido_comp, ped_comp_fecha, ped_comp_fec_aprob, emp_id, emp_descripcion, suc_id, suc_descripcion, ped_estado){
    $("#id").val(id_pedido_comp);
    $("#txtFecha").val(ped_comp_fecha);
    $("#txtFecAprob").val(ped_comp_fec_aprob);
    $("#emp_id").val(emp_id);
    $("#emp_descripcion").val(emp_descripcion);
    $("#suc_id").val(suc_id);
    $("#suc_descripcion").val(suc_descripcion);
    $("#txtEstado").val(ped_estado);

    $("#registros").attr("style","display:none");
    $("#detalles").attr("style","display:block;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnCancelar").removeAttr("disabled");

    if(ped_estado === "PENDIENTE"){
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
        estado = "ANULADO"
    }
    if($("#txtOperacion").val()==4){
        endpoint = "pedido_comp_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO"
    }
    $.ajax({
        url: getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'pedido_comp_fec': $("#txtFecha").val(), 
            'pedido_comp_fec_aprob': $("#txtFecAprob").val(), 
            'pedido_comp_estado': estado,
            'empresa_id': $("#emp_id").val(),
            'sucursal_id': $("#suc_id").val(),
            'funcionario_id': $("#func_id").val(),
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
                $("#detalles").attr("style","display:block");
                if(resultado.registro.ped_estado!="PENDIENTE"){
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
function buscarEmpresas(){
    $.ajax({
        url: getUrl()+"empresa/search", 
        method:"POST",
        dataType: "json",
        data: {
            'empresa_desc': $("#emp_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionEmpresa("+rs.id+",'"+rs.empresa_desc+"');\">"+rs.emp_descripcion+"</li>";
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
function seleccionEmpresa(emp_id, emp_descripcion){
    $("#emp_id").val(emp_id);
    $("#emp_descripcion").val(emp_descripcion);

    $("#listaEmpresas").html("");
    $("#listaEmpresas").attr("style","display:none;");
}
function buscarSucursales(){
    $.ajax({
        url: getUrl()+"sucursale/search", 
        method:"POST",
        dataType: "json",
        data: {
            'suc_desc': $("#suc_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursal("+rs.id+",'"+rs.suc_desc+"');\">"+rs.suc_descripcion+"</li>";
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

function seleccionSucursal(suc_id, suc_descripcion){
    $("#suc_id").val(suc_id);
    $("#suc_descripcion").val(suc_descripcion);

    $("#listaSucursales").html("");
    $("#listaSucursales").attr("style","display:none;");
}
function campofecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}
function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").removeAttr("disabled");
    $("#txtCant").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}
function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}
function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEditarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}
function grabarDetalle(){
    var endpoint = "pedido_comp_det/create";
    var metodo = "POST";
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "pedido_comp_det/update/"+$("#id").val()+"/"+$("#prod_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "pedido_comp_det/delete/"+$("#id").val()+"/"+$("#prod_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url: getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "pedido_comp_id": $("#id").val(),
            "producto_id": $("#prod_id").val(),
            "pedido_comp_cant": $("#txtCant").val(),
            "pedido_comp_precio": $("#txtPrecio").val(),
            "stock_id": $("#txtStock").val(),
            "deposito_id": $("#txtDeposito").val()
            
        }
    })
    .done(function(respuesta){
        listarDetalles();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })

    $("#btnAgregarDetalle").attr("style","display:inline");
    $("#btnEditarDetalle").attr("style","display:inline");
    $("#btnEliminarDetalle").attr("style","display:inline");
    $("#btnGrabarDetalle").attr("style","display:none");

    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").val("");
    $("#txtCant").val("");
}

function buscarProductos(){
    $.ajax({
        url:getUrl()+"producto/search",
        method: "POST",
        dataType: "json",
        data:{
            "prod_desc": $("#prod_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProductos("+rs.producto_id+",'"+rs.prod_desc+"')\">"+rs.prod_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}
function seleccionProductos(producto_id, prod_desc){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);

    $("#listaProductos").html("");
    $("#listaProductos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}
function listarDetalles(){
    var cantidadDetalle = 0;
    $.ajax({
        url: getUrl() + "pedido_comp_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado) {
        var lista = "";
        for (rs of resultado) {
            lista += lista + "<tr class=\"item-list\" onclick=\"seleccionPedidoDet(" + rs.producto_id + ", '" + rs.prod_desc + "', " + rs.pedido_comp_cant + ");\">";
                lista += "<td>";
                lista += rs.producto_id;
                lista += "</td>";
                lista += "<td>";
                lista += rs.prod_desc;
                lista += "</td>";
                lista += "<td>"; 
                lista += rs.pedido_comp_cant;
                lista += "</td>";
            lista += "</tr>";
            cantidadDetalle++;
        }
        $("#tableDetalles").html(lista);
        if($("#txtEstado").val() === "PENDIENTE" && cantidadDetalle > 0){
            $("#btnConfirmar").removeAttr("disabled");
        }else{
            $("#btnConfirmar").attr("disabled","true");
        }

    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}
function seleccionPedidoDet(producto_id, prod_desc, prod_cant){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#txtCant").val(prod_cant);
}