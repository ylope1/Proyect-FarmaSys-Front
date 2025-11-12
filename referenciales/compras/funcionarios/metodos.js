listar();
campoFecha();
inicializarSelectPickers();
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
    $("#txtEmail").removeAttr("disabled");
    $("#pais_desc").removeAttr("disabled");
    $("#ciudad_desc").removeAttr("disabled");
    $("#txtFecNac").removeAttr("disabled");
    $("#txtFecBaj").removeAttr("disabled");
    $("#txtFecIng").removeAttr("disabled");
    $("#txtEstado").removeAttr("disabled");
    $('#txtEstado').selectpicker('refresh');
    $("#cargo_desc").removeAttr("disabled");
    $("#login").removeAttr("disabled");

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
    $("#txtEmail").removeAttr("disabled");
    $("#pais_desc").removeAttr("disabled");
    $("#ciudad_desc").removeAttr("disabled");
    $("#txtFecNac").removeAttr("disabled");
    $("#txtFecBaj").removeAttr("disabled");
    $("#txtFecIng").removeAttr("disabled");

    // --- PARA EL CAMPO ESTADO ---
    $("#txtEstado").removeAttr("disabled");
    if (typeof $ !== "undefined" && typeof $('#txtEstado').selectpicker === "function") {
        $('#txtEstado').selectpicker('refresh');
    }
    $("#cargo_desc").removeAttr("disabled");
    $("#login").removeAttr("disabled");

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
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionFuncionario("+rs.id+",'"+rs.pers_nombre+"','"+rs.pers_apellido+"',"+rs.pers_ci+",'"+rs.pers_direc+"','"+rs.pers_telef+"','"+rs.pers_email+"',"+rs.pais_id+",'"+rs.pais_desc+"',"+rs.ciudad_id+",'"+rs.ciudad_desc+"','"+rs.func_fec_nac+"','"+rs.func_fec_baja+"','"+rs.func_fec_ing+"','"+rs.func_estado+"',"+rs.cargo_id+",'"+rs.cargo_desc+"',"+rs.user_id+",'"+rs.login+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pers_nombre;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pers_apellido;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pers_ci;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pers_direc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pers_telef;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pers_email;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pais_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ciudad_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_fec_nac;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_fec_baja;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_fec_ing;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.func_estado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cargo_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.login;
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

function seleccionFuncionario(id_func, pers_nombre, pers_apellido, pers_ci, pers_direc, pers_telef, pers_email, pais_id, pais_desc, ciudad_id, ciudad_desc, func_fec_nac, func_fec_baj, func_fec_ing, func_estado, cargo_id, cargo_desc, user_id, login){
    $("#txtCodigo").val(id_func);
    $("#txtNombre").val(pers_nombre);
    $("#txtApellido").val(pers_apellido);
    $("#txtCedula").val(pers_ci);
    $("#txtDireccion").val(pers_direc);
    $("#txtTelefono").val(pers_telef);
    $("#txtEmail").val(pers_email);
    $("#pais_id").val(pais_id);
    $("#pais_desc").val(pais_desc);
    $("#ciudad_id").val(ciudad_id);
    $("#ciudad_desc").val(ciudad_desc);
    $("#txtFecNac").val(func_fec_nac);
    $("#txtFecBaj").val(func_fec_baj);
    $("#txtFecIng").val(func_fec_ing);
    // --- MANEJO DEL SELECTPICKER ---
    $("#txtEstado").val(func_estado);
    if (typeof $ !== "undefined" && typeof $('#txtEstado').selectpicker === "function") {
        $('#txtEstado').selectpicker('refresh');
    }
    $("#cargo_id").val(cargo_id);
    $("#cargo_desc").val(cargo_desc);
    $("#user_id").val(user_id);
    $("#login").val(login);

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
    // DEBUG: Verificar valores antes de enviar
    console.log("=== DEBUG ENVÍO DE DATOS ===");
    console.log("cargo_id:", $("#cargo_id").val());
    console.log("user_id:", $("#user_id").val());
    console.log("pais_id:", $("#pais_id").val());
    console.log("ciudad_id:", $("#ciudad_id").val());
    console.log("Operación:", $("#txtOperacion").val());
    $.ajax({
        url: getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'pers_nombre': $("#txtNombre").val(),
            'pers_apellido': $("#txtApellido").val(),
            'pers_ci': $("#txtCedula").val(),
            'pers_direc': $("#txtDireccion").val(),
            'pers_telef': $("#txtTelefono").val(),
            'pers_email': $("#txtEmail").val(),
            'pais_id': $("#pais_id").val(),
            'ciudad_id': $("#ciudad_id").val(),
            'func_fec_nac': $("#txtFecNac").val(),
            'func_fec_baja': $("#txtFecBaj").val(),
            'func_fec_ing': $("#txtFecIng").val(),
            'func_estado': $("#txtEstado").val(),
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
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error completo:", jqXHR.responseText);
        
        let errorMessage = "Error al guardar los datos";
        
        if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
            errorMessage = jqXHR.responseJSON.message;
        } else if (jqXHR.responseText) {
            errorMessage = "Error del servidor: " + jqXHR.responseText.substring(0, 100);
        }
        
        swal("Error", errorMessage, "error");
    });
}
function buscarPaises(){
    $.ajax({
        url:getUrl()+"paises/buscar", 
        method:"POST",
        dataType: "json",
        data: {
            'pais_desc': $("#pais_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPais("+rs.id+",'"+rs.pais_desc+"');\">"+rs.pais_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaPaises").html(lista);
        $("#listaPaises").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error completo:", jqXHR.responseText);
        
        let errorMessage = "Error al buscar Paises";
        
        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
            errorMessage = jqXHR.responseJSON.error;
        } else if (jqXHR.responseText) {
            errorMessage = "Error del servidor: " + jqXHR.responseText.substring(0, 100);
        } else {
            errorMessage = "Error de conexión: " + textStatus;
        }
        
        // Usando tu SweetAlert existente
        swal("Error", errorMessage, "error");
    });
}
function seleccionPais(pais_id, pais_desc){
    $("#pais_id").val(pais_id);
    $("#pais_desc").val(pais_desc);

    $("#listaPaises").html("");
    $("#listaPaises").attr("style","display:none;");
}
function buscarCiudades(){
    $.ajax({
        url:getUrl()+"ciudade/search", 
        method:"POST",
        dataType: "json",
        data: {
            'ciudad_desc': $("#ciudad_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCiudad("+rs.id+",'"+rs.ciudad_desc+"');\">"+rs.ciudad_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaCiudades").html(lista);
        $("#listaCiudades").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error completo:", jqXHR.responseText);
        
        let errorMessage = "Error al buscar Ciudades";
        
        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
            errorMessage = jqXHR.responseJSON.error;
        } else if (jqXHR.responseText) {
            errorMessage = "Error del servidor: " + jqXHR.responseText.substring(0, 100);
        } else {
            errorMessage = "Error de conexión: " + textStatus;
        }
        // Usando tu SweetAlert existente
        swal("Error", errorMessage, "error");
    });
}
function seleccionCiudad(ciudad_id, ciudad_desc){
    $("#ciudad_id").val(ciudad_id);
    $("#ciudad_desc").val(ciudad_desc);

    $("#listaCiudades").html("");
    $("#listaCiudades").attr("style","display:none;");
}

function buscarCargos(){
    $.ajax({
        url:getUrl()+"cargo/search", 
        method:"POST",
        dataType: "json",
        data: {
            'cargo_desc': $("#cargo_desc").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCargo("+rs.id+",'"+rs.cargo_desc+"');\">"+rs.cargo_desc+"</li>";
        }
        lista += "</ul>";
        $("#listaCargos").html(lista);
        $("#listaCargos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error completo:", jqXHR.responseText);
        
        let errorMessage = "Error al buscar Cargos";
        
        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
            errorMessage = jqXHR.responseJSON.error;
        } else if (jqXHR.responseText) {
            errorMessage = "Error del servidor: " + jqXHR.responseText.substring(0, 100);
        } else {
            errorMessage = "Error de conexión: " + textStatus;
        }
        // Usando tu SweetAlert existente
        swal("Error", errorMessage, "error");
    });
}
function seleccionCargo(cargo_id, cargo_desc){
    $("#cargo_id").val(cargo_id);
    $("#cargo_desc").val(cargo_desc);

    $("#listaCargos").html("");
    $("#listaCargos").attr("style","display:none;");
}

function buscarUsers(){
    $.ajax({
        url:getUrl()+"users/search", 
        method:"POST",
        dataType: "json",
        data: {
            'login': $("#login").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionLogin("+rs.id+",'"+rs.login+"');\">"+rs.login+"</li>";
        }
        lista += "</ul>";
        $("#listaUsuarios").html(lista);
        $("#listaUsuarios").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error completo:", jqXHR.responseText);
        
        let errorMessage = "Error al buscar Users";
        
        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
            errorMessage = jqXHR.responseJSON.error;
        } else if (jqXHR.responseText) {
            errorMessage = "Error del servidor: " + jqXHR.responseText.substring(0, 100);
        } else {
            errorMessage = "Error de conexión: " + textStatus;
        }
        // Usando tu SweetAlert existente
        swal("Error", errorMessage, "error");
    });
}

function seleccionLogin(user_id, login){
    $("#user_id").val(user_id);
    $("#login").val(login);

    $("#listaUsuarios").html("");
    $("#listaUsuarios").attr("style","display:none;");
}
function campoFecha(){
    // Inicializar cada datepicker por su ID único
    $('#datepicker_nacimiento').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
        language: 'es'
    });
    
    /*$('#datepicker_baja').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
        language: 'es'
    });*/
    
    $('#datepicker_ingreso').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
        language: 'es'
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
