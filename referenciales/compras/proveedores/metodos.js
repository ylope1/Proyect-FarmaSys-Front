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
                title:'Listado de Proveedores' 
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Proveedores'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Proveedores'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Proveedores'
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
    $("#txtRuc").removeAttr("disabled");
    $("#txtTipo").removeAttr("disabled");
    $("#txtDireccion").removeAttr("disabled");
    $("#txtTelefono").removeAttr("disabled");
    $("#txtEmail").removeAttr("disabled");
    $("#pais_descripcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");


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
    $("#txtRuc").removeAttr("disabled");
    $("#txtTipo").removeAttr("disabled");
    $("#txtDireccion").removeAttr("disabled");
    $("#txtTelefono").removeAttr("disabled");
    $("#txtEmail").removeAttr("disabled");
    $("#pais_descripcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/api_taller/proveedore/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionProveedor("+rs.id+",'"+rs.proveedor_desc+"','"+rs.proveedor_ruc+"','"+rs.proveedor_tipo+"','"+rs.proveedor_direc+"','"+rs.proveedor_telef+"','"+rs.proveedor_email+"',"+rs.pais_id+",'"+rs.pais_desc+"',"+rs.ciudad_id+",'"+rs.ciudad_desc+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_ruc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_tipo;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_direc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_telef;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.proveedor_email;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pais_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ciudad_desc;
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

function seleccionProveedor(codigo, descripcion, ruc, tipo, direccion, telefono, email, pais_id, pais_descripcion, ciu_id, ciu_descripcion){
    $("#txtCodigo").val(codigo);
    $("#txtDescripcion").val(descripcion);
    $("#txtRuc").val(ruc);
    $("#txtTipo").val(tipo);
    $("#txtDireccion").val(direccion);
    $("#txtTelefono").val(telefono);
    $("#txtEmail").val(email);
    $("#pais_id").val(pais_id);
    $("#pais_descripcion").val(pais_descripcion);
    $("#ciu_id").val(ciu_id);
    $("#ciu_descripcion").val(ciu_descripcion);
    
    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "proveedore/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "proveedore/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "proveedore/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'proveedor_desc': $("#txtDescripcion").val(),
            'proveedor_ruc': $("#txtRuc").val(),
            'proveedor_tipo': $("#txtTipo").val(),
            'proveedor_direc': $("#txtDireccion").val(),
            'proveedor_telef': $("#txtTelefono").val(),
            'proveedor_email': $("#txtEmail").val(),
            'pais_id': $("#pais_id").val(), 
            'ciudad_id': $("#ciu_id").val(),
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
function buscarPaises(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/paises/search", 
        method:"POST",
        dataType: "json",
        data: {
            'pais_desc': $("#pais_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPais("+rs.id+",'"+rs.pais_desc+"');\">"+rs.pais_descripcion+"</li>";
        }
        lista += "</ul>";
        $("#listaPaises").html(lista);
        $("#listaPaises").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionPais(pais_id, pais_descripcion){
    $("#pais_id").val(pais_id);
    $("#pais_descripcion").val(pais_descripcion);

    $("#listaPaises").html("");
    $("#listaPaises").attr("style","display:none;");
}

function buscarCiudades(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/ciudade/search", 
        method:"POST",
        dataType: "json",
        data: {
            'ciudad_desc': $("#ciu_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCiudad("+rs.id+",'"+rs.ciudad_desc+"');\">"+rs.ciu_descripcion+"</li>";
        }
        lista += "</ul>";
        $("#listaCiudades").html(lista);
        $("#listaCiudades").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionCiudad(ciu_id, ciu_descripcion){
    $("#ciu_id").val(ciu_id);
    $("#ciu_descripcion").val(ciu_descripcion);

    $("#listaCiudades").html("");
    $("#listaCiudades").attr("style","display:none;");
}