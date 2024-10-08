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
                title:'Listado de Funcionarios'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Funcionarios'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Funcionarios'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Funcionarios'
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
    $("#txtNombre").removeAttr("disabled");
    $("#txtApellido").removeAttr("disabled");
    $("#txtCedula").removeAttr("disabled");
    $("#txtDireccion").removeAttr("disabled");
    $("#txtTelefono").removeAttr("disabled");
    $("#txtFecNac").removeAttr("disabled");
    $("#txtFecIng").removeAttr("disabled");
    $("#txtFecBaj").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#cargo_descripcion").removeAttr("disabled");
    $("#user_login").removeAttr("disabled");
    $("#txtEstado").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#txtNombre").removeAttr("disabled");
    $("#txtApellido").removeAttr("disabled");
    $("#txtCedula").removeAttr("disabled");
    $("#txtDireccion").removeAttr("disabled");
    $("#txtTelefono").removeAttr("disabled");
    $("#txtFecNac").removeAttr("disabled");
    $("#txtFecIng").removeAttr("disabled");
    $("#txtFecBaj").removeAttr("disabled");
    $("#ciu_descripcion").removeAttr("disabled");
    $("#cargo_descripcion").removeAttr("disabled");
    $("#user_login").removeAttr("disabled");
    $("#txtEstado").removeAttr("disabled");

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
        url:getUrl()+"funcionario/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionFuncionario("+rs.id+",'"+rs.func_nombre+"','"+rs.func_apellido+"',"+rs.func_ci+",'"+rs.func_direc+"','"+rs.func_telef+"','"+rs.func_fec_nac+"','"+rs.func_fec_baja+"','"+rs.func_fec_ing+"','"+rs.func_estado+"',"+rs.ciudad_id+",'"+rs.ciudad_desc+"',"+rs.cargo_id+",'"+rs.cargo_desc+"',"+rs.user_id+",'"+rs.login+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_nombre;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_apellido;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_ci;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_direc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_telef;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_fec_nac;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_fec_ing;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_fec_baja;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ciudad_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cargo_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.login;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_estado;
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

function seleccionFuncionario(id_func, func_nombre, func_apellido, func_ci, func_direc, func_telef, func_fec_nac, func_fec_ing, func_fec_baj, ciu_id, ciu_descrip, cargo_id, cargo_descrip, user_id, user_login, func_estado){
    $("#txtCodigo").val(id_func);
    $("#txtNombre").val(func_nombre);
    $("#txtApellido").val(func_apellido);
    $("#txtCedula").val(func_ci);
    $("#txtDireccion").val(func_direc);
    $("#txtTelefono").val(func_telef);
    $("#txtFecNac").val(func_fec_nac);
    $("#txtFecIng").val(func_fec_ing);
    $("#txtFecBaj").val(func_fec_baj);
    $("#ciu_id").val(ciu_id);
    $("#ciu_descripcion").val(ciu_descrip);
    $("#cargo_id").val(cargo_id);
    $("#cargo_descripcion").val(cargo_descrip);
    $("#user_id").val(user_id);
    $("#user_login").val(user_login);
    $("#txtEstado").val(func_estado);

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "funcionario/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "funcionario/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "funcionario/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url: getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'func_nombre': $("#txtNombre").val(),
            'func_apellido': $("#txtApellido").val(),
            'func_ci': $("#txtCedula").val(),
            'func_direc': $("#txtDireccion").val(),
            'func_telef': $("#txtTelefono").val(),
            'func_fec_nac': $("#txtFecNac").val(),
            'func_fec_baja': $("#txtFecBaj").val(),
            'func_fec_ing': $("#txtFecIng").val(),
            'func_estado': $("#txtEstado").val(),
            'ciudad_id': $("#ciu_id").val(),
            'cargo_id': $("#cargo_id").val(), 
            'user_id': $("#user_id").val(),
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

function buscarCiudades(){
    $.ajax({
        url:getUrl()+"ciudade/search", 
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

function buscarCargos(){
    $.ajax({
        url:getUrl()+"cargo/search", 
        method:"POST",
        dataType: "json",
        data: {
            'cargo_desc': $("#cargo_descripcion").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCargo("+rs.id+",'"+rs.cargo_desc+"');\">"+rs.cargo_descrip+"</li>";
        }
        lista += "</ul>";
        $("#listaCargos").html(lista);
        $("#listaCargos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}
function seleccionCargo(cargo_id, cargo_descrip){
    $("#cargo_id").val(cargo_id);
    $("#cargo_descripcion").val(cargo_descrip);

    $("#listaCargos").html("");
    $("#listaCargos").attr("style","display:none;");
}

function buscarUsers(){
    $.ajax({
        url:getUrl()+"users/search", 
        method:"POST",
        dataType: "json",
        data: {
            'login': $("#user_login").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionLogin("+rs.id+",'"+rs.login+"');\">"+rs.user_login+"</li>";
        }
        lista += "</ul>";
        $("#listaUsuarios").html(lista);
        $("#listaUsuarios").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionLogin(user_id, user_login){
    $("#user_id").val(user_id);
    $("#user_login").val(user_login);

    $("#listaUsuarios").html("");
    $("#listaUsuarios").attr("style","display:none;");
}

