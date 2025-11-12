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
                title:'Listado de Sucursales'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Sucursales'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Sucursales'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Sucursales'
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
    $("#txtDescripcion").removeAttr("disabled");
    $("#txtDireccion").removeAttr("disabled");
    $("#txtTelefono").removeAttr("disabled");
    $("#txtEmail").removeAttr("disabled");
    $("#pais_descripcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#emp_descripcion").removeAttr("disabled");

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
    $("#txtDireccion").removeAttr("disabled");
    $("#txtTelefono").removeAttr("disabled");
    $("#txtEmail").removeAttr("disabled");
    $("#pais_descripcion").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#emp_descripcion").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/api_taller/sucursale/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionSucursal("+rs.id+",'"+rs.suc_desc+"','"+rs.suc_direc+"','"+rs.suc_telef+"','"+rs.suc_email+"',"+rs.pais_id+",'"+rs.pais_desc+"',"+rs.ciudad_id+",'"+rs.ciudad_desc+"',"+rs.empresa_id+",'"+rs.empresa_desc+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.suc_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.suc_direc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.suc_telef;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.suc_email;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pais_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ciudad_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_desc;
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

function seleccionSucursal(id_suc, suc_descripcion, suc_direccion, suc_telefono, suc_email, pais_id, pais_descripcion, ciu_id, ciu_descripcion, emp_id, emp_descripcion){
    $("#txtCodigo").val(id_suc);
    $("#txtDescripcion").val(suc_descripcion);
    $("#txtDireccion").val(suc_direccion);
    $("#txtTelefono").val(suc_telefono);
    $("#txtEmail").val(suc_email);
    $("#pais_id").val(pais_id);
    $("#pais_descripcion").val(pais_descripcion);
    $("#ciu_id").val(ciu_id);
    $("#ciu_descripcion").val(ciu_descripcion);
    $("#emp_id").val(emp_id);
    $("#emp_descripcion").val(emp_descripcion);

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "sucursale/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "sucursale/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "sucursale/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'suc_desc': $("#txtDescripcion").val(),
            'suc_direc': $("#txtDireccion").val(),
            'suc_telef': $("#txtTelefono").val(),
            'suc_email': $("#txtEmail").val(), 
            'pais_id': $("#pais_id").val(),
            'ciudad_id': $("#ciu_id").val(),
            'empresa_id': $("#emp_id").val(), 
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

function buscarEmpresas(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/empresa/search", 
        method:"POST",
        dataType: "json",
        data: {
            'empresa_desc': $("#emp_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionEmpresa("+rs.id+",'"+rs.empresa_desc+"');\">"+rs.emp_descripcion+"</li>";
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

function seleccionEmpresa(emp_id, emp_descripcion){
    $("#emp_id").val(emp_id);
    $("#emp_descripcion").val(emp_descripcion);

    $("#listaEmpresas").html("");
    $("#listaEmpresas").attr("style","display:none;");
}