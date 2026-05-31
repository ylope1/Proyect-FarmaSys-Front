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

function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecAprob").removeAttr("disabled");
    $("#proveedor_desc").removeAttr("disabled");
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled"); 
    $("#contado").removeAttr("disabled");
    $("#credito").removeAttr("disabled"); 
    $("#Con_Pedido").removeAttr("disabled");
    $("#Sin_Pedido").removeAttr("disabled");
    $("#Con_Presupuesto").removeAttr("disabled");
    $("#Sin_Presupuesto").removeAttr("disabled");
    $("#pedido").removeAttr("disabled");
    $("#presupuesto").removeAttr("disabled");

    // Habilitar el campo intervalo_fecha_vto según la condición de venta
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
    $("#registros").attr("style", "display:none;");
    toggleCampoPedido(); // Función para campo pedido
    toggleCampoPresupuesto(); // Función para campo presupuesto
}

function editar() {
    $("#txtOperacion").val(2);
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecAprob").removeAttr("disabled");
    $("#proveedor_desc").removeAttr("disabled");
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled"); 
    $("#contado").removeAttr("disabled");
    $("#credito").removeAttr("disabled"); 
    $("#Con_Pedido").removeAttr("disabled");
    $("#Sin_Pedido").removeAttr("disabled");
    $("#Con_Presupuesto").removeAttr("disabled");
    $("#Sin_Presupuesto").removeAttr("disabled");
    $("#pedido").removeAttr("disabled");
    $("#presupuesto").removeAttr("disabled");
    toggleCampoCondicionVta();// Habilitar el campo intervalo_fecha_vto según la condición de venta
    toggleCampoPedido(); // Función para campo pedido
    toggleCampoPresupuesto(); // Función para campo presupuesto

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
    
}

function eliminar(){
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
        url:getUrl()+"orden_comp_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionOrdencompra("+rs.id+",'"+rs.orden_comp_fec+"','"+rs.orden_comp_fec_aprob+"',"+rs.proveedor_id+",'"+rs.proveedor_desc+"',"+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.user_id+",'"+rs.name+"',"+rs.pedido_comp_id+",'"+rs.pedido+"',"+rs.presup_comp_id+",'"+rs.presupuesto+"','"+rs.orden_comp_estado+"','"+rs.orden_comp_ifv+"',"+rs.tipo_fact_id+",'"+rs.tipo_fact_desc+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.orden_comp_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.orden_comp_fec_aprob;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.suc_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.name;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.orden_comp_estado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.presupuesto;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.orden_comp_ifv;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_fact_desc;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
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

    if (pedido_comp_id && pedido_comp_id != 0 && pedido != 'SIN PEDIDO') {
    document.getElementById("Con_Pedido").checked = true;
    $("#pedido").val(pedido);
    } else {
        document.getElementById("Sin_Pedido").checked = true;
        $("#pedido").val('');
    }
    toggleCampoPedido(); // Función para campo pedido

    // --- Manejo de radios y campos de Presupuesto ---
    if (presup_comp_id && presup_comp_id != 0 && presupuesto != 'SIN PRESUPUESTO') {
        document.getElementById("Con_Presupuesto").checked = true;
        $("#presupuesto").val(presupuesto);
    } else {
        document.getElementById("Sin_Presupuesto").checked = true;
        $("#presupuesto").val('');
    }
    toggleCampoPresupuesto(); // Función para campo presupuesto
    
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
    
    if (ord_estado === "PENDIENTE"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (ord_estado === "CONFIRMADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
    
        $("#btnRechazar").removeAttr("disabled");
        $("#btnAprobar").removeAttr("disabled");
        }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
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
            'user_id': $("#user_id").val(),
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
                if(resultado.registro.ord_estado!= "PENDIENTE"){
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
//hasta aca corregi 10/05/2025
function agregarDetalle(){
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
    $("#txtOperacionDetalle").val(2);
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
        listarDetalles();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
    
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
        if($("#ord_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
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
function seleccionDetalle(producto_id, prod_desc, orden_comp_cant, orden_comp_costo){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(orden_comp_cant);
    $("#det_costo").val(orden_comp_costo);
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
function buscarPresupuesto(){
    $.ajax({
        url:getUrl()+"presup_comp_cab/buscar",
        method:"POST",
        dataType: "json",
        data: {
            'name': $("#presupuesto").val()
        },
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPresupuesto("+rs.presup_comp_id+",'"+rs.presupuesto+"')\">"+rs.presupuesto+"</li>";
        }
        lista += "</ul>";
        $("#listaPresupuestos").html(lista);
        $("#listaPresupuestos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionPresupuesto(presup_comp_id, presupuesto){
    $("#presup_comp_id").val(presup_comp_id);
    $("#presupuesto").val(presupuesto);

    $("#listaPresupuestos").html("");
    $("#listaPresupuestos").attr("style","display:none;");

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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Con_Pedido").addEventListener("change", toggleCampoPedido);
    document.getElementById("Sin_Pedido").addEventListener("change", toggleCampoPedido);
});

function toggleCampoPedido() {
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
}

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


