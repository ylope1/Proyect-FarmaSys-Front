listar();
function formatoTabla(){
    if ($.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().destroy();
    }
    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            {
                extend:'copy',
                text:'COPIAR',
                className:'btn btn-primary waves-effect',
                title:'Listado de Productos' 
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Productos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Productos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Productos'
            }
        ],
        iDisplayLength:5,
        language:{
            sSearch: 'Buscar:',
            sInfo: 'Mostrando resultado del _START_ al _END_ de un total de _TOTAL_ registros',
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

function agregar(){
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#txtDescripcion").removeAttr("disabled");
    $("#txtPrecio_comp").removeAttr("disabled");
    $("#txtPrecio_vent").removeAttr("disabled");
    $("#prov_descripcion").removeAttr("disabled");
    $("#item_descripcion").removeAttr("disabled");
    $("#imp_descripcion").removeAttr("disabled");


    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");    

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#txtDescripcion").removeAttr("disabled");
    $("#txtPrecio_comp").removeAttr("disabled");
    $("#txtPrecio_vent").removeAttr("disabled");
    $("#prov_descripcion").removeAttr("disabled");
    $("#item_descripcion").removeAttr("disabled");
    $("#imp_descripcion").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");    

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmarOperacion() {
    var oper= parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";
    
    if(oper===2){
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
        titulo = "ELIMINAR";
        pregunta = "¿DESEA ELIMINAR EL REGISTRO SELECCIONADO?";
    }
    swal({
        title: titulo,
        text: pregunta,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
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
        url:"http://127.0.0.1:8000/api_taller/producto/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionProducto("+rs.id+",'"+rs.prod_desc+"',"+rs.prod_precio_comp+","+rs.prod_precio_vent+","+rs.proveedor_id+",'"+rs.proveedor_desc+"',"+rs.item_id+",'"+rs.item_desc+"',"+rs.impuesto_id+",'"+rs.impuesto_desc+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prod_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prod_precio_comp;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prod_precio_vent;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.item_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.impuesto_desc;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    }) 
}

function seleccionProducto(codigo, descripcion, precio_comp, precio_vent, prov_id, prov_desc, item_id, item_descripcion, imp_id, imp_desc){
    $("#txtCodigo").val(codigo);
    $("#txtDescripcion").val(descripcion);
    $("#txtPrecio_comp").val(precio_comp);
    $("#txtPrecio_vent").val(precio_vent);
    $("#prov_id").val(prov_id);
    $("#prov_descripcion").val(prov_desc);
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#imp_id").val(imp_id);
    $("#imp_descripcion").val(imp_desc);
    
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "producto/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "producto/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "producto/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'prod_desc': $("#txtDescripcion").val(),
            'prod_precio_comp': $("#txtPrecio_comp").val(),
            'prod_precio_vent': $("#txtPrecio_vent").val(),
            'proveedor_id': $("#prov_id").val(),
            'item_id': $("#item_id").val(),
            'impuesto_id': $("#imp_id").val(),
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
                location.reload(true);
            }
        });
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function buscarProveedores(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/proveedore/search", 
        method:"POST",
        dataType: "json",
        data: {
            'proveedor_desc': $("#prov_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProveedor("+rs.id+",'"+rs.proveedor_desc+"');\">"+rs.prov_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaProveedores").html(lista);
        $("#listaProveedores").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionProveedor(prov_id, prov_desc){
    $("#prov_id").val(prov_id);
    $("#prov_descripcion").val(prov_desc);

    $("#listaProveedores").html("");
    $("#listaProveedores").attr("style","display:none;");
}

function buscarItems(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/item/search", 
        method:"POST",
        dataType: "json",
        data: {
            'item_desc': $("#item_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionItem("+rs.id+",'"+rs.item_desc+"');\">"+rs.item_descripcion+"</li>";
        }
        lista += "</ul>";
        $("#listaItems").html(lista);
        $("#listaItems").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionItem(item_id, item_descripcion){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);

    $("#listaItems").html("");
    $("#listaItems").attr("style","display:none;");
}

function buscarImpuestos(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/tipo_imp/search", 
        method:"POST",
        dataType: "json",
        data: {
            'impuesto_desc': $("#imp_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionImpuesto("+rs.id+",'"+rs.impuesto_desc+"');\">"+rs.imp_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaImpuestos").html(lista);
        $("#listaImpuestos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionImpuesto(imp_id, imp_desc){
    $("#imp_id").val(imp_id);
    $("#imp_descripcion").val(imp_desc);

    $("#listaImpuestos").html("");
    $("#listaImpuestos").attr("style","display:none;");
}
