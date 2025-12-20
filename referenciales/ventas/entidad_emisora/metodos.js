listar();
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
                title:'Listado de Entidades Emisoras'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Entidades Emisoras'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Entidades Emisoras'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Entidades Emisoras'
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
    $("#txtEstado").removeAttr("disabled");
    $('#txtEstado').selectpicker('refresh');

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
    // --- PARA EL CAMPO ESTADO ---
    $("#txtEstado").removeAttr("disabled");
    if (typeof $ !== "undefined" && typeof $('#txtEstado').selectpicker === "function") {
        $('#txtEstado').selectpicker('refresh');
    }

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
        url:"http://127.0.0.1:8000/api_taller/entidades_emisoras/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionEntidadesEmisoras("+rs.id+",'"+rs.ent_emi_desc+"','"+rs.ent_emi_direc+"','"+rs.ent_emi_telef+"','"+rs.ent_emi_email+"','"+rs.ent_emi_estado+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ent_emi_desc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ent_emi_direc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ent_emi_telef;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ent_emi_email;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ent_emi_estado;
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

function seleccionEntidadesEmisoras(ent_emi_id, ent_emi_desc, ent_emi_direc, ent_emi_telef, ent_emi_email,ent_emi_estado){
    $("#txtCodigo").val(ent_emi_id);
    $("#txtDescripcion").val(ent_emi_desc);
    $("#txtDireccion").val(ent_emi_direc);
    $("#txtTelefono").val(ent_emi_telef);
    $("#txtEmail").val(ent_emi_email);
    // --- MANEJO DEL SELECTPICKER ---
    $("#txtEstado").val(ent_emi_estado);
    if (typeof $ !== "undefined" && typeof $('#txtEstado').selectpicker === "function") {
        $('#txtEstado').selectpicker('refresh');
    }

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "entidades_emisoras/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "entidades_emisoras/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "entidades_emisoras/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'ent_emi_desc': $("#txtDescripcion").val(),
            'ent_emi_direc': $("#txtDireccion").val(),
            'ent_emi_telef': $("#txtTelefono").val(),
            'ent_emi_email': $("#txtEmail").val(),
            'ent_emi_estado': $("#txtEstado").val(), 
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

function inicializarSelectPickers() {
    if (typeof $.fn.selectpicker !== 'undefined') {
        $('.selectpicker').selectpicker();
        console.log('SelectPickers inicializados');
    } else {
        console.warn('Bootstrap Select no está cargado');
    }
}