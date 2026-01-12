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
                title:'Listado de Registros de Asignacion de Fondos Fijos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Registros de Asignacion de Fondos Fijos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Registros de Asignacion de Fondos Fijos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Registros de Asignacion de Fondos Fijos'
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
    $("#asignacion_ff_fecha").removeAttr("disabled");
    $("#asignacion_ff_monto").removeAttr("disabled");
    $("#asignacion_ff_obs").removeAttr("disabled");

    $("#btnAgregar").attr("disabled", "true");
    $("#btnConfirmar").attr("disabled", "true");
    $("#btnInactivar").attr("disabled", "true");
    $("#btnActivar").attr("disabled", "true");
    $("#btnCerrar").attr("disabled", "true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class", "form-line focused");
    $("#registros").attr("style", "display:none;");
}

function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnInactivar").attr("disabled","true");
    $("#btnActivar").attr("disabled","true");
    $("#btnCerrar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function inactivar(){
    $("#txtOperacion").val(5);
    $("#btnAgregar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnInactivar").attr("disabled","true");
    $("#btnActivar").attr("disabled","true");
    $("#btnCerrar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function activar(){
    $("#txtOperacion").val(6);
    $("#btnAgregar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnInactivar").attr("disabled","true");
    $("#btnActivar").attr("disabled","true");
    $("#btnCerrar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function cerrar(){
    $("#txtOperacion").val(7);
    $("#btnAgregar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnInactivar").attr("disabled","true");
    $("#btnActivar").attr("disabled","true");
    $("#btnCerrar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if(oper===5){
        titulo = "INACTIVAR";
        pregunta = "¿DESEA INACTIVAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===6){
        titulo = "ACTIVAR";
        pregunta = "¿DESEA ACTIVAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===7){
        titulo = "CERRAR";
        pregunta = "¿DESEA CERRAR EL REGISTRO SELECCIONADO?";
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
        url:getUrl()+"asignacion_fondo_fijo/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionAsignacion("+rs.id+","+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.proveedor_id+",'"+rs.proveedor_desc+"','"+rs.asignacion_ff_fecha+"',"+rs.asignacion_ff_monto+",'"+rs.asignacion_ff_obs+"','"+rs.asignacion_ff_estado+"',"+rs.user_id+",'"+rs.encargado+"');\">";
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
                lista = lista + rs.asignacion_ff_fecha;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.asignacion_ff_monto;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.asignacion_ff_obs;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.asignacion_ff_estado;
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
function seleccionCompra(id, empresa_id, empresa_desc, sucursal_id, suc_desc, proveedor_id, proveedor_desc, asignacion_ff_fecha, asignacion_ff_monto, asignacion_ff_obs, asignacion_ff_estado, user_id, encargado){ 
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#proveedor_id").val(proveedor_id);
    $("#proveedor_desc").val(proveedor_desc);
    $("#asignacion_ff_fecha").val(asignacion_ff_fecha);
    $("#asignacion_ff_monto").val(asignacion_ff_monto);
    $("#asignacion_ff_obs").val(asignacion_ff_obs);
    $("#compra_estado").val(asignacion_ff_estado);
    $("#user_id").val(user_id);
    $("#user_name").val(encargado);

    $("#btnAgregar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").removeAttr("disabled");

    if(estado==="GENERADO"){
        $("#btnConfirmar").removeAttr("disabled");
    }
    if(estado==="ACTIVO"){
        $("#btnInactivar,#btnCerrar").removeAttr("disabled");
    }
    if(estado==="INACTIVO"){
        $("#btnActivar,#btnCerrar").removeAttr("disabled");
    }
    
    $("#registros").attr("style","display:none;");
    $("#formDetalles").attr("style","display:none;");  

    $(".form-line").attr("class","form-line focused");
}
//hasta aca ya hice debo continuar la funcion grabar
function grabar(){
    var endpoint = "compras_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "compras_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "compras_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "compras_cab/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    } 
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(),
            'orden_comp_id': ($("#orden_comp_id").val() === "0" || $("#orden_comp_id").val() === "") ? null : $("#orden_comp_id").val(),
            'proveedor_id': $("#proveedor_id").val(),
            'user_id': $("#user_id").val(),
            'sucursal_id': $("#sucursal_id").val(),
            'empresa_id': $("#empresa_id").val(),
            'tipo_fact_id': $("input[name='tipo_fact_id']:checked").val(),
            'compra_fact': $("#txtNroFact").val(),
            'compra_timbrado': $("#txtTimbrado").val(),
            'compra_fec': $("#txtFecha").val(), 
            'compra_fec_recep': $("#txtFecRecep").val(),
            'compra_cant_cta': $("#txtCantCta").val(),
            'compra_ifv': $("#intervalo_fecha_vto").val(),    
            'compra_estado': estado,
            'deposito_id': $("#deposito_id").val(),
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
                if(resultado.registro.compra_estado!= "PENDIENTE"){
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



