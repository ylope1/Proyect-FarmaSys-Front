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
                title:'Listado de Entrega de Cheques'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Entrega de Cheques'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Entrega de Cheques'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Entrega de Cheques'
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

    // habilitar SOLO buscadores + campos editables
    $("#orden_pago_buscar").removeAttr("disabled");
    $("#cta_buscar").removeAttr("disabled");

    $("#observacion").removeAttr("disabled");
    $("#fecha_entrega").removeAttr("disabled");

    $("#mov_banc_nro_ref").removeAttr("disabled");
    $("#mov_banc_fec_emision").removeAttr("disabled");
    $("#mov_banc_fec_valor").removeAttr("disabled");
    $("#mov_banc_monto").removeAttr("disabled");

    $("#retira_nombre").removeAttr("disabled");
    $("#retira_ci").removeAttr("disabled");
    $("#retira_telefono").removeAttr("disabled");

    // botones
    $("#btnAgregar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $("#registros").attr("style", "display:none;");
    $(".form-line").attr("class", "form-line focused");

    // valores por defecto
    $("#pag_cheq_estado").val("REGISTRADO");
    $("#estado").val("REGISTRADO"); // informativo
}

function anular(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnAnular").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
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
        url: getUrl() + "pago_cheques/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(res){
        let lista = "";

        for (let rs of res){

            lista += `
            <tr class="item-list"
                onclick="seleccionPagoCheque(
                    ${rs.orden_pago_id},
                    ${rs.empresa_id}, '${rs.empresa_desc}',
                    ${rs.sucursal_id}, '${rs.suc_desc}',
                    ${rs.proveedor_id}, '${rs.proveedor_desc}',
                    ${rs.cta_bancaria_id}, '${rs.cta_banc_desc}',
                    ${rs.titular_id}, '${rs.titular_desc}',
                    ${rs.mov_bancario_id},
                    '${rs.mov_banc_nro_ref}',
                    '${rs.mov_banc_fec_emision}',
                    '${rs.mov_banc_fec_valor}',
                    ${rs.mov_banc_monto},
                    '${rs.observacion || ''}',
                    '${rs.fecha_entrega}',
                    '${rs.pag_cheq_estado}',
                    '${rs.retira_nombre || ''}',
                    '${rs.retira_ci || ''}',
                    '${rs.retira_telefono || ''}'
                );">
                <td>${rs.orden_pago_desc}</td>
                <td>${rs.proveedor_desc}</td>
                <td>${rs.mov_banc_nro_ref}</td>
                <td class="text-right">${rs.mov_banc_monto}</td>
                <td>${rs.fecha_entrega}</td>
                <td>${rs.pag_cheq_estado}</td>
            </tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a){
        console.log(a.responseText);
        swal("Error","No se pudo listar los registros","error");
    });
}

function seleccionPagoCheque(
    orden_pago_id,
    empresa_id, empresa_desc,
    sucursal_id, suc_desc,
    proveedor_id, proveedor_desc,
    cta_bancaria_id, cta_banc_desc,
    titular_id, titular_desc,
    mov_bancario_id,
    mov_banc_nro_ref, mov_banc_fec_emision, mov_banc_fec_valor, mov_banc_monto,
    observacion, fecha_entrega, pag_cheq_estado,
    retira_nombre, retira_ci, retira_telefono
){
    // IDs clave
    $("#orden_pago_id").val(orden_pago_id);
    $("#mov_bancario_id").val(mov_bancario_id);

    // Orden de pago (informativo)
    $("#orden_pago_buscar").val(orden_pago_id);

    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);

    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);

    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);

    // Cuenta / Titular
    $("#cta_bancaria_id").val(cta_bancaria_id);
    $("#cta_banc_desc").val(cta_banc_desc);

    $("#titular_id").val(titular_id);
    $("#titular_desc").val(titular_desc);

    $("#cta_buscar").val(cta_banc_desc + " - " + titular_desc);

    // Cheque
    $("#mov_banc_nro_ref").val(mov_banc_nro_ref);
    $("#mov_banc_fec_emision").val(mov_banc_fec_emision);
    $("#mov_banc_fec_valor").val(mov_banc_fec_valor);
    $("#mov_banc_monto").val(mov_banc_monto);

    // Observación
    $("#observacion").val(observacion);

    // Entrega
    $("#fecha_entrega").val(fecha_entrega);
    $("#retira_nombre").val(retira_nombre);
    $("#retira_ci").val(retira_ci);
    $("#retira_telefono").val(retira_telefono);

    // Estado
    $("#pag_cheq_estado").val(pag_cheq_estado);
    $("#estado").val(pag_cheq_estado);

    // UI
    $("#registros").hide();
    $("#btnCancelar").removeAttr("disabled");

    $("#btnAgregar").prop("disabled", true);
    $("#btnGrabar").prop("disabled", true);
    $("#btnAnular").prop("disabled", true);
    $("#btnConfirmar").prop("disabled", true);

    if (pag_cheq_estado === "REGISTRADO") {
        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
    }

    $(".form-line").addClass("focused");
}

function grabar(){

    if (Number($("#orden_pago_id").val()) === 0){
        swal("Atención","Debe seleccionar una Orden de Pago confirmada","warning");
        return;
    }
    if (!$("#cta_bancaria_id").val() || !$("#titular_id").val()){
        swal("Atención","Debe seleccionar Cuenta Bancaria y Titular","warning");
        return;
    }
    if (!$("#mov_banc_nro_ref").val()){
        swal("Atención","Debe ingresar el Nro. de Cheque","warning");
        return;
    }
    if (!$("#mov_banc_monto").val() || Number($("#mov_banc_monto").val()) <= 0){
        swal("Atención","Debe ingresar el Monto","warning");
        return;
    }

    var endpoint = "pago_cheques/create";
    var metodo = "POST";
    var pag_estado = $("#pag_cheq_estado").val() || "ENTREGADO";
    var mov_estado = "REGISTRADO";

    if($("#txtOperacion").val()==3){
        endpoint = "pago_cheques/anular/"+$("#id").val();
        metodo = "PUT";
        pag_estado = "ANULADO";
        mov_estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "pago_cheques/confirmar/" +$("#orden_pago_id").val() + "/" +$("#mov_bancario_id").val();
        metodo = "PUT";
        pag_estado = "ENTREGADO";
        mov_estado = "CONFIRMADO";
    } 

    // Pago con cheque = DEBITO
    let monto = Number($("#mov_banc_monto").val()) || 0;

    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            //PAGO CHEQUES
            orden_pago_id: $("#orden_pago_id").val(),
            pag_cheq_estado: pag_estado,
            fecha_entrega: $("#fecha_entrega").val(),
            retira_nombre: $("#retira_nombre").val(),
            retira_ci: $("#retira_ci").val(),
            retira_telefono: $("#retira_telefono").val(),

            // mov_bancarios
            cta_bancaria_id: $("#cta_bancaria_id").val(),
            titular_id: $("#titular_id").val(),
            sucursal_id: $("#sucursal_id").val(),
            user_id: $("#user_id").val(),
            mov_banc_estado: mov_estado,
            mov_banc_tipo: "CHEQUE",
            mov_banc_nro_ref: $("#mov_banc_nro_ref").val(),
            mov_banc_fecha: $("#fecha_entrega").val(),         // registro del movimiento
            mov_banc_fec_emision: $("#mov_banc_fec_emision").val(),
            mov_banc_fec_valor: $("#mov_banc_fec_valor").val(),
            mov_banc_monto_debito: monto,
            mov_banc_monto_credito: 0,
            observacion: $("#observacion").val()
        }
    })
    .done(function(resp){
        swal({
            title:"Respuesta",
            text: resp.mensaje,
            type: resp.tipo
        }, function(){
            if(resp.tipo === "success"){
                location.reload(true);
            }
        });
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
        swal("Error","No se pudo completar la operación","error");
    });
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function buscarOrdenesPago(){
    $.ajax({
        url: getUrl() + "orden_pago_cab/buscar",
        method: "POST",
        dataType: "json",
        data:{
            user_id: $("#user_id").val(),
            proveedor: $("#orden_pago_buscar").val()
        }
    })
    .done(function(res){
        let lista = "<ul class='list-group'>";
        for (let r of res){
            lista += `<li class="list-group-item"
                onclick="seleccionOrdenPago(
                    ${r.id},
                    ${r.empresa_id}, '${r.empresa_desc}',
                    ${r.sucursal_id}, '${r.suc_desc}',
                    ${r.proveedor_id}, '${r.proveedor_desc}',
                    '${r.orden_pago_estado}',
                    ${r.total_pagar}
                );">
                ${r.orden}
            </li>`;
        }
        lista += "</ul>";
        $("#listaOrdenesPago").html(lista).css({display:'block', position:'absolute', zIndex:2000});
    })
    .fail(function(a){
        console.log(a.responseText);
    });
}

function seleccionOrdenPago(id, empresa_id, empresa_desc, sucursal_id, suc_desc, proveedor_id, proveedor_desc, estado, total){

    $("#orden_pago_id").val(id);

    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);

    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);

    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);

    $("#estado").val("ENTREGADO"); // estado del pago_cheque

    // sugerir monto desde la orden
    if (!$("#mov_banc_monto").val()){
        $("#mov_banc_monto").val(total);
    }

    $("#listaOrdenesPago").hide();
}

function buscarCtasTitulares(){
    $.ajax({
        url: getUrl()+"cta_titular/buscar",
        method:"POST",
        dataType:"json",
        data:{ texto: $("#cta_buscar").val() }
    })
    .done(function(res){
        let lista = "<ul class='list-group'>";
        for (let r of res){
            // texto mostrado
            let texto = (r.cta_banc_desc||'') + " - " + (r.titular_desc||'');
            lista += `<li class="list-group-item"
                onclick="seleccionCtaTitular(
                    ${r.cta_bancaria_id},
                    '${r.cta_banc_desc}',
                    ${r.titular_id},
                    '${r.titular_desc}'
                );">
                ${texto}
            </li>`;
        }
        lista += "</ul>";
        $("#listaCtas").html(lista);
        $("#listaCtas").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

function seleccionCtaTitular(cta_bancaria_id, cta_banc_desc, titular_id, titular_desc){
    $("#cta_bancaria_id").val(cta_bancaria_id);
    $("#cta_banc_desc").val(cta_banc_desc);

    $("#titular_id").val(titular_id);
    $("#titular_desc").val(titular_desc);

    $("#listaCtas").html("");
    $("#listaCtas").attr("style","display:none;");
    $(".form-line").attr("class","form-line focused");
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


