// INICIALIZACIÓN
listar();
buscarCajaAbierta();

// FORMATO DATATABLE 
function formatoTabla(){
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            {
                extend:'copy',
                text:'COPIAR',
                className:'btn btn-primary waves-effect',
                title:'Registro de Aperturas y Cierres de Caja'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Registro de Aperturas y Cierres de Caja'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Registro de Aperturas y Cierres de Caja'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Registro de Aperturas y Cierres de Caja'
            }
        ],
        iDisplayLength: 5,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'No hay registros',
            oPaginate:{
                sNext: 'Siguiente',
                sPrevious: 'Anterior'
            }
        }
    });
}

// LISTAR APERTURAS / CIERRES 
function listar(){
    // destruir DataTable si ya existe
    if ($.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().clear().destroy();
    }
    $.ajax({
        url: getUrl() + "aperturas_cierres/read",
        method: "GET",
        dataType: "json",
        data: {
            user_id: $("#user_id").val()
        }
    })
    .done(function(resultado){
        var lista = "";

        for (rs of resultado) {
            lista += "<tr onclick=\"seleccionApertura(" +"'" + rs.id + "'," +"'" + rs.caja_desc + "'," +"'" + rs.apertura_fec + "'," +"'" + rs.apertura_monto + "'," +"'" + (rs.cierre_fec ?? '') + "'," +"'" + (rs.cierre_monto_sistema ?? 0) + "'," +"'" + (rs.cierre_monto_arqueo ?? 0) + "'," +"'" + (rs.cierre_diferencia ?? 0) + "'," +"'" + rs.estado + "'" +")\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.caja_desc + "</td>";
            lista += "<td>" + rs.apertura_fec + "</td>";
            lista += "<td class='text-right'>" + rs.apertura_monto + "</td>";
            lista += "<td>" + (rs.cierre_fec ?? '') + "</td>";
            lista += "<td class='text-right'>" + (rs.cierre_monto_sistema ?? '') + "</td>";
            lista += "<td class='text-right'>" + (rs.cierre_monto_arqueo ?? '') + "</td>";
            lista += "<td class='text-right'>" + (rs.cierre_diferencia ?? '') + "</td>";
            lista += "<td>" + rs.estado + "</td>";
            lista += "</tr>";
        }

        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        console.log(a.responseText);
        alert(c);
    });
}
function seleccionApertura(
    id,
    caja_desc,
    apertura_fec,
    apertura_monto,
    cierre_fec,
    cierre_monto_sistema,
    cierre_monto_arqueo,
    cierre_diferencia,
    estado
){
    $("#apertura_cierre_id").val(id);
    $("#caja_desc").val(caja_desc);
    $("#apertura_fec").val(apertura_fec);
    $("#apertura_monto").val(apertura_monto);
    $("#estado_caja").val(estado);

    // Cargar montos si ya existen
    $("#cierre_fec").val(cierre_fec);
    //$("#monto_sistema").val(cierre_monto_sistema);
    //$("#monto_arqueo").val(cierre_monto_arqueo);
    //$("#diferencia").val(cierre_diferencia);
    buscarArqueoFinal();

    if (estado === "ABIERTA") {
        $("#cardApertura").hide();
        $("#cardCierre").show();
    } else {
        $("#cardApertura").hide();
        $("#cardCierre").hide();
    }

    $(".form-line").addClass("focused");
}

// BUSCAR CAJA ABIERTA 
function buscarCajaAbierta(){
    $.ajax({
        url: getUrl() + "aperturas_cierres/buscar_caja_abierta",
        method: "GET",
        dataType: "json"
    })
    .done(function(resp){

        if (!resp.abierta) {
            // NO hay caja abierta
            $("#estado_caja").val("CERRADA");
            $("#cardApertura").show();
            $("#cardCierre").hide();
            limpiarEstadoCaja();

        } else {
            // HAY caja abierta
            $("#apertura_cierre_id").val(resp.id);
            $("#caja_desc").val(resp.apertura.caja_desc);
            $("#estado_caja").val(resp.apertura.estado);
            $("#apertura_fec").val(resp.apertura.apertura_fec);

            // monto sistema calculado en backend
            $("#monto_sistema").val(resp.cierre.monto_sistema);

            $("#cardApertura").hide();
            $("#cardCierre").show();
        }

        $(".form-line").addClass("focused");
    })
    .fail(function(a,b,c){
        console.log(a.responseText);
    });
}

