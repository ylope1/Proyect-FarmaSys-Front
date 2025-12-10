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
                title:'Listado de Registros de Notas de Ventas'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Registros de Notas de Ventas'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Registros de Notas de Ventas'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Registros de Notas de Ventas'
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
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled"); 
    $("#deposito_desc").removeAttr("disabled");
    $("#txtFecha").removeAttr("disabled");
    $("#txtTimbrado").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");
    $("#cliente_ci").removeAttr("disabled");
    $("#contado").removeAttr("disabled");
    $("#credito").removeAttr("disabled");
    $("#nota_vent_tipo").removeAttr("disabled");
    cargarTipoNota(null, false);  // habilitado y sin valor seleccionado 
    $("#venta").removeAttr("disabled");

    // Habilitar el campo intervalo_fecha_vto según la condición de venta
    toggleCampoCondicionVta();

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
    $("#registros").attr("style", "display:none;");
}

function editar() {
    $("#txtOperacion").val(2);
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled");
    $("#deposito_desc").removeAttr("disabled");
    $("#txtFecha").removeAttr("disabled");
    $("#txtTimbrado").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");
    $("#cliente_ci").removeAttr("disabled");
    $("#contado").removeAttr("disabled");
    $("#credito").removeAttr("disabled");
    cargarTipoNota($("#nota_vent_tipo").val(), false); 
    $("#venta").removeAttr("disabled");
    toggleCampoCondicionVta();// Habilitar el campo intervalo_fecha_vto según la condición de venta

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
        url:getUrl()+"notas_venta_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){ 
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionNotasVent("+rs.id+","+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.deposito_id+",'"+rs.deposito_desc+"','"+rs.nota_vent_fec+"',"+rs.nota_vent_timbrado+",'"+rs.nota_vent_fact+"',"+rs.cliente_id+","+rs.cliente_ci+",'"+rs.nombre_cliente+"','"+rs.cli_ruc+"',"+rs.tipo_fact_id+",'"+rs.nota_vent_tipo+"',"+rs.venta_id+",'"+rs.venta+"','"+rs.nota_vent_estado+"',"+rs.user_id+",'"+rs.vendedor+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
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
                lista = lista + rs.nota_vent_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.nota_vent_fact;
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
                lista = lista + rs.tipo_fact_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.nota_vent_tipo;
                lista = lista +"</td>";              
                lista = lista + "<td>";
                lista = lista + rs.venta;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.nota_vent_estado;
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
        console.log(a.responseText);
    })
}
function seleccionNotasVent(id, empresa_id, empresa_desc, sucursal_id, suc_desc, deposito_id, deposito_desc, nota_vent_fec, nota_vent_timbrado, nota_vent_fact, cliente_id, cliente_ci, nombre_cliente, cli_ruc, tipo_fact_id, nota_vent_tipo, venta_id, venta, nota_vent_estado, user_id, vendedor){ 
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#deposito_id").val(deposito_id);
    $("#deposito_desc").val(deposito_desc);
    $("#txtFecha").val(nota_vent_fec);
    $("#txtTimbrado").val(nota_vent_timbrado);
    $("#txtNroFact").val(nota_vent_fact);
    $("#cliente_id").val(cliente_id);
    $("#cliente_ci").val(cliente_ci);
    $("#nombre_cliente").val(nombre_cliente);
    $("#cli_ruc").val(cli_ruc);
    cargarTipoNota(nota_vent_tipo, true); // selecciona y deshabilita
    $("#venta_id").val(venta_id);
    $("#venta").val(venta);
    $("#nota_vent_estado").val(nota_vent_estado);
    $("#user_id").val(user_id);
    $("#user_name").val(vendedor);
    //condicion de venta
    if (tipo_fact_id == 6) {
        document.getElementById("contado").checked = true;
    } else if (tipo_fact_id == 7) {
        document.getElementById("credito").checked = true;
    }
    // Actualiza el select de intervalo según la condición
    toggleCampoCondicionVta();
    
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

    var nota_vent_estado = $("#nota_vent_estado").val(); 
    console.log("Estado actual:", nota_vent_estado);
    if (nota_vent_estado === "PENDIENTE"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (nota_vent_estado === "CONFIRMADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "notas_venta_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "notas_venta_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "notas_venta_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "notas_venta_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'venta_id': $("#venta_id").val(),
            'cliente_id': $("#cliente_id").val(),
            'user_id': $("#user_id").val(),
            'deposito_id': $("#deposito_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'tipo_fact_id': $("input[name='tipo_fact_id']:checked").val(),
            'nota_vent_fact': $("#txtNroFact").val(),
            'nota_vent_timbrado': $("#txtTimbrado").val(),
            'nota_vent_fec': $("#txtFecha").val(), 
            'nota_vent_tipo': $("#nota_vent_tipo").val(),   
            'nota_vent_estado': estado,
            'operacion': $("#txtOperacion").val()
        }
    })
    .done(function(resultado){
        console.log("Resultado recibido:", resultado);
        swal({
            title:"Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        },
        function(){
            if(resultado.tipo == "success"){
                //location.reload(true);
                if (resultado.registro && resultado.registro.id) {//borrar si no funciona
                    $("#id").val(resultado.registro.id);
                }    //borrar si no funciona
                $("#detalles").attr("style","display:block;");
                listarDetalles();
                if(resultado.registro.nota_vent_estado!= "PENDIENTE"){
                    location.reload(true);
                }
            } else {//borrar si no funciona
                // Si hubo error, cerramos SweetAlert
                swal.close(); 
            }//borrar si no funciona
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
    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");
    $("#det_precio").removeAttr("disabled");
    $("#motivo").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#det_cantidad").removeAttr("disabled");
    $("#det_precio").removeAttr("disabled");
    $("#motivo").removeAttr("disabled");
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
    if ($("#producto_id").val() == "0" || $("#producto_id").val() == "") {
        swal("Error", "Debe seleccionar un producto válido", "error");
        return;
    }
    if ($("#nota_vent_tipo").val() == "") {
        swal("Error", "Debe seleccionar el tipo de nota (crédito o débito)", "error");
        return;
    }
    var endpoint = "notas_venta_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "notas_venta_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "notas_venta_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "nota_venta_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "nota_venta_cant":$("#det_cantidad").val(),
            "nota_venta_precio":$("#det_precio").val(),
            "nota_venta_motivo":$("#motivo").val()
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
    $("#motivo").val("");
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
    var totalExentas = 0;
    var totalGrav5 = 0;
    var totalGrav10 = 0;
    console.log("ID actual:", $("#id").val()); // Verifica el ID de nota de venta
    $.ajax({
        url: getUrl() + "notas_venta_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        console.log("Detalles recibidos:", resultado);
        var lista = "";

        for (let rs of resultado) {
            // Aseguramos tipos numéricos
            let precio = Number(rs.nota_venta_precio) || 0;
            let cantidad = Number(rs.nota_venta_cant) || 0;
            let subtotal = cantidad * precio;

            let exentas = 0;
            let grav5 = 0;
            let grav10 = 0;

            // Usamos impuesto_id (numérico) si está presente
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
                // usamos impuesto_desc (normalizado)
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

            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + rs.producto_id + ",'" + (rs.prod_desc||'') + "'," + rs.nota_venta_cant + "," + rs.nota_venta_precio + ",'" + rs.nota_venta_motivo + "');\">";
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

        // Activar botón confirmar si corresponde
        if ($("#nota_vent_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        } else {
            $("#btnConfirmar").attr("disabled", "true");
        }
    })
    .fail(function (a, b, c) {
        alert(c);
        console.log(a.responseText);
    });
}
function seleccionDetalle(producto_id, prod_desc, nota_venta_cant, nota_venta_precio, nota_venta_motivo){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(nota_venta_cant);
    $("#det_precio").val(nota_venta_precio);
    $("#motivo").val(nota_venta_motivo);
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

function buscarVentas(){//corregir por venta
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

function cargarTipoNota(seleccionado = null, deshabilitar = true) {
    const opciones = [
        { valor: "NC", texto: "NOTA DE CRÉDITO" },
        { valor: "ND", texto: "NOTA DE DÉBITO" }
    ];

    let select = $("#nota_vent_tipo");
    select.empty(); // Limpiar opciones previas

    // Agregar una opción por defecto vacía
    select.append(`<option value="" disabled ${seleccionado ? "" : "selected"}>-- Seleccione --</option>`);

    opciones.forEach(op => {
        const selectedAttr = seleccionado === op.valor ? "selected" : "";
        select.append(`<option value="${op.valor}" ${selectedAttr}>${op.texto}</option>`);
    });

    select.selectpicker("refresh"); // Refrescar

    // Habilitar o deshabilitar el campo
    if (deshabilitar) {
        select.attr("disabled", "disabled");
    } else {
        select.removeAttr("disabled");
    }

    select.selectpicker("refresh");
}


function toggleCampoCondicionVta() {
    const contado = document.getElementById("contado").checked;
    const credito = document.getElementById("credito").checked;
}

// Asociar eventos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contado").addEventListener("change", toggleCampoCondicionVta);
    document.getElementById("credito").addEventListener("change", toggleCampoCondicionVta);
    toggleCampoCondicionVta(); // Inicialización
    // Al inicio: dejarlo vacío y deshabilitado
    cargarTipoNota(null, true);
});


