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
                title:'Listado de Registros de Ajustes de Stock'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Registros de Ajustes de Stock'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Registros de Ajustes de Stock'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Registros de Ajustes de Stock'
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
    $("#POSITIVO").removeAttr("disabled");
    $("#NEGATIVO").removeAttr("disabled");
    $("#ajus_mot_desc").removeAttr("disabled");

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
    $("#POSITIVO").removeAttr("disabled");
    $("#NEGATIVO").removeAttr("disabled");
    $("#ajus_mot_desc").removeAttr("disabled");

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

function listar(){
    $.ajax({
        url:getUrl()+"ajustes_cab/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){ 
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionAjuste("+rs.id+","+rs.empresa_id+",'"+rs.empresa_desc+"',"+rs.sucursal_id+",'"+rs.suc_desc+"',"+rs.deposito_id+",'"+rs.deposito_desc+"','"+rs.ajuste_fec+"','"+rs.tipo_ajuste+"',"+rs.ajustes_motivos_id+",'"+rs.ajus_mot_desc+"','"+rs.ajuste_estado+"',"+rs.user_id+",'"+rs.encargado+"');\">";
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
                lista = lista + rs.ajuste_fec;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipo_ajuste;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ajus_mot_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ajuste_estado;
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
function seleccionAjuste(id, empresa_id, empresa_desc, sucursal_id, suc_desc, deposito_id, deposito_desc, ajuste_fec, tipo_ajuste, ajustes_motivos_id, ajus_mot_desc, ajuste_estado, user_id, encargado){ 
    $("#id").val(id);
    $("#empresa_id").val(empresa_id);
    $("#empresa_desc").val(empresa_desc);   
    $("#sucursal_id").val(sucursal_id);
    $("#suc_desc").val(suc_desc);
    $("#deposito_id").val(deposito_id);
    $("#deposito_desc").val(deposito_desc);
    $("#txtFecha").val(ajuste_fec);
    $("#ajustes_motivos_id").val(ajustes_motivos_id);
    $("#ajus_mot_desc").val(ajus_mot_desc);
    $("#ajuste_estado").val(ajuste_estado);
    $("#user_id").val(user_id);
    $("#user_name").val(encargado);
    //Tipo de ajuste
    if (tipo_ajuste == "POSITIVO") {
        document.getElementById("POSITIVO").checked = true;
    } else if (tipo_ajuste == "NEGATIVO") {
        document.getElementById("NEGATIVO").checked = true;
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

    var ajuste_estado = $("#ajuste_estado").val(); // Tomamos el valor actualizado
    console.log("Estado actual:", ajuste_estado);
    if (ajuste_estado === "PENDIENTE"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnAnular").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (ajuste_estado === "CONFIRMADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
        }
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "ajustes_cab/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    const datos = {
        id: $("#id").val(),
        empresa_id: $("#empresa_id").val(),
        sucursal_id: $("#sucursal_id").val(),
        deposito_id: $("#deposito_id").val(),
        user_id: $("#user_id").val(),
        tipo_ajuste: $("input[name='tipo_ajuste']:checked").val(),
        ajustes_motivos_id: $("#ajustes_motivos_id").val(),
        ajuste_fec: $("#txtFecha").val(),
        ajuste_estado: $("#ajuste_estado").val()
    };
    console.log("Datos que se envían al backend:", datos);
    
    if($("#txtOperacion").val()==2){
        endpoint = "ajustes_cab/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "ajustes_cab/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "ajustes_cab/confirmar/"+$("#id").val();
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
            'deposito_id': $("#deposito_id").val(),
            'user_id': $("#user_id").val(),
            'tipo_ajuste': $("input[name='tipo_ajuste']:checked").val(),
            'ajustes_motivos_id': $("#ajustes_motivos_id").val(),
            'ajuste_fec': $("#txtFecha").val(),
            'ajuste_estado': estado,
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
                if(resultado.registro.ajuste_estado!= "PENDIENTE"){
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
    var endpoint = "ajustes_det/create";
    var metodo = "POST";

    if($("#txtOperacionDetalle").val()==2){
        endpoint = "ajustes_det/update/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "ajustes_det/delete/"+$("#id").val()+"/"+$("#producto_id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "ajuste_id":$("#id").val(),
            "producto_id":$("#producto_id").val(),
            "ajuste_cant":$("#det_cantidad").val(),
            "ajuste_costo":$("#det_costo").val(),
            "item_id":$("#motivo").val()
        }
    })
    .done(function(respuesta) {
        listarDetalles();
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
    
    $("#btnAgregarDetalle").attr("Style","display:inline");
    $("#btnEditarDetalle").attr("Style","display:inline");
    $("#btnEliminarDetalle").attr("Style","display:inline");
    $("#btnGrabarDetalle").attr("Style","display:none");

    $("#txtOperacionDetalle").val(1);
    $("#prod_desc").val("");
    $("#det_cantidad").val("");
    $("#det_costo").val("");
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
    console.log("ID actual:", $("#id").val()); // Verifica el ID de nota de compra
    $.ajax({
        url: getUrl() + "ajustes_det/read/" + $("#id").val(),
        method: "GET",
        dataType: "json"
    })
    .done(function (resultado) {
        console.log("Detalles recibidos:", resultado);
        var lista = "";

        for (let rs of resultado) {
            // Aseguramos tipos numéricos
            let costo = Number(rs.ajuste_costo) || 0;
            let cantidad = Number(rs.ajuste_cant) || 0;
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

            lista += "<tr class=\"item-list\" onclick=\"seleccionDetalle(" + rs.producto_id + ",'" + (rs.prod_desc||'') + "'," + rs.ajuste_cant + "," + rs.ajuste_costo + ");\">";
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
        if ($("#ajuste_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
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
function seleccionDetalle(producto_id, prod_desc, ajuste_cant, ajuste_costo){
    $("#producto_id").val(producto_id);
    $("#prod_desc").val(prod_desc);
    $("#det_cantidad").val(ajuste_cant);
    $("#det_costo").val(ajuste_costo);
}

function buscarMotivos(){
    $.ajax({
        url:getUrl()+"ajuste_motivo/search",
        method:"POST",
        dataType: "json",
        data: {
            "ajus_mot_desc": $("#ajus_mot_desc").val()
        }
    })
    .done(function(resultado){
        console.log("Resultado recibido:", resultado);
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionMotivo("+rs.id+",'"+rs.ajus_mot_desc+"' );\">"+rs.ajus_mot_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaMotivos").html(lista);
        $("#listaMotivos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c) {
        alert(c);
        console.log(a.responseText);
    });
}
function seleccionMotivo(ajustes_motivos_id, ajus_mot_desc){
    console.log("Motivo seleccionado:", ajustes_motivos_id, ajus_mot_desc);
    $("#ajustes_motivos_id").val(ajustes_motivos_id);
    $("#ajus_mot_desc").val(ajus_mot_desc);

    $("#listaMotivos").html("");
    $("#listaMotivos").attr("style","display:none;");

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



