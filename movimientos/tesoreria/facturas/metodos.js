listar();
campoFecha();
var fv_total_exentas = 0;
var fv_total_grav5   = 0;
var fv_total_grav10  = 0;
var fv_total_general = 0;

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
                title:'Listado de Registros de Facturas Varias'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Registros de Facturas Varias'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Registros de Facturas Varias'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Registros de Facturas Varias'
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
    $("#proveedor_desc").removeAttr("disabled");
    $("#txtFecha").removeAttr("disabled");
    $("#txtTimbrado").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");
    $("#contado").removeAttr("disabled");
    $("#credito").removeAttr("disabled");
    $("#txtCantCta").removeAttr("disabled"); 
    toggleCampoCondicionFact();// Habilitar el campo intervalo_fecha_vto según la condición de venta

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
    $("#proveedor_desc").removeAttr("disabled");
    $("#txtFecha").removeAttr("disabled");
    $("#txtTimbrado").removeAttr("disabled");
    $("#txtNroFact").removeAttr("disabled");
    $("#contado").removeAttr("disabled");
    $("#credito").removeAttr("disabled");
    $("#txtCantCta").removeAttr("disabled"); 
    toggleCampoCondicionFact();// Habilitar el campo intervalo_fecha_vto según la condición de Factura 

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
        url:getUrl()+"facturas_varias_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionFactura("+rs.id+","+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.proveedor_id+",'"+rs.proveedor_desc+"','"+rs.fact_var_fec+"','"+rs.fact_var_fact+"',"+rs.fact_var_timbrado+","+rs.tipo_fact_id+","+rs.fact_var_ift+","+rs.fact_var_cant_cta+",'"+rs.fact_var_estado+"',"+rs.user_id+",'"+rs.encargado+"');\">";
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
                lista = lista + rs.fact_var_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fact_var_fact;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_fact_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fact_var_ift ;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fact_var_cant_cta ;
                lista = lista +"</td>";               
                lista = lista + "<td>";
                lista = lista + rs.fact_var_estado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.encargado;
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
function seleccionFactura(id, empresa_id, empresa_desc, sucursal_id, suc_desc, proveedor_id, proveedor_desc, fact_var_fec, fact_var_fact, fact_var_timbrado, tipo_fact_id, fact_var_ift, fact_var_cant_cta, fact_var_estado, user_id, encargado){ 
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);
    $("#txtFecha").val(fact_var_fec);
    $("#txtTimbrado").val(fact_var_timbrado);
    $("#txtNroFact").val(fact_var_fact);
    $("#txtCantCta").val(fact_var_cant_cta);
    $("#fact_var_estado").val(fact_var_estado);
    $("#user_id").val(user_id);
    $("#user_name").val(encargado);

    //condicion de compra
    if (tipo_fact_id == 6) {
        document.getElementById("contado").checked = true;
    } else if (tipo_fact_id == 7) {
        document.getElementById("credito").checked = true;
    }
    toggleCampoCondicionFact();// Actualiza el select de intervalo según la condición
       
    // --- Manejo del selectpicker ---
    $("#intervalo_fecha_vto").val(fact_var_ift);
    if (typeof $ !== "undefined" && typeof $('#intervalo_fecha_vto').selectpicker === "function") {
        $('#intervalo_fecha_vto').selectpicker('refresh');
    }
    
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

    var fact_var_estado = $("#fact_var_estado").val(); // Tomamos el valor actualizado
    console.log("Estado actual:", fact_var_estado);
    if (fact_var_estado === "PENDIENTE"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (fact_var_estado === "CONFIRMADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "facturas_varias_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "facturas_varias_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "facturas_varias_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "facturas_varias_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 

     // IVA calculado correctamente
    var monto_iva_5  = parseFloat((fv_total_grav5 / 21).toFixed(2));
    var monto_iva_10 = parseFloat((fv_total_grav10 / 11).toFixed(2));

    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'user_id': $("#user_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'tipo_fact_id': $("input[name='tipo_fact_id']:checked").val(),
            'fact_var_fact': $("#txtNroFact").val(),
            'fact_var_timbrado': $("#txtTimbrado").val(),
            'fact_var_fec': $("#txtFecha").val(), 
            'fact_var_cant_cta': $("#txtCantCta").val(),
            'fact_var_ift': $("#intervalo_fecha_vto").val(),    
            'fact_var_estado': estado,

            monto_exentas: fv_total_exentas,
            monto_grav_5: fv_total_grav5,
            monto_grav_10: fv_total_grav10,
            monto_iva_5: monto_iva_5,
            monto_iva_10: monto_iva_10,
            monto_general: fv_total_general,
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
                if(resultado.registro.fact_var_estado!= "PENDIENTE"){
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
    $("#rubro_desc").removeAttr("disabled");
    $("#det_cantidad").removeAttr("disabled");
    $("#det_monto").removeAttr("disabled");
    $("#det_tipo_iva").removeAttr("disabled");
    $('#det_tipo_iva').selectpicker('refresh');
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    $("#det_cantidad").removeAttr("disabled");
    $("#det_monto").removeAttr("disabled");
    // --- PARA EL CAMPO TIPO IVA ---
    $("#det_tipo_iva").removeAttr("disabled");
    if (typeof $ !== "undefined" && typeof $('#det_tipo_iva').selectpicker === "function") {
        $('#det_tipo_iva').selectpicker('refresh');
    }
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
    var endpoint = "facturas_varias_det/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "facturas_varias_det/update/"+$("#id").val()+"/"+$("#rubro_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "facturas_varias_det/delete/"+$("#id").val()+"/"+$("#rubro_id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "factura_varia_id":$("#id").val(),
            "rubro_id":$("#rubro_id").val(),
            "fact_var_cant":$("#det_cantidad").val(),
            "fact_var_monto":$("#det_monto").val(),
            "fact_var_tipo_iva": $("#det_tipo_iva").val()
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
    $("#rubro_desc").val("");
    $("#det_cantidad").val("");
    $("#det_monto").val("");
    $("#det_tipo_iva").selectpicker('val', 'EXENTA');
    $("#det_tipo_iva").attr("disabled","true");
}

function buscarRubros(){
    $.ajax({
        url:getUrl()+"rubro/search",
        method:"POST",
        dataType: "json",
        data: {
            'rubro_desc': $("#rubro_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionRubro("+rs.rubro_id+",'"+rs.rubro_desc+"');\">"+rs.rubro_desc+"</li>";
        }
        lista += "</ul>";
        $("#ListaRubros").html(lista);
        $("#ListaRubros").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionRubro(rubro_id, rubro_desc){
    $("#rubro_id").val(rubro_id);
    $("#rubro_desc").val(rubro_desc);

    $("#ListaRubros").html("");
    $("#ListaRubros").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var totalGral = 0;
    var totalExentas = 0;
    var totalGrav5 = 0;
    var totalGrav10 = 0;
    console.log("ID actual:", $("#id").val()); // Verifica el ID de Factura
    $.ajax({
        url: getUrl() + "facturas_varias_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        console.log("Detalles recibidos:", resultado);
        var lista = "";

        for (let rs of resultado) {
            // Aseguramos tipos numéricos
            let monto = Number(rs.fact_var_monto) || 0;
            let cantidad = Number(rs.fact_var_cant) || 0;
            let subtotal = cantidad * monto;

            let exentas = 0;
            let grav5 = 0;
            let grav10 = 0;

            // Normalizamos el tipo de IVA elegido por el usuario
            let tipoIVA = (rs.fact_var_tipo_iva || 'EXENTA').toString().toUpperCase();
            switch (tipoIVA) {
                case '5':
                    grav5 = subtotal;
                    totalGrav5 += subtotal;
                    break;

                case '10':
                    grav10 = subtotal;
                    totalGrav10 += subtotal;
                    break;

                case 'EXENTA':
                default:
                    exentas = subtotal;
                    totalExentas += subtotal;
                    break;
            }

            totalGral += subtotal;
            cantidadDetalle++;

            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + rs.rubro_id + ",'" + (rs.rubro_desc||'') + "'," + cantidad + "," + monto + ",'" + tipoIVA + "');\">";
            lista += "<td>" + rs.rubro_id + "</td>";
            lista += "<td>" + (rs.rubro_desc||'') + "</td>";
            lista += "<td>" + cantidad + "</td>";
            lista += "<td class='text-right'>" + monto.toFixed(0) + "</td>";
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
        if ($("#fact_var_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
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
function seleccionDetalle(rubro_id, rubro_desc, fact_var_cant, fact_var_monto, tipo_iva){
    $("#rubro_id").val(rubro_id);
    $("#rubro_desc").val(rubro_desc);
    $("#det_cantidad").val(fact_var_cant);
    $("#det_monto").val(fact_var_monto);
    $("#det_tipo_iva").selectpicker('val', tipo_iva);
    $("#det_tipo_iva").selectpicker('refresh');
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

if (typeof $('#det_tipo_iva').selectpicker === "function") {
    $('#det_tipo_iva').selectpicker('refresh');
}

function toggleCampoCondicionFact() {
    const contado = document.getElementById("contado").checked;
    const intervaloFechaVto = document.getElementById("intervalo_fecha_vto");

    // Limpiar opciones anteriores
    intervaloFechaVto.innerHTML = '';

    if (contado) {
        // Solo opción para contado: 0 días (valor = 0)
        intervaloFechaVto.innerHTML = '<option value="0">0 días</option>';
        intervaloFechaVto.value = "0";  // Preseleccionamos
        intervaloFechaVto.setAttribute('disabled', 'disabled');
    } else {
        // Opciones de crédito: 30, 60, 90, 120 días
        intervaloFechaVto.innerHTML =
            '<option value="30">30 días</option>' +
            '<option value="60">60 días</option>' +
            '<option value="90">90 días</option>' +
            '<option value="120">120 días</option>';
        intervaloFechaVto.value = "30"; // Valor por defecto
        intervaloFechaVto.removeAttribute('disabled');
    }

    // Refrescar el selectpicker para que se actualice visualmente
    if (typeof $ !== "undefined" && typeof $('#intervalo_fecha_vto').selectpicker === "function") {
        $('#intervalo_fecha_vto').selectpicker('refresh');
    }
}

// Asociar eventos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contado").addEventListener("change", toggleCampoCondicionFact);
    document.getElementById("credito").addEventListener("change", toggleCampoCondicionFact);
    toggleCampoCondicionFact(); // Inicialización
});


