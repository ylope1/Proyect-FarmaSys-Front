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
                title:'Listado de Registros de Remisión Ventas'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Registros de Remisión Ventas'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Registros de Remisión Ventas'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Registros de Remisión Ventas'
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
    $("#txtFecEnv").removeAttr("disabled");
    $("#txtFecEnt").removeAttr("disabled");
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled");
    $("#deposito_desc").removeAttr("disabled");
    $("#cliente_ci").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");
    $("#remision_motivo_desc").removeAttr("disabled");
    $("#repartidor_nombre").removeAttr("disabled"); 
    $("#vehiculo_desc").removeAttr("disabled");
    $("#venta").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");
    $("#btnEnviar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
    $("#registros").attr("style", "display:none;");
}

function editar() {
    $("#txtOperacion").val(2);
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecEnv").removeAttr("disabled");
    $("#txtFecEnt").removeAttr("disabled");
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled"); 
    $("#cliente_ci").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");
    $("#remision_motivo_desc").removeAttr("disabled");
    $("#repartidor_nombre").removeAttr("disabled"); 
    $("#vehiculo_desc").removeAttr("disabled");
    $("#venta").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");
    $("#btnEnviar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
}

function anular(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnEnviar").attr("disabled","true");

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

function enviar(){
    $("#txtOperacion").val(5);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnEnviar").removeAttr("disabled","true");
        
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
        titulo = "ENVIAR";
        pregunta = "¿DESEA ENVIAR EL REGISTRO SELECCIONADO?";
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
        url:getUrl()+"remision_vent_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){ 
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionRemisionVent("+rs.id+",'"+rs.remision_vent_fec+"','"+rs.remision_vent_fec_env+"','"+rs.remision_vent_fec_ent+"',"+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.deposito_id+",'"+rs.deposito_desc+"',"+rs.cliente_id+","+rs.cliente_ci+",'"+rs.nombre_cliente+"','"+rs.cli_ruc+"','"+rs.cli_direc+"','"+rs.cli_telef+"','"+rs.remision_vent_nro+"',"+rs.remision_motivo_id+",'"+rs.remision_motivo_desc+"','"+rs.remision_vent_repartidor+"',"+rs.vehiculo_id+",'"+rs.vehiculo_desc+"',"+rs.venta_id+",'"+rs.venta+"',"+rs.user_id+",'"+rs.vendedor+"','"+rs.remision_vent_estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.remision_vent_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.remision_vent_fec_env;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.remision_vent_fec_ent;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.suc_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.deposito_desc;
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
                lista = lista + rs.cli_direc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cli_telef;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.remision_vent_nro;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.remision_motivo_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.remision_vent_repartidor;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.vehiculo_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.venta;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.vendedor;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.remision_vent_estado;
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
function seleccionRemisionVent(id, remision_vent_fec, remision_vent_fec_env, remision_vent_fec_ent, empresa_id, empresa_desc, sucursal_id, suc_desc, deposito_id, deposito_desc, cliente_id, cliente_ci, nombre_cliente, cli_ruc, cli_direc, cli_telef, remision_vent_nro, remision_motivo_id, remision_motivo_desc, remision_vent_repartidor, vehiculo_id, vehiculo_desc, venta_id, venta, user_id, vendedor, remision_vent_estado){ 
    $("#id").val(id);
    $("#txtFecha").val(remision_vent_fec);
    $("#txtFecEnv").val(remision_vent_fec_env);
    $("#txtFecEnt").val(remision_vent_fec_ent);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#deposito_id").val(deposito_id);
    $("#deposito_desc").val(deposito_desc);
    $("#cliente_id").val(cliente_id);
    $("#cliente_ci").val(cliente_ci);
    $("#nombre_cliente").val(nombre_cliente);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direc").val(cli_direc);
    $("#cli_telef").val(cli_telef);
    $("#txtNroFact").val(remision_vent_nro);
    $("#remision_motivo_id").val(remision_motivo_id);
    $("#remision_motivo_desc").val(remision_motivo_desc);
    $("#repartidor_nombre").val(remision_vent_repartidor);
    $("#vehiculo_id").val(vehiculo_id);
    $("#vehiculo_desc").val(vehiculo_desc);
    $("#venta_id").val(venta_id);
    $("#venta").val(venta);
    $("#user_id").val(user_id);
    $("#user_name").val(vendedor);
    $("#remision_vent_estado").val(remision_vent_estado);
    
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
    $("#btnEnviar").attr("disabled","true");    

    $("#btnCancelar").removeAttr("disabled");

    var remision_vent_estado = $("#remision_vent_estado").val(); // Tomamos el valor actualizado
    console.log("Estado actual:", remision_vent_estado);
    if (remision_vent_estado === "PENDIENTE"){  
        $("#txtFecEnv").removeAttr("disabled"); 
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#btnEnviar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }
    else if (remision_vent_estado === "ENVIADO"){
        $("#txtFecEnt").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
    }

    if (remision_vent_estado === "ENTREGADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "remision_vent_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "remision_vent_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "remision_vent_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "remision_vent_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    if($("#txtOperacion").val()==5){
        endpoint = "remision_vent_cab/enviar/"+$("#id").val();
        metodo = "PUT";
        estado = "ENVIADO";
    }
    $.ajax({ 
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'venta_id': $("#venta_id").val(),
            'cliente_id': $("#cliente_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'deposito_id': $("#deposito_id").val(),
            'user_id': $("#user_id").val(),
            'remision_vent_nro': $("#txtNroFact").val(),
            'remision_motivo_id': $("#remision_motivo_id").val(),
            'remision_vent_repartidor': $("#repartidor_nombre").val(),
            'vehiculo_id': $("#vehiculo_id").val(),
            'remision_vent_fec': $("#txtFecha").val(),
            'remision_vent_fec_env': $("#txtFecEnv").val(),
            'remision_vent_fec_ent': $("#txtFecEnt").val(),
            'remision_vent_estado': estado,
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
                if(resultado.registro.remision_vent_estado!= "PENDIENTE"){
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
    $("#remision_vent_obs").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#det_cantidad").removeAttr("disabled");
    $("#det_precio").removeAttr("disabled");
    $("#remision_vent_obs").removeAttr("disabled");
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
    var endpoint = "remision_vent_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "remision_vent_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "remision_vent_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "remision_vent_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "remision_vent_cant":$("#det_cantidad").val(),
            "remision_vent_precio":$("#det_precio").val(),
            "remision_vent_obs":$("#remision_vent_obs").val(),
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
    $("#det_precio").val("");
    $("#remision_vent_obs").val("");
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
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionProducto(producto_id, prod_desc){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);

    $("#listaProductos").html("");
    $("#listaProductos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var totalGral = 0;
    var totalExentas = 0;
    var totalGrav5 = 0;
    var totalGrav10 = 0;
    console.log("ID actual:", $("#id").val()); // Verifica el ID de compra
    $.ajax({
        url: getUrl() + "remision_vent_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        console.log("Detalles recibidos:", resultado);
        var lista = "";

        for (let rs of resultado) {
            // Aseguramos tipos numéricos
            let precio = Number(rs.remision_vent_precio) || 0;
            let cantidad = Number(rs.remision_vent_cant) || 0;
            let subtotal = cantidad * precio;

            let exentas = 0;
            let grav5 = 0;
            let grav10 = 0;

            // Preferimos usar impuesto_id (numérico) si está presente
            if (typeof rs.impuesto_id !== 'undefined' && rs.impuesto_id !== null) {
                switch (Number(rs.impuesto_id)) {
                    case 2: // 5%
                        grav5 = subtotal;
                        totalGrav5 += subtotal;
                        break;
                    case 1: // 10%
                        grav10 = subtotal;
                        totalGrav10 += subtotal;
                        break;
                    case 3: // exento
                    default:
                        exentas = subtotal;
                        totalExentas += subtotal;
                    break;
                }
            } else {
                // usamos impuesto_desc 
                const desc = (rs.impuesto_desc || '').toString().trim().toUpperCase();
                if (desc.includes('5')) {
                    grav5 = subtotal;
                    totalGrav5 += subtotal;
                } else if (desc.includes('10')) {
                    grav10 = subtotal;
                    totalGrav10 += subtotal;
                } else {
                    exentas = subtotal;
                    totalExentas += subtotal;
                }
            }

            totalGral += subtotal;
            cantidadDetalle++;

            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + rs.producto_id + ",'" + (rs.prod_desc||'') + "'," + cantidad + "," + precio + ");\">";
            lista += "<td>" + rs.producto_id + "</td>";
            lista += "<td>" + (rs.prod_desc||'') + "</td>";
            lista += "<td>" + cantidad + "</td>";
            lista += "<td class='text-right'>" + precio.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + exentas.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + grav5.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + grav10.toFixed(0) + "</td>";
            lista += "<td class='text-right'>" + subtotal.toFixed(0) + "</td>";
            lista += "</tr>";
        }

        $("#tableDetalles").html(lista);

        // Mostrar los totales en el pie de la tabla
        var tfoot = `
            <tr>
                <th colspan="4" class="text-right">Total General</th>
                <th class="text-right">${totalExentas.toFixed(0)}</th>
                <th class="text-right">${totalGrav5.toFixed(0)}</th>
                <th class="text-right">${totalGrav10.toFixed(0)}</th>
                <th class="text-right">${totalGral.toFixed(0)}</th>
            </tr>
        `;
        $(".dataTable tfoot").html(tfoot);

        // ACTIVAR CONFIRMAR SOLO SI TIENE DETALLE Y ESTADO = ENVIADO
        if ($("#remision_vent_estado").val() === "PENDIENTE"){
            $("#btnConfirmar").attr("disabled","true"); // no confirmar sin enviar
        }

        if ($("#remision_vent_estado").val() === "ENVIADO" && resultado.length > 0){
            $("#btnConfirmar").removeAttr("disabled");
        }
    })
    .fail(function (a, b, c) {
        alert(c);
        console.log(a.responseText);
    });
}
function seleccionDetalle(producto_id, prod_desc, remision_vent_cant, remision_vent_precio, remision_vent_obs){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(remision_vent_cant);
    $("#det_precio").val(remision_vent_precio);
    $("#remision_vent_obs").val(remision_vent_obs);
}

function buscarVentas(){
    $.ajax({
        url:getUrl()+"ventas_cab/buscar",
        method:"POST",
        dataType: "json",
        data: {
            'user_id': $("#user_id").val(),
            'name': $("#venta").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionVenta("+rs.venta_id+",'"+rs.venta+"')\">"+rs.venta+"</li>";
        }
        lista += "</ul>";
        $("#listaVentas").html(lista);
        $("#listaVentas").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionVenta(venta_id, venta){
    $("#venta_id").val(venta_id);
    $("#venta").val(venta);

    $("#listaVentas").html("");
    $("#listaVentas").attr("style","display:none;");

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
function buscarSucursal(){
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
        $("#listaSucursal").html(lista);
        $("#listaSucursal").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionSucursal(sucursal_id, suc_desc){
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);

    $("#listaSucursal").html("");
    $("#listaSucursal").attr("style","display:none;");
}

function buscarDeposito(){
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
        $("#listaDeposito").html(lista);
        $("#listaDeposito").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionDeposito(deposito_id, deposito_desc){
    $("#deposito_id").val(deposito_id);
    $("#deposito_desc").val(deposito_desc);

    $("#listaDeposito").html("");
    $("#listaDeposito").attr("style","display:none;");
}

function buscarMotivo(){
    $.ajax({
        url: getUrl()+"remision_motivo/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'remision_motivo_desc': $("#remision_motivo_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionMotivo("+rs.id+",'"+rs.remision_motivo_desc+"');\">"+rs.remision_motivo_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaMotivos").html(lista);
        $("#listaMotivos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionMotivo(remision_motivo_id, remision_motivo_desc){
    $("#remision_motivo_id").val(remision_motivo_id);
    $("#remision_motivo_desc").val(remision_motivo_desc);

    $("#listaMotivos").html("");
    $("#listaMotivos").attr("style","display:none;");
}

function buscarRepartidor(){ 
    $.ajax({
        url: getUrl()+"funcionario/buscarRepartidor",  
        method:"POST",
        dataType: "json",
        data: {
            'remision_vent_repartidor': $("#repartidor_nombre").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionRepartidor('"+rs.id+"', '"+rs.remision_vent_repartidor+"');\">"+rs.remision_vent_repartidor+"</li>"; 
        }
        lista += "</ul>";
        $("#listaRepartidores").html(lista);
        $("#listaRepartidores").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionRepartidor(repartidor_id, remision_vent_repartidor){
    $("#persona_id").val(repartidor_id);
    $("#repartidor_nombre").val(remision_vent_repartidor);
    $("#listaRepartidores").html("");
    $("#listaRepartidores").attr("style","display:none;");
    $(".form-line").attr("class","form-line focused");
}

function buscarVehiculos(){
    $.ajax({
        url: getUrl()+"vehiculos/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'vehiculo_desc': $("#vehiculo_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionVehiculos("+rs.id+",'"+rs.vehiculo_desc+"');\">"+rs.vehiculo_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaVehiculos").html(lista);
        $("#listaVehiculos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionVehiculos(vehiculo_id, vehiculo_desc){
    $("#vehiculo_id").val(vehiculo_id);
    $("#vehiculo_desc").val(vehiculo_desc);

    $("#listaVehiculos").html("");
    $("#listaVehiculos").attr("style","display:none;");
}

function buscarClientes(){ 
    $.ajax({
        url: getUrl()+"clientes/buscarClient", 
        method:"POST",
        dataType: "json",
        data: {
            'cliente_ci': $("#cliente_ci").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCliente("+rs.cliente_id+",'"+rs.nombre_cliente+"',"+rs.cliente_ci+",'"+rs.cli_ruc+"','"+rs.cli_direc+"','"+rs.cli_telef+"');\">"+rs.cliente_ci+" - "+rs.nombre_cliente+" - "+rs.cli_ruc+" - "+rs.cli_direc+" - "+rs.cli_telef+"</li>";
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

function seleccionCliente(cliente_id, nombre_cliente, cliente_ci, cli_ruc, cli_direc, cli_telef){
    $("#cliente_ci").val(cliente_ci);
    $("#cliente_id").val(cliente_id);
    $("#nombre_cliente").val(nombre_cliente);
    $("#cli_ruc").val(cli_ruc);
    $("#cli_direc").val(cli_direc);
    $("#cli_telef").val(cli_telef);

    $("#listaClientes").html("");
    $("#listaClientes").attr("style","display:none;");
}




