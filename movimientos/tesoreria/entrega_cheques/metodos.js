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

    habilitarCampos();

    deshabilitarBotones();
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $("#registros").attr("style", "display:none;");
    $(".form-line").attr("class", "form-line focused");
    
}

function editar() {
    $("#txtOperacion").val(2);
    habilitarCampos();

    deshabilitarBotones();
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
    
}

function anular(){
    $("#txtOperacion").val(3);

    deshabilitarBotones();
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    $("#txtOperacion").val(4);

    deshabilitarBotones();
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
        url:getUrl()+"pago_cheques/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(res){
        let html="";
        for(let r of res){
            html += `<tr onclick="seleccionar(${r.id},
                '${r.cta_desc}','${r.mov_banc_tipo}','${r.mov_banc_nro}',
                ${r.monto},'${r.retira_nombre}','${r.retira_ci}',
                '${r.fecha_entrega}','${r.estado}','${r.observacion||''}')">
                <td>${r.id}</td>
                <td>${r.cta_desc}</td>
                <td>${r.mov_banc_tipo}</td>
                <td>${r.mov_banc_nro}</td>
                <td>${r.monto}</td>
                <td>${r.retira_nombre}</td>
                <td>${r.estado}</td>
            </tr>`;
        }
        $("#tableBody").html(html);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionar(id, cta_desc, tipo, nro, monto, nombre, ci, fecha, estado, obs){
    $("#id").val(id);
    $("#cta_desc").val(cta_desc);
    $("#mov_banc_tipo").val(tipo);
    $("#mov_banc_nro").val(nro);
    $("#monto").val(monto);
    $("#retira_nombre").val(nombre);
    $("#retira_ci").val(ci);
    $("#fecha_entrega").val(fecha);
    $("#observacion").val(obs);
    $("#pag_cheq_estado").val(estado);

    deshabilitarCampos();
    deshabilitarBotones();

    $("#btnCancelar").removeAttr("disabled");

    if(estado === "PENDIENTE"){
        $("#btnEditar").removeAttr("disabled");
        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
    }

    $("#registros").hide();
}

function grabar(){
    var endpoint = "pago_cheques/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "pago_cheques/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "pago_cheques/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "pago_cheques/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            id: $("#id").val(),
            cta_id: $("#cta_id").val(),
            mov_banc_tipo: $("#mov_banc_tipo").val(),
            mov_banc_nro: $("#mov_banc_nro").val(),
            monto: $("#monto").val(),
            retira_nombre: $("#retira_nombre").val(),
            retira_ci: $("#retira_ci").val(),
            fecha_entrega: $("#fecha_entrega").val(),
            observacion: $("#observacion").val(),
            estado: estado,
            'operacion': $("#txtOperacion").val()
        }
    })
    .done(function(resp){
        swal("Resultado", resp.mensaje, resp.tipo, function(){
            location.reload(true);
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

function habilitarCampos(){
    $("#cta_desc,#mov_banc_tipo,#mov_banc_nro,#monto,#retira_nombre,#retira_ci,#fecha_entrega,#observacion")
        .removeAttr("disabled");
}

function deshabilitarCampos(){
    $("#cta_desc,#mov_banc_tipo,#mov_banc_nro,#monto,#retira_nombre,#retira_ci,#fecha_entrega,#observacion")
        .attr("disabled","true");
}

function deshabilitarBotones(){
    $("#btnAgregar,#btnEditar,#btnAnular,#btnConfirmar,#btnGrabar")
        .attr("disabled","true");
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


