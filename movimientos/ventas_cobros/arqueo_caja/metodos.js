// INICIALIZACIÓN
$(document).ready(function () {
    buscarCajaAbiertaArqueo();
    campoFecha();
    calcularTotales();
    listarArqueos();
    setTimeout(() => {
        cargarTotalesNoEfectivo();
    }, 500);
});

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
                title:'Registro de Arqueos de Caja'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Registro de Arqueos de Caja'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Registro de Arqueos de Caja'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Registro de Arqueos de Caja'
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

// LISTAR ARQUEOS
function listarArqueos(){

    if ($.fn.DataTable && $.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().clear().destroy();
    }

    $.ajax({
        url: getUrl() + "arqueo_caja/read",
        method: "GET",
        dataType: "json",
        data: {
            user_id: $("#user_id").val()
        }
    })
    .done(function(resultado){

        let lista = "";

        for (let rs of resultado) {
            lista += `<tr onclick="seleccionArqueo(
                '${rs.id}',
                '${rs.arqueo_fec}',
                '${rs.arqueo_tipo}',
                '${rs.arqueo_monto_sistema}',
                '${rs.arqueo_monto}',
                '${rs.arqueo_diferencia}',
                '${rs.arqueo_estado}'
            )">
                <td>${rs.id}</td>
                <td>${rs.caja_desc}</td>
                <td>${rs.arqueo_fec}</td>
                <td>${rs.arqueo_tipo}</td>
                <td class="text-right">${rs.arqueo_monto_sistema}</td>
                <td class="text-right">${rs.arqueo_monto}</td>
                <td class="text-right">${rs.arqueo_diferencia}</td>
                <td>${rs.arqueo_estado}</td>
            </tr>`;
        }

        $("#tableBody").html(lista);
        formatoTabla();
    });
}
//seleccionar arqueo
function seleccionArqueo(
    id,
    arqueo_fec,
    arqueo_tipo,
    arqueo_monto_sistema,
    arqueo_monto,
    arqueo_diferencia,
    arqueo_estado
){
    $("#arqueo_id").val(id);

    // Solo informativo
    $("#arqueo_fec").val(arqueo_fec);
    $("input[name='arqueo_tipo'][value='" + arqueo_tipo + "']").prop("checked", true);
    $("#monto_sistema").val(arqueo_monto_sistema);
    $("#monto_arqueo").val(arqueo_monto);
    $("#diferencia").val(arqueo_diferencia);

    $("#btnConfirmarArqueo").attr("disabled", true);
    $("#btnAnularArqueo").attr("disabled", true);

    if (arqueo_estado === "REGISTRADO") {

        // Anular siempre que esté REGISTRADO
        $("#btnAnularArqueo").removeAttr("disabled");

        // Confirmar solo si es FINAL
        if (arqueo_tipo === "FINAL") {
            $("#btnConfirmarArqueo").removeAttr("disabled");
        }
    }

    $(".form-line").addClass("focused");
}

// BUSCAR CAJA ABIERTA PARA ARQUEO
function buscarCajaAbiertaArqueo(){

    $.ajax({
        url: getUrl() + "aperturas_cierres/buscar_caja_abierta",
        method: "GET",
        dataType: "json",
        data: {
            user_id: $("#user_id").val()
        }
    })
    .done(function(resp){

        if(!resp.abierta){
            swal("Atención",
                 "No existe una caja abierta para realizar el arqueo",
                 "warning");
            return;
        }

        // Cargar datos de la caja abierta
        $("#apertura_cierre_id").val(resp.apertura.id);
        $("#caja_desc").val("Caja ID: " + resp.apertura.caja_id);

        $(".form-line").addClass("focused");
    })
    .fail(function(e){
        console.log(e.responseText);
    });
}

// CALCULAR TOTALES
$(document).on("keyup change", ".cantidad", function () {
    calcularTotales();
});

function calcularTotales() {
    let totalGeneral = 0;

    $("#tablaDenominaciones tr").each(function () {
        let cantidad = parseFloat($(this).find(".cantidad").val()) || 0;
        let denominacion = parseFloat($(this).find(".denominacion").data("valor")) || 0;

        let totalFila = cantidad * denominacion;
        $(this).find(".total").text(totalFila.toLocaleString("es-ES"));

        totalGeneral += totalFila;
    });

    $("#totalGeneral").text(totalGeneral.toLocaleString("es-ES"));
}

//oBTENER TIPO DE ARQUEO
function obtenerTipoArqueo() {
    return $("input[name='arqueo_tipo']:checked").val();
}

