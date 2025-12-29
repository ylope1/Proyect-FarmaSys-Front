listar();
campoFecha();
inicializarSelectPickers();
cargarFormasCobro();

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
                title:'Listado de Ordenes de Pagos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ordenes de Pagos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ordenes de Pagos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ordenes de Pagos'
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
    $("#forma_cobro_id").removeAttr("disabled"); 
    $('#forma_cobro_id').selectpicker('refresh');

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnRechazar").attr("disabled", "true");
    $("#btnAprobar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $("#registros").attr("style", "display:none;");
    $(".form-line").attr("class", "form-line focused");
    
}

function editar() {
    $("#txtOperacion").val(2);
    $("#empresa_desc").removeAttr("disabled");
    $("#suc_desc").removeAttr("disabled");
    $("#proveedor_desc").removeAttr("disabled");
    $("#txtFecha").removeAttr("disabled");
    $("#forma_cobro_id").removeAttr("disabled");
    $('#forma_cobro_id').selectpicker('refresh');

    $("#btnAgregar").attr("disabled", "true");
    $("#btnEditar").attr("disabled", "true");
    $("#btnAnular").attr("disabled", "true");
    $("#btnRechazar").attr("disabled", "true");
    $("#btnAprobar").attr("disabled", "true");
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
    $("#btnRechazar").attr("disabled", "true");
    $("#btnAprobar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnRechazar").attr("disabled", "true");
    $("#btnAprobar").attr("disabled", "true");
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
    $("#txtFecAprob").removeAttr("disabled");
    
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
        pregunta = "¿DESEA RECHAZAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===6){
        titulo = "APROBAR";
        pregunta = "¿DESEA APROBAR EL REGISTRO SELECCIONADO?";
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
        url:getUrl()+"orden_pago_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionOrdenPago("+rs.id+","+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.proveedor_id+",'"+rs.proveedor_desc+"','"+rs.orden_pago_fec+"','"+rs.orden_pago_fec_aprob+"',"+rs.forma_cobro_id+","+rs.user_id+",'"+rs.encargado+"','"+rs.orden_pago_estado+"');\">";
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
                lista = lista + rs.proveedor_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.orden_pago_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.orden_pago_fec_aprob;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.forma_cobro_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.encargado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.orden_pago_estado;
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

function seleccionOrdenPago(id, empresa_id, empresa_desc, sucursal_id, suc_desc, proveedor_id, proveedor_desc, orden_pago_fec, orden_pago_fec_aprob, forma_cobro_id, user_id, encargado, orden_pago_estado){
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);
    $("#txtFecha").val(orden_pago_fec);
    $("#txtFecAprob").val(orden_pago_fec_aprob);
    $("#forma_cobro_id").val(forma_cobro_id);
    $('#forma_cobro_id').selectpicker('refresh');
    $("#user_id").val(user_id);
    $("#user_name").val(encargado);
    $("#orden_pago_estado").val(orden_pago_estado);
    
    $("#detalles").attr("style","display:block;");
    $("#registros").attr("style","display:none;");
    $("#formDetalles").attr("style","display:none;");

    // DECIDE QUE CARGAR SEGÚN ESTADO
    if (orden_pago_estado === "PENDIENTE") {
        // Limpieza previa
        $("#tableDetalles").html("");
        $("#totalPagar").text(0);

        // Buscar cuotas pendientes del proveedor
        buscarCuotasPendientesProveedor();
    } else {
        // Orden ya procesada con detalles grabados
        listarDetalles();
    }  

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnCancelar").removeAttr("disabled");
    
    if (orden_pago_estado === "PENDIENTE"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnRechazar").removeAttr("disabled");
        $("#btnAprobar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (orden_pago_estado === "APROBADO"){  
        $("#btnAgregar").attr("disabled","true");
        $("#btnEditar").attr("disabled","true");
        $("#btnAnular").attr("disabled","true");
        $("#btnRechazar").attr("disabled","true");
        $("#btnAprobar").attr("disabled","true");

        // HABILITAR CONFIRMAR
        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        //listarDetalles();
    }

    if (orden_pago_estado === "CONFIRMADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        $("#btnRechazar").attr("disabled","true");
        $("#btnAprobar").attr("disabled","true");
    }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "orden_pago_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "orden_pago_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "orden_pago_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "orden_pago_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    if($("#txtOperacion").val()==5){
        endpoint = "orden_pago_cab/rechazar/"+$("#id").val();
        metodo = "PUT";
        estado = "RECHAZADO";
    } 
    if($("#txtOperacion").val()==6){
        endpoint = "orden_pago_cab/aprobar/"+$("#id").val();
        metodo = "PUT";
        estado = "APROBADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'orden_pago_fec': $("#txtFecha").val(), 
            'orden_pago_fec_aprob': $("#txtFecAprob").val(),
            'forma_cobro_id': $("#forma_cobro_id").val(),
            'user_id': $("#user_id").val(),
            'orden_pago_estado': estado,
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

function buscarCuotasPendientesProveedor(){
    $.ajax({
        url:getUrl()+"orden_pago_cab/buscarCuotasPendientesProveedor",
        method:"POST",
        dataType:"json",
        data:{ proveedor_id:$("#proveedor_id").val() }
    }).done(function(res){
        let html="", total=0;
        if(res.length==0){
            $("#tipoProveedor").val(""); // limpiar tipo
            $("#tableDetalles").html(
                "<tr>" +
                    "<td colspan='6' class='text-center'>" +
                        "El proveedor no tiene cuotas pendientes" +
                    "</td>" +
                "</tr>"
            );
            $("#totalPagar").text(0);
            swal("Atención","El proveedor no tiene cuotas pendientes","warning");
            return;
        }
        $("#tipoProveedor").val(res[0].tipo_documento=="COMPRA"?"COMPRA":"GASTO");

        for(let r of res){
            html+=`<tr>
                <td>${r.documento}</td>
                <td>${r.cuota_nro}</td>
                <td>${r.fecha_vto}</td>
                <td class="text-right">${r.monto}</td>
                <td class="text-right">${r.saldo}</td>
                <td class="text-center">
                    <button class="btn btn-success btn-xs"
                        onclick="agregarCuota(${r.ctas_pagar_id||0},${r.compra_id||0},${r.ctas_pagar_fact_varias_id||0},${r.cuota_nro},${r.saldo},'${r.fecha_vto}')">
                        <i class="material-icons">add</i>
                    </button>
                </td>
            </tr>`;
            total+=parseInt(r.saldo);
        }
        $("#tableDetalles").html(html);
        $("#totalPagar").text(total);
    });
}

function agregarCuota(cta, compra, cta_fv, cuota, saldo, vto){
    let tipo=$("#tipoProveedor").val();
    let endpoint = tipo=="COMPRA"
        ? "orden_pago_det/create"
        : "orden_pago_det_fact_var/create";

    let data = tipo=="COMPRA"
        ? { orden_pago_id:$("#id").val(), ctas_pagar_id:cta, compra_id:compra, op_cuota_nro:cuota, op_monto_pagar:saldo, op_saldo:saldo, op_fecha_vto:vto }
        : { orden_pago_id:$("#id").val(), ctas_pagar_fact_varias_id:cta_fv, op_cuota_nro:cuota, op_monto_pagar:saldo, op_saldo:saldo, op_fecha_vto:vto };

    $.ajax({ url:getUrl()+endpoint, method:"POST", dataType:"json", data:data })
    .done(function(){ listarDetalles(); });
}

function quitarCuota(cta, compra, cta_fv){
    let tipo=$("#tipoProveedor").val();
    let endpoint = tipo=="COMPRA"
        ? "orden_pago_det/delete/"+$("#id").val()+"/"+cta+"/"+compra
        : "orden_pago_det_fact_var/delete/"+$("#id").val()+"/"+cta_fv;

    $.ajax({ url:getUrl()+endpoint, method:"DELETE" })
    .done(function(){ listarDetalles(); });
}

function listarDetalles() {
    let tipo=$("#tipoProveedor").val();
    let endpoint = tipo=="COMPRA"
        ? "orden_pago_det/read/"+$("#id").val()
        : "orden_pago_det_fact_var/read/"+$("#id").val();
    $.ajax({
        url:getUrl()+endpoint,
        method:"GET",
        dataType: "json"
    })
    .done(function(res){
        let html="", total=0;
        for(let r of res){
            html+=`<tr>
                <td>${r.documento}</td>
                <td>${r.op_cuota_nro}</td>
                <td>${r.op_fecha_vto}</td>
                <td class="text-right">${r.op_monto_pagar}</td>
                <td class="text-right">${r.op_saldo}</td>
                <td class="text-center">
                    <button class="btn btn-danger btn-xs" onclick="quitarCuota(${r.ctas_pagar_id||0},${r.compra_id||0},${r.ctas_pagar_fact_varias_id||0})">
                        <i class="material-icons">clear</i>
                    </button>
                </td>
            </tr>`;
            total+=parseInt(r.op_saldo);
        }
        $("#tableDetalles").html(html);
        $("#totalPagar").text(total);
    });
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

function cargarFormasCobro(){
    $.ajax({
        url: getUrl() + "forma_cobro/listarFormasCobro",
        method: "GET",
        dataType: "json"
    })
    .done(function(res){
        let html = '<option value="">-- Selecciona Forma de Pago --</option>';
        for (let r of res){
            html += `<option value="${r.forma_cobro_id}">${r.forma_cob_desc}</option>`;
        }
        $("#forma_cobro_id").html(html);

        if (typeof $('#forma_cobro_id').selectpicker === "function") {
            $('#forma_cobro_id').selectpicker('refresh');
        }
    })
    .fail(function(a,b,c){
        console.log(a.responseText);
    });
}

function inicializarSelectPickers() {
    if (typeof $.fn.selectpicker !== 'undefined') {
        $('.selectpicker').selectpicker();
        console.log('SelectPickers inicializados');
    } else {
        console.warn('Bootstrap Select no está cargado');
    }
}


