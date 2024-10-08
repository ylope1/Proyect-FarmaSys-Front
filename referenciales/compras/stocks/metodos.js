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
                title:'Listado de Stock'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Stocks'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Stocks'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Stocks'
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

function agregar(){
    $("#txtOperacion").val(1);
    $("#txtCodigo").val(0);
    $("#deposito_descrip").removeAttr("disabled");
    $("#prod_descrip").removeAttr("disabled");
    $("#txtCantExis").removeAttr("disabled");
    $("#txtCantMin").removeAttr("disabled");
    $("#txtCantMax").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#deposito_descrip").removeAttr("disabled");
    $("#prod_descrip").removeAttr("disabled");
    $("#txtCantExis").removeAttr("disabled");
    $("#txtCantMin").removeAttr("disabled");
    $("#txtCantMax").removeAttr("disabled");

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
    var oper = parseInt($("#txtOperacion").val());
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
        url:getUrl()+"stock/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionStock("+rs.id+","+rs.stock_cant_exist+","+rs.stock_cant_min+","+rs.stock_cant_max+","+rs.deposito_id+",'"+rs.deposito_desc+"',"+rs.producto_id+",'"+rs.prod_desc+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.deposito_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prod_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.stock_cant_exist;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.stock_cant_min;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.stock_cant_max;
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

function seleccionStock(id_stock, dep_id, dep_descrip, prod_id, prod_descrip, stock_cant, stock_cant_min, stock_cant_max){
    $("#txtCodigo").val(id_stock);
    $("#deposito_id").val(dep_id);
    $("#deposito_descrip").val(dep_descrip);
    $("#prod_id").val(prod_id);
    $("#prod_descrip").val(prod_descrip);
    $("#txtCantExis").val(stock_cant);
    $("#txtCantMin").val(stock_cant_min);
    $("#txtCantMax").val(stock_cant_max);

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "stock/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "stock/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "stock/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'stock_cant_exist': $("#txtCantExis").val(),
            'stock_cant_min': $("#txtCantMin").val(),
            'stock_cant_max': $("#txtCantMax").val(),
            'deposito_id': $("#deposito_id").val(), 
            'producto_id': $("#prod_id").val(),
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

function buscarDepositos(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/deposito/search", 
        method:"POST",
        dataType: "json",
        data: {
            'deposito_desc': $("#deposito_descrip").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionDeposito("+rs.id+",'"+rs.deposito_desc+"');\">"+rs.dep_descrip+"</li>";
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

function seleccionDeposito(dep_id, dep_descrip){
    $("#deposito_id").val(dep_id);
    $("#deposito_descrip").val(dep_descrip);

    $("#listaDepositos").html("");
    $("#listaDepositos").attr("style","display:none;");
}

function buscarProductos(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/producto/search", 
        method:"POST",
        dataType: "json",
        data: {
            'prod_desc': $("#prod_descrip").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("+rs.id+",'"+rs.prod_desc+"');\">"+rs.prod_descrip+"</li>";
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionProducto(prod_id, prod_descrip){
    $("#prod_id").val(prod_id);
    $("#prod_descrip").val(prod_descrip);

    $("#listaProductos").html("");
    $("#listaProductos").attr("style","display:none;");
}