// REGISTRAR ARQUEO
function registrarArqueo() {

    let montoArqueo = 0;
    $("#tablaDenominaciones .total").each(function () {
        let valor = parseFloat($(this).text().replace(/\./g, "").replace(",", ".")) || 0;
        montoArqueo += valor;
    });

    if (montoArqueo <= 0) {
        swal("Atención", "Debe ingresar al menos una denominación", "warning");
        return;
    }

    let tipoArqueo = obtenerTipoArqueo();

    swal({
        title: "REGISTRAR ARQUEO",
        text: "¿Desea registrar el arqueo de caja?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function () {

        $.ajax({
            url: getUrl() + "arqueo_caja/create",
            method: "POST",
            dataType: "json",
            data: {
                apertura_cierre_id: $("#apertura_cierre_id").val(),
                user_id: $("#user_id").val(),
                arqueo_fec: $("#arqueo_fec").val(),
                arqueo_tipo: tipoArqueo,
                arqueo_monto: montoArqueo
            }
        })
        .done(function (resp) {
             swal({
                title: "Correcto",
                text: resp.mensaje,
                type: "success"
            }, function () {
                console.log("Registro realizado:", resp);
                location.reload(true);
            })
        })
        .fail(function (a, b, c) {
            console.log(a.responseText);
            swal("Error", "No se pudo registrar el arqueo", "error");
        });

    });
}

// CONFIRMAR ARQUEO FINAL
function confirmarArqueo(){

    if ($("#arqueo_id").val() === "" || $("#arqueo_id").val() == 0) {
        swal("Atención", "Debe seleccionar un arqueo", "warning");
        return;
    }

    swal({
        title: "CONFIRMAR ARQUEO",
        text: "¿Desea confirmar el arqueo FINAL?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function(){

        $.ajax({
            url: getUrl() + "arqueo_caja/confirmar/" + $("#arqueo_id").val(),
            method: "PUT",
            dataType: "json"
        })
        .done(function(resp){
            swal({
                title: "Correcto",
                text: resp.mensaje,
                type: "success"
            }, function () {
                console.log("confirmacion realizado:", resp);
                $("#arqueo_id").val(0);
                location.reload(true);
            });
        })
        .fail(function(a,b,c){
            console.log(a.responseText);
            swal("Error", "No se pudo confirmar el arqueo", "error");
        });

    });
}

// ANULAR ARQUEO
function anularArqueo(){

    if ($("#arqueo_id").val() == 0 || $("#arqueo_id").val() === "") {
        swal("Atención", "Debe seleccionar un arqueo", "warning");
        return;
    }

    swal({
        title: "ANULAR ARQUEO",
        text: "¿Desea anular este arqueo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D32F2F",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function(){

        $.ajax({
            url: getUrl() + "arqueo_caja/anular/" + $("#arqueo_id").val(),
            method: "PUT",
            dataType: "json"
        })
        .done(function(resp){
            swal({
                title: "Correcto",
                text: resp.mensaje,
                type: "success"
            }, function () {
                console.log("Anulacion realizada:", resp);
                $("#arqueo_id").val(0);
                location.reload(true);
            });
        })
        .fail(function(a){
            console.log(a.responseText);
            swal("Error", "No se pudo anular el arqueo", "error");
        });

    });
}

function cargarTotalesNoEfectivo() {

    let aperturaId = $("#apertura_cierre_id").val();
    if (!aperturaId || aperturaId == 0) return;

    // CHEQUES
    $.ajax({
        url: getUrl() + "cobros_cab/total_cheques_apertura",
        method: "GET",
        dataType: "json",
        data: { apertura_cierre_id: aperturaId }
    })
    .done(function(resp){
        $("#totalCheques").text(
            Number(resp.total || 0).toLocaleString("es-ES")
        );
    });

    // TARJETAS
    $.ajax({
        url: getUrl() + "cobros_cab/total_tarjetas_apertura",
        method: "GET",
        dataType: "json",
        data: { apertura_cierre_id: aperturaId }
    })
    .done(function(resp){
        $("#totalTarjetas").text(
            Number(resp.total || 0).toLocaleString("es-ES")
        );
    });
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

// LIMPIAR ARQUEO
function limpiarArqueo() {
    $("#arqueo_id").val(0);
    $("#totalGeneral").text("0");
    $("#diferencia").val("");
    $(".cantidad").val(0);
    $(".total").text("0");
    $(".form-line").removeClass("focused");
}