// ABRIR CAJA 
function abrirCaja(){

    if ($("#apertura_monto").val() === "") {
        swal("Atención", "Debe ingresar el monto de apertura", "warning");
        return;
    }

    swal({
        title: "APERTURA DE CAJA",
        text: "¿Desea abrir la caja?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#458E49",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function(){

        $.ajax({
            url: getUrl() + "aperturas_cierres/abrir",
            method: "POST",
            dataType: "json",
            data: {
                user_id: $("#user_id").val(),
                apertura_monto: $("#apertura_monto").val()
            }
        })
        .done(function(resp){
            swal({
                title: "Correcto",
                text: resp.mensaje,
                type: "success"
            }, function () {

                $("#apertura_monto").val("");

                console.log("Registro obtenido:", resp);
                location.reload(true);
            })
        })
        .fail(function(a,b,c){
            console.log(a.responseText);
            swal("Error", "No se pudo abrir la caja", "error");
        });

    });
}

// CERRAR CAJA 
function cerrarCaja(){

    if ($("#monto_arqueo").val() === "") {
        swal("Atención", "Debe ingresar el monto del arqueo", "warning");
        return;
    }

    swal({
        title: "CIERRE DE CAJA",
        text: "¿Desea cerrar la caja?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D32F2F",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function(){

        $.ajax({
            url: getUrl() + "aperturas_cierres/cerrar",
            method: "POST",
            dataType: "json",
            data: {
                apertura_cierre_id: $("#apertura_cierre_id").val(),
                monto_arqueo: $("#monto_arqueo").val() //ver luego 
            }
        })
        .done(function(resp){
            swal({
                title: "Correcto",
                text: resp.mensaje,
                type: "success"
            }, function () {

                console.log("Cierre realizado:", resp);

                location.reload(true);

            });
        })
        .fail(function(a,b,c){
            console.log(a.responseText);
            swal("Error", "No se pudo cerrar la caja", "error");
        });

    });
}

//funcion buscar arqueo final
function buscarArqueoFinal(){

    let aperturaId = $("#apertura_cierre_id").val();

    if (!aperturaId || aperturaId == 0) {
        return;
    }

    $.ajax({
        url: getUrl() + "arqueo_caja/buscarArqueo",
        method: "POST",
        dataType: "json",
        data: {
            apertura_cierre_id: aperturaId
        }
    })
    .done(function(resp){

        if (!resp.existe) {
            swal({
                title: "Atención",
                text: "No existe arqueo FINAL confirmado",
                type: "warning"
            });
            return;
        }

        $("#monto_sistema").val(resp.monto_sistema);
        $("#monto_arqueo").val(resp.monto_arqueo);
        $("#diferencia").val(resp.diferencia);

        $(".form-line").addClass("focused");
    })
    .fail(function(a){
        console.log(a.responseText);
        swal({
            title: "Error",
            text: "No se pudo obtener el arqueo final",
            type: "error"
        });
    });
}


// CANCELAR CIERRE
function cancelarCierre(){
    $("#monto_arqueo").val("");
    $("#diferencia").val("");
    buscarCajaAbierta();
}

// LIMPIAR ESTADO DE CAJA
function limpiarEstadoCaja(){
    $("#apertura_cierre_id").val(0);
    $("#caja_desc").val("");
    $("#apertura_fec").val("");
    $("#cierre_fec").val("");
    $("#monto_sistema").val("");
    $("#monto_arqueo").val("");
    $("#diferencia").val("");
}
