var datosSesion = JSON.parse(sessionStorage.getItem("datosSesion"));
var usuarioLogueado = datosSesion;
var token = sessionStorage.getItem("accessToken");
var datosFuncionario = null;

var rutaPantalla = "movimientos/compras/nota_remision/";

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
    //controlarBotonPorPermiso(rutaPantalla, "rechazar", "#btnRechazar");
    //controlarBotonPorPermiso(rutaPantalla, "aprobar", "#btnAprobar");
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
                title:'Listado de Registros de Remisión Compras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Registros de Remisión Compras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Registros de Remisión Compras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Registros de Remisión Compras'
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

function agregar() {
    if (!tienePermiso(rutaPantalla, "crear")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para agregar presupuestos.", "warning");
        return;
    }

    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecSal").removeAttr("disabled");
    $("#txtFecRecep").removeAttr("disabled");
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_origen_desc").removeAttr("disabled");
    $("#suc_destino_desc").removeAttr("disabled"); 
    $("#deposito_origen_desc").removeAttr("disabled");
    $("#deposito_destino_desc").removeAttr("disabled");
    $("#proveedor_desc").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");
    $("#remision_motivo_desc").removeAttr("disabled");
    $("#chofer_nombre").removeAttr("disabled"); 
    $("#vehiculo_desc").removeAttr("disabled");
    $("#Con_Pedido").removeAttr("disabled");
    $("#Sin_Pedido").removeAttr("disabled");
    $("#Pedido").removeAttr("disabled");
    toggleCampoPedido();

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
    if (!tienePermiso(rutaPantalla, "modificar")) {
        mensajeOperacion("Acceso denegado", "No tiene permiso para modificar presupuestos.", "warning");
        return;
    }

    $("#txtOperacion").val(2);
    $("#txtFecha").removeAttr("disabled");
    $("#txtFecSal").removeAttr("disabled");
    $("#txtFecRecep").removeAttr("disabled");
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_origen_desc").removeAttr("disabled");
    $("#suc_destino_desc").removeAttr("disabled"); 
    $("#deposito_origen_desc").removeAttr("disabled");
    $("#deposito_destino_desc").removeAttr("disabled");
    $("#proveedor_desc").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");
    $("#remision_motivo_desc").removeAttr("disabled");
    $("#chofer_nombre").removeAttr("disabled"); 
    $("#vehiculo_desc").removeAttr("disabled");
    $("#Con_Pedido").removeAttr("disabled");
    $("#Sin_Pedido").removeAttr("disabled");
    $("#Pedido").removeAttr("disabled");
    toggleCampoPedido(); // Función para campo pedido

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
        mensajeOperacion("Acceso denegado", "No tiene permiso para anular presupuestos.", "warning");
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
        url:getUrl()+"remision_comp_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){ 
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionRemision("+rs.id+",'"+rs.rem_comp_fec+"','"+rs.rem_comp_fec_sal+"','"+rs.rem_comp_fec_recep+"',"+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_origen_id+",'"+rs.sucursal_origen+"',"+rs.deposito_origen_id+",'"+rs.deposito_origen+"',"+rs.sucursal_destino_id+",'"+rs.sucursal_destino+"',"+rs.deposito_destino_id+",'"+rs.deposito_destino+"','"+rs.rem_comp_nro+"',"+rs.remision_motivo_id+",'"+rs.remision_motivo_desc+"','"+rs.chofer+"',"+rs.vehiculo_id+",'"+rs.vehiculo_desc+"',"+rs.pedido_comp_id+",'"+rs.pedido+"',"+rs.user_id+",'"+rs.encargado+"','"+rs.rem_comp_estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rem_comp_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rem_comp_fec_sal;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rem_comp_fec_recep;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.sucursal_origen;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.deposito_origen;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.sucursal_destino;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.deposito_destino;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rem_comp_nro;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.remision_motivo_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.chofer;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.vehiculo_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pedido;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.encargado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.rem_comp_estado;
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
function seleccionRemision(id, rem_comp_fec, rem_comp_fec_sal, rem_comp_fec_recep, empresa_id, empresa_desc, sucursal_origen_id, sucursal_origen, deposito_origen_id, deposito_origen, sucursal_destino_id, sucursal_destino, deposito_destino_id, deposito_destino, rem_comp_nro, remision_motivo_id, remision_motivo_desc, chofer, vehiculo_id, vehiculo_desc, pedido_comp_id, pedido, user_id, encargado, rem_comp_estado){ 
    $("#id").val(id);
    $("#txtFecha").val(rem_comp_fec);
    $("#txtFecSal").val(rem_comp_fec_sal);
    $("#txtFecRecep").val(rem_comp_fec_recep);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_origen_id").val(sucursal_origen_id);
    $("#suc_origen_desc").val(sucursal_origen);
    $("#deposito_origen_id").val(deposito_origen_id);
    $("#deposito_origen_desc").val(deposito_origen);
    $("#sucursal_destino_id").val(sucursal_destino_id);
    $("#suc_destino_desc").val(sucursal_destino);
    $("#deposito_destino_id").val(deposito_destino_id);
    $("#deposito_destino_desc").val(deposito_destino);
    $("#txtNroFact").val(rem_comp_nro);
    $("#remision_motivo_id").val(remision_motivo_id);
    $("#remision_motivo_desc").val(remision_motivo_desc);
    $("#chofer_nombre").val(chofer);
    $("#vehiculo_id").val(vehiculo_id);
    $("#vehiculo_desc").val(vehiculo_desc);
    $("#pedido_comp_id").val(pedido_comp_id);
    $("#pedido").val(pedido);
    $("#user_id").val(user_id);
    $("#user_name").val(encargado);
    $("#rem_comp_estado").val(rem_comp_estado);
    
    //manejo de pedido
    if (pedido_comp_id && pedido_comp_id != 0 && pedido != 'SIN PEDIDO') {
    document.getElementById("Con_Pedido").checked = true;
    $("#pedido").val(pedido);
    } else {
        document.getElementById("Sin_Pedido").checked = true;
        $("#pedido").val('');
    }
    toggleCampoPedido(); // Función para campo pedido
    
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

    var rem_comp_estado = $("#rem_comp_estado").val(); // Tomamos el valor actualizado
    console.log("Estado actual:", rem_comp_estado);
    if (rem_comp_estado === "PENDIENTE"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");

        if (tienePermiso(rutaPantalla, "anular")) {
            $("#btnAnular").removeAttr("disabled");
        }

        if (tienePermiso(rutaPantalla, "modificar")) {
            $("#btnEditar").removeAttr("disabled");
        }

        $("#formDetalles").attr("style","display:block;");
    }

    if (rem_comp_estado === "CONFIRMADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "remision_comp_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "remision_comp_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "remision_comp_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "remision_comp_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    $.ajax({ 
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'pedido_comp_id': ($("#pedido_comp_id").val() === "0" || $("#pedido_comp_id").val() === "") ? null : $("#pedido_comp_id").val(),
            'user_id': usuarioLogueado.id,
            'sucursal_origen_id': $("#sucursal_origen_id").val(),
            'sucursal_destino_id': $("#sucursal_destino_id").val(),
            'deposito_origen_id': $("#deposito_origen_id").val(),
            'deposito_destino_id': $("#deposito_destino_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'rem_comp_nro': $("#txtNroFact").val(),
            'remision_motivo_id': $("#remision_motivo_id").val(),
            'rem_comp_fec': $("#txtFecha").val(),
            'rem_comp_fec_sal': $("#txtFecSal").val(),
            'rem_comp_fec_recep': $("#txtFecRecep").val(),
            'chofer': $("#chofer_nombre").val(),
            'vehiculo_id': $("#vehiculo_id").val(),    
            'rem_comp_estado': estado,
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
                if(resultado.registro.remision_comp_estado!= "PENDIENTE"){
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
    $("#det_costo").removeAttr("disabled");
    $("#rem_comp_obs").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#det_cantidad").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");
    $("#rem_comp_obs").removeAttr("disabled");
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
    var endpoint = "remision_comp_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "remision_comp_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "remision_comp_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "remision_comp_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "rem_comp_cant":$("#det_cantidad").val(),
            "rem_comp_costo":$("#det_costo").val(),
            "rem_comp_obs":$("#rem_comp_obs").val(),
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
    $("#rem_comp_obs").val("");
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
    console.log("ID actual:", $("#id").val()); // Verifica el ID de compra
    $.ajax({
        url: getUrl() + "remision_comp_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        console.log("Detalles recibidos:", resultado);
        var lista = "";

        for (let rs of resultado) {
            // Aseguramos tipos numéricos
            let costo = Number(rs.rem_comp_costo) || 0;
            let cantidad = Number(rs.rem_comp_cant) || 0;
            let subtotal = cantidad * costo;

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
                // Fallback: usar impuesto_desc (normalizado)
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

            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + rs.producto_id + ",'" + (rs.prod_desc||'') + "'," + cantidad + "," + costo + ");\">";
            lista += "<td>" + rs.producto_id + "</td>";
            lista += "<td>" + (rs.prod_desc||'') + "</td>";
            lista += "<td>" + cantidad + "</td>";
            lista += "<td class='text-right'>" + costo.toFixed(0) + "</td>";
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
        if ($("#rem_comp_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
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
function seleccionDetalle(producto_id, prod_desc, rem_comp_cant, rem_comp_costo, rem_comp_obs){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(rem_comp_cant);
    $("#det_costo").val(rem_comp_costo);
    $("#rem_comp_obs").val(rem_comp_obs);
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
function buscarSucursalOrigen(){
    $.ajax({
        url: getUrl()+"sucursale/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'suc_desc': $("#suc_origen_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursalOrigen("+rs.id+",'"+rs.suc_desc+"');\">"+rs.sucursal_origen+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursalOrigen").html(lista);
        $("#listaSucursalOrigen").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionSucursalOrigen(sucursal_id, sucursal_origen){
    $("#sucursal_origen_id").val(sucursal_id);
    $("#suc_origen_desc").val(sucursal_origen);

    $("#listaSucursalOrigen").html("");
    $("#listaSucursalOrigen").attr("style","display:none;");
}
function buscarSucursalDestino(){
    $.ajax({
        url: getUrl()+"sucursale/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'suc_desc': $("#suc_destino_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionSucursalDestino("+rs.id+",'"+rs.suc_desc+"');\">"+rs.sucursal_destino+"</li>";
        }
        lista += "</ul>";
        $("#listaSucursalDestino").html(lista);
        $("#listaSucursalDestino").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionSucursalDestino(sucursal_id, sucursal_destino){
    $("#sucursal_destino_id").val(sucursal_id);
    $("#suc_destino_desc").val(sucursal_destino);

    $("#listaSucursalDestino").html("");
    $("#listaSucursalDestino").attr("style","display:none;");
}

function buscarDepositoOrigen(){
    $.ajax({
        url: getUrl()+"deposito/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'deposito_desc': $("#deposito_origen_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionDepositoOrigen("+rs.id+",'"+rs.deposito_desc+"');\">"+rs.deposito_origen+"</li>";
        }
        lista += "</ul>";
        $("#listaDepositoOrigen").html(lista);
        $("#listaDepositoOrigen").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionDepositoOrigen(deposito_id, deposito_origen){
    $("#deposito_origen_id").val(deposito_id);
    $("#deposito_origen_desc").val(deposito_origen);

    $("#listaDepositoOrigen").html("");
    $("#listaDepositoOrigen").attr("style","display:none;");
}

function buscarDepositoDestino(){
    $.ajax({
        url: getUrl()+"deposito/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'deposito_desc': $("#deposito_destino_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionDepositoDestino("+rs.id+",'"+rs.deposito_desc+"');\">"+rs.deposito_destino+"</li>";
        }
        lista += "</ul>";
        $("#listaDepositoDestino").html(lista);
        $("#listaDepositoDestino").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionDepositoDestino(deposito_id, deposito_destino){
    $("#deposito_destino_id").val(deposito_id);
    $("#deposito_destino_desc").val(deposito_destino);

    $("#listaDepositoDestino").html("");
    $("#listaDepositoDestino").attr("style","display:none;");
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

function buscarChofer(){
    $.ajax({
        url: getUrl()+"funcionario/buscarChofer",  
        method:"POST",
        dataType: "json",
        data: {
            'chofer': $("#chofer_nombre").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionChofer('"+rs.id+"', '"+rs.chofer+"');\">"+rs.chofer+"</li>"; 
        }
        lista += "</ul>";
        $("#listaChoferes").html(lista);
        $("#listaChoferes").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionChofer(chofer_id, chofer){
    $("#persona_id").val(chofer_id);
    $("#chofer_nombre").val(chofer);
    $("#listaChoferes").html("");
    $("#listaChoferes").attr("style","display:none;");
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



