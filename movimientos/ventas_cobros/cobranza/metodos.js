listar();
campoFecha();

function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
             {
                extend:'copy',
                text:'COPIAR',
                className:'btn btn-primary waves-effect',
                title:'Listado de Registros de Cobros'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Registros de Cobros'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Registros de Cobros'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Registros de Cobros'
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

function campoFecha(){//ahora
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function agregar() {
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled");
    $("#caja_desc").removeAttr("disabled");
    $("#apertura_cierre_id").removeAttr("disabled");
    $("#cobro_fecha").removeAttr("disabled");
    $("#nombre_cliente").removeAttr("disabled");
    $("#venta").removeAttr("disabled");

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
    $("#caja_desc").removeAttr("disabled");
    $("#apertura_cierre_id").removeAttr("disabled");
    $("#cobro_fecha").removeAttr("disabled");
    $("#nombre_cliente").removeAttr("disabled");
    $("#venta").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

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

//* LISTAR COBROS
function listar(){
    $.ajax({
        url:getUrl()+"cobros_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionCobro("+rs.id+","+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.caja_id+",'"+rs.caja_desc+"',"+rs.apertura_cierre_id+",'"+rs.apertura_cierre_desc+"','"+rs.cobro_fecha+"',"+rs.cliente_id+",'"+rs.nombre_cliente+"',"+rs.venta_id+",'"+rs.venta+"','"+rs.venta_fact+"','"+rs.cobro_estado+"',"+rs.user_id+",'"+rs.usuario+"');\">";
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
                lista = lista + rs.caja_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.apertura_cierre_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cobro_fecha;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.nombre_cliente;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.venta;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.venta_fact;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cobro_estado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.usuario;
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
function seleccionCobro(id, empresa_id, empresa_desc, sucursal_id, suc_desc, caja_id, caja_desc, apertura_cierre_id, apertura_cierre_desc, cobro_fecha, cliente_id, nombre_cliente, venta_id, venta, venta_fact, cobro_estado, user_id, usuario){ 
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#caja_id").val(caja_id);
    $("#caja_desc").val(caja_desc);
    $("#apertura_cierre_id").val(apertura_cierre_id);
    $("#apertura_cierre_desc").val(apertura_cierre_desc);
    $("#cobro_fecha").val(cobro_fecha);
    $("#cliente_id").val(cliente_id);
    $("#nombre_cliente").val(nombre_cliente);
    $("#venta_id").val(venta_id);
    $("#venta").val(venta);
    $("#txtNroFact").val(venta_fact);
    $("#cobro_estado").val(cobro_estado);
    $("#user_id").val(user_id);
    $("#usuario").val(usuario);
    
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

    var cobro_estado = $("#cobro_estado").val(); // Tomamos el valor actualizado
    console.log("Estado actual:", cobro_estado);
    if (cobro_estado === "REGISTRADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (cobro_estado === "CONFIRMADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        }
    $(".form-line").attr("class","form-line focused");
}

// GRABAR CABECERA
function grabar(){
    var endpoint = "cobros_cab/create";
    var metodo = "POST";
    var estado = "REGISTRADO";
    
    if($("#txtOperacion").val()==2){
        endpoint = "cobros_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "cobros_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "cobros_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'empresa_id': $("#empresa_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'user_id': $("#user_id").val(),
            'cliente_id': $("#cliente_id").val(),
            'caja_id': $("#caja_id").val(),
            'apertura_cierre_id': $("#apertura_cierre_id").val(),
            'venta_id': $("#venta_id").val(),
            'cobro_fecha': $("#cobro_fecha").val(), 
            'cobro_estado': estado,
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
                if(resultado.registro.cobro_estado!= "REGISTRADO"){
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


/* =======================
   DETALLES DE COBRO
======================= */
function listarDetalles(){
    $.ajax({
        url: getUrl()+"cobros_det/read/"+$("#id").val(),
        method:"GET",
        dataType:"json"
    })
    .done(function(res){
        let lista = "";
        let total = 0;

        for(rs of res){
            lista += `<tr>
                <td>${rs.documento}</td>
                <td>${rs.forma_cobro_desc}</td>
                <td class="text-right">${rs.monto}</td>
            </tr>`;
            total += Number(rs.monto);
        }
        $("#tableDetalles").html(lista);
        $("#totalCobrado").text(total.toFixed(0));
    });
}

function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);

    $("#cta_desc").removeAttr("disabled");
    $("#monto_cobro").removeAttr("disabled");

    // habilitar forma de cobro
    $("input[name='forma_cobro']").removeAttr("disabled");
    $("input[name='forma_cobro']").prop("checked", false);
    toggleFormaCobro(); // deja todo limpio

    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");

    $(".form-line").addClass("focused");
}

function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);

    $("#btnAgregarDetalle").attr("style","display:none");
    $("#btnEliminarDetalle").attr("style","display:none");
    $("#btnGrabarDetalle").attr("style","display:inline");
}

function grabarDetalle(){

    let endpoint = "cobros_det/create";
    let metodo = "POST";

    if($("#txtOperacionDetalle").val() == 3){
        endpoint = "cobros_det/delete/" + $("#id").val() + "/" + $("#cta_cobrar_id").val();
        metodo = "DELETE";
    }

    // VALIDACIONES GENERALES
    let monto = Number($("#monto_cobro").val()) || 0;
    let saldo = Number($("#saldo_cta").val()) || 0;

    if (monto <= 0) {
        swal("Error", "El monto debe ser mayor a cero", "error");
        return;
    }

    if (monto > saldo) {
        swal("Error", "El monto no puede superar el saldo pendiente", "error");
        return;
    }

    let formaCobro = $("input[name='forma_cobro']:checked").val();
    if (!formaCobro) {
        swal("Atención", "Debe seleccionar una forma de cobro", "warning");
        return;
    }

    // VALIDACIONES EFECTIVO
    if (formaCobro == 2) { // EFECTIVO
        let recibido = Number($("#monto_recibido").val()) || 0;

        if (recibido <= 0) {
            swal("Error", "Debe ingresar el monto recibido", "error");
            return;
        }

        if (recibido < monto) {
            swal("Error", "El monto recibido no puede ser menor al monto a cobrar", "error");
            return;
        }
    }

    // VALIDACIONES CHEQUE
    if (formaCobro === 3) {
        if ($("#entidad_emisora_id").val() == 0) {
            swal("Error", "Debe seleccionar el banco emisor", "error");
            return;
        }

        if ($("#nro_cheque").val().trim() === "") {
            swal("Error", "Debe ingresar el número de cheque", "error");
            return;
        }

        if ($("#fecha_vto").val() === "") {
            swal("Error", "Debe ingresar la fecha de vencimiento del cheque", "error");
            return;
        }
    }

    // VALIDACIONES TARJETAS
    if (formaCobro === 4) {
        if ($("#entidad_adherida_tarjeta_id").val() == 0) {
            swal("Error", "Debe seleccionar la entidad / tarjeta", "error");
            return;
        }

        if ($("#nro_tarjeta").val().trim() === "") {
            swal("Error", "Debe ingresar el número de tarjeta", "error");
            return;
        }

        if ($("#fecha_vto_tarjeta").val() === "") {
            swal("Error", "Debe ingresar la fecha de vencimiento de la tarjeta", "error");
            return;
        }
    }
    $.ajax({
        url: getUrl() + endpoint,
        method: metodo,
        dataType: "json",
        data: {
            cobro_id: $("#id").val(),
            cta_cobrar_id: $("#cta_cobrar_id").val(),
            cta_cobrar_venta_id: $("#venta_id").val(),
            forma_cobro_id: formaCobro,
            monto_cobro: monto,

            // CHEQUE
            entidad_emisora_id: $("#entidad_emisora_id").val(),
            nro_cheque: $("#nro_cheque").val(),
            fecha_vto: $("#fecha_vto").val(),

            // TARJETA
            entidad_adherida_tarjeta_id: $("#entidad_adherida_tarjeta_id").val(),
            nro_tarjeta: $("#nro_tarjeta").val(),
            fecha_vto_tarjeta: $("#fecha_vto_tarjeta").val()
        }
    })
    .done(function(){
        listarDetalles();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
        swal("Error", "No se pudo registrar el detalle del cobro", "error");
    });

    // LIMPIEZA
    $("#txtOperacionDetalle").val(1);
    $("#cta_desc").val("");
    $("#monto_cobro").val("");
    $("#saldo_cta").val(0);

    // efectivo
    $("#monto_recibido").val("");
    $("#vuelto").val("");

    // cheque
    $("#entidad_emisora_id").val(0);
    $("#entidad_emisora_desc").val("");
    $("#nro_cheque").val("");
    $("#fecha_vto").val("");

    //tarjeta
    $("#entidad_adherida_tarjeta_id").val(0);
    $("#entidad_adherida_tarjeta_desc").val("");
    $("#nro_tarjeta").val("");
    $("#fecha_vto_tarjeta").val("");

    //forma de cobro
    $("input[name='forma_cobro']").prop("checked", false).attr("disabled", true);
    toggleFormaCobro();

    //botones
    $("#btnAgregarDetalle").show();
    $("#btnEliminarDetalle").show();
    $("#btnGrabarDetalle").hide();

    $(".form-line").removeClass("focused");
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

function buscarClientes(){
    $.ajax({
        url: getUrl()+"clientes/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'cliente_id': $("#cliente_id").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCliente("+rs.cliente_id+",'"+rs.nombre_cliente+"');\">"+rs.nombre_cliente+"</li>";
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
function seleccionCliente(cliente_id, nombre_cliente){
    $("#cliente_id").val(cliente_id);
    $("#nombre_cliente").val(nombre_cliente);

    $("#listaClientes").html("");
    $("#listaClientes").attr("style","display:none;");
}

function buscarVentas(){
    $.ajax({
        url:getUrl()+"ventas_cab/buscarVentFactSuc",
        method:"POST",
        dataType: "json",
        data: {
            'sucursal_id': $("#sucursal_id").val(),
            'name': $("#venta").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionVenta("+rs.venta_id+",'"+rs.venta+"','"+rs.venta_fact+"')\">"+rs.venta+" - "+rs.venta_fact+"</li>";
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
function seleccionVenta(venta_id, venta, venta_fact){
    $("#venta_id").val(venta_id);
    $("#venta").val(venta);
    $("#txtNroFact").val(venta_fact);

    $("#listaVentas").html("");
    $("#listaVentas").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function buscarCajas(){
    // Obtener datos del usuario y sucursal
    var sucursalId = $("#sucursal_id").val();
    var userId = $("#user_id").val();
    
    // Validar que tengamos los datos necesarios
    if (!sucursalId || sucursalId == 0) {
        swal("Advertencia", "Debe seleccionar una sucursal primero", "warning");
        return;
    }
    
    if (!userId || userId == 0) {
        swal("Advertencia", "No se identificó al usuario", "warning");
        return;
    }
    
    $.ajax({
        url: getUrl() + "caja/buscarCajas",
        method: "POST",
        dataType: "json",
        data: {
            'sucursal_id': sucursalId,
            'user_id': userId
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        
        // Verificar si hay resultados
        if (resultado.length === 0) {
            lista += "<li class=\"list-group-item text-muted text-center\">No hay cajas para el usuario</li>";
        } else {
            // Mostrar cada caja
            for(var i = 0; i < resultado.length; i++){
                var rs = resultado[i];
                
                lista += "<li class=\"list-group-item\" " +
                         "onclick=\"seleccionCaja(" + rs.caja_id + ",'" + 
                         rs.caja_desc.replace(/'/g, "\\'") + "')\">" + 
                         rs.caja_desc + "</li>";
            }
        }
        
        lista += "</ul>";
        
        // Mostrar la lista
        $("#listaCajas").html(lista);
        $("#listaCajas").attr("style","display:block; position:absolute; z-index:2000; width: " + $("#caja_desc").outerWidth() + "px");
    })
    .fail(function(xhr, status, error){
        console.log("Error en buscarCajas:", xhr.responseText);
        
        // Mostrar error específico si viene del backend
        try {
            var respuesta = JSON.parse(xhr.responseText);
            if (respuesta.error) {
                swal("Error", respuesta.error, "error");
            } else {
                swal("Error", "No se pudo cargar las cajas", "error");
            }
        } catch (e) {
            swal("Error", "Error de conexión con el servidor", "error");
        }
    })
}

function seleccionCaja(caja_id, caja_desc){
    // Guardar datos de la caja seleccionada
    $("#caja_id").val(caja_id);
    $("#caja_desc").val(caja_desc);
    
    // Ocultar la lista de cajas
    $("#listaCajas").html("");
    $("#listaCajas").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
    // Buscar si esta caja tiene apertura ABIERTA
    buscarAperturas(caja_id);
}

function buscarAperturas(caja_id) {
    $.ajax({
        url: getUrl() + "aperturas_cierres/buscarAperturaCaja",
        method: "POST",
        dataType: "json",
        data: {
            'caja_id': caja_id
        }
    })
    .done(function(resultado){
        if (resultado.length > 0) {
            var apertura = resultado[0];
            
            // Guardar el ID en campo oculto
            $("#apertura_cierre_id").val(apertura.apertura_cierre_id);
            
            // Mostrar la descripción en campo visible
            $("#apertura_cierre_desc").val(apertura.apertura_cierre_desc);
            
            // Aplicar estilo focused
            $("#apertura_cierre_desc").closest(".form-line").addClass("focused");
            
        } else {
            // No hay apertura abierta
            $("#apertura_cierre_id").val("0"); // ID = 0 significa "sin apertura"
            $("#apertura_cierre_desc").val("SIN APERTURA ABIERTA");
        }
    })
    .fail(function(xhr, status, error){
        console.log("Error en buscarAperturaAbierta:", xhr.responseText);
        
        // En caso de error, mostrar mensaje
        $("#apertura_cierre_id").val("0");
        $("#apertura_cierre_desc").val("ERROR AL VERIFICAR");
        
        swal("Error", "No se pudo verificar la apertura de caja", "error");
    })
}

function buscarCtasCobrar(){
    $.ajax({
        url: getUrl() + "cobros_det/buscarCtaCobro",
        method: "POST",
        dataType: "json",
        data: {
            nombre_cliente: $("#cta_desc").val()
        }
    })
    .done(function(resultado){
        let lista = "<ul class='list-group'>";

        if (resultado.length === 0) {
            lista += "<li class='list-group-item text-muted text-center'>No existen documentos pendientes</li>";
        } else {
            for (rs of resultado) {
                lista += `
                    <li class="list-group-item"
                        onclick="seleccionCtaCobrar(
                            ${rs.id},
                            ${rs.venta_id},
                            '${rs.venta_fact}',
                            '${rs.nombre_cliente}',
                            ${rs.ctas_cob_saldo}
                        )">
                        ${rs.venta_fact} - ${rs.nombre_cliente}
                        <span class="pull-right text-success">
                            Saldo: ${rs.ctas_cob_saldo}
                        </span>
                    </li>
                `;
            }
        }

        lista += "</ul>";

        $("#listaCtasCobrar").html(lista);
        $("#listaCtasCobrar").attr(
            "style",
            "display:block; position:absolute; z-index:2000; width:" + $("#cta_desc").outerWidth() + "px"
        );
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}
function seleccionCtaCobrar(cta_cobrar_id, venta_id, venta_fact, nombre_cliente, saldo){
    $("#cta_cobrar_id").val(cta_cobrar_id);
    $("#cta_desc").val(venta_fact + " - " + nombre_cliente);

    // por defecto sugerimos cobrar el saldo completo
    $("#monto_cobro").val(saldo);
    $("#saldo_cta").val(saldo);

    $("#listaCtasCobrar").hide().html("");

    $(".form-line").addClass("focused");
}

$("#monto_recibido").on("keyup change", function () {
    let recibido = Number($(this).val()) || 0;
    let monto = Number($("#monto_cobro").val()) || 0;

    let vuelto = recibido - monto;

    if (vuelto >= 0) {
        $("#vuelto").val(vuelto.toFixed(0));
    } else {
        $("#vuelto").val(0);
    }
});

function toggleFormaCobro() {
    let formaCobro = Number($("input[name='forma_cobro']:checked").val());

    // Ocultar todos los grupos
    $("#grupoEfectivo").hide();
    $("#grupoCheque").hide();
    $("#grupoTarjeta").hide();

    // Deshabilitar campos
    $("#monto_recibido").prop("disabled", true);
    $("#entidad_emisora_desc").prop("disabled", true);
    $("#nro_cheque").prop("disabled", true);
    $("#fecha_vto").prop("disabled", true);

    $("#entidad_adherida_tarjeta_desc").prop("disabled", true);
    $("#nro_tarjeta").prop("disabled", true);
    $("#fecha_vto_tarjeta").prop("disabled", true);

    if (formaCobro === 2) { // EFECTIVO
        $("#grupoEfectivo").show();
        $("#monto_recibido").prop("disabled", false);
    }

    if (formaCobro === 3) { // CHEQUE
        $("#grupoCheque").show();
        $("#entidad_emisora_desc").prop("disabled", false);
        $("#nro_cheque").prop("disabled", false);
        $("#fecha_vto").prop("disabled", false);
    }

    if (formaCobro === 4) { // TARJETA
        $("#grupoTarjeta").show();
        $("#entidad_adherida_tarjeta_desc").prop("disabled", false);
        $("#nro_tarjeta").prop("disabled", false);
        $("#fecha_vto_tarjeta").prop("disabled", false);
    }
}


$(document).on("change", "input[name='forma_cobro']", function () {
    toggleFormaCobro();
});

/*
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

function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function grabarDetalle(){ 
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

function listarDetalles() {
    var cantidadDetalle = 0;
    var totalGral = 0;
    var totalExentas = 0;
    var totalGrav5 = 0;
    var totalGrav10 = 0;
    console.log("ID actual:", $("#id").val()); // Verifica el ID de compra
    $.ajax({
        url: getUrl() + "compras_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        console.log("Detalles recibidos:", resultado);
        var lista = "";

        for (let rs of resultado) {
            // Aseguramos tipos numéricos
            let costo = Number(rs.compra_costo) || 0;
            let cantidad = Number(rs.compra_cant) || 0;
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
        if ($("#compra_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
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
function seleccionDetalle(producto_id, prod_desc, compra_cant, compra_costo){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(compra_cant);
    $("#det_costo").val(compra_costo);
}
*/


