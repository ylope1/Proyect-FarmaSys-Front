// INICIALIZACIÓN
$(document).ready(function () {
    calcularTotales();
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

    // destruir DataTable si ya existe
    if ($.fn.DataTable.isDataTable('.js-exportable')) {
        $('.js-exportable').DataTable().clear().destroy();
    }

    $.ajax({
        url: getUrl() + "arqueo_caja/read",
        method: "GET",
        dataType: "json",
        data: {
            apertura_cierre_id: $("#apertura_cierre_id").val()
        }
    })
    .done(function(resultado){

        let lista = "";

        for (let rs of resultado) {

            lista += "<tr onclick=\"seleccionArqueo(" +
                "'" + rs.id + "'," +
                "'" + rs.arqueo_fec + "'," +
                "'" + rs.arqueo_tipo + "'," +
                "'" + rs.arqueo_monto_sistema + "'," +
                "'" + rs.arqueo_monto + "'," +
                "'" + rs.arqueo_diferencia + "'," +
                "'" + rs.arqueo_estado + "'" +
            ")\">";

            lista += "<td>" + rs.id + "</td>";
            lista += "<td>" + rs.arqueo_fec + "</td>";
            lista += "<td>" + rs.arqueo_tipo + "</td>";
            lista += "<td class='text-right'>" + rs.arqueo_monto_sistema + "</td>";
            lista += "<td class='text-right'>" + rs.arqueo_monto + "</td>";
            lista += "<td class='text-right'>" + rs.arqueo_diferencia + "</td>";
            lista += "<td>" + rs.arqueo_estado + "</td>";
            lista += "</tr>";
        }

        $("#tableBodyArqueos").html(lista);
        formatoTabla();

    })
    .fail(function(a,b,c){
        console.log(a.responseText);
        swal("Error", "No se pudo listar los arqueos", "error");
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
    $("#arqueo_fec").val(arqueo_fec);
    $("#monto_sistema").val(arqueo_monto_sistema);
    $("#monto_arqueo").val(arqueo_monto);
    $("#diferencia").val(arqueo_diferencia);
    $("#arqueo_estado").val(arqueo_estado);

    // Habilitar confirmar solo si corresponde
    if (arqueo_tipo === "FINAL" && arqueo_estado === "REGISTRADO") {
        $("#btnConfirmarArqueo").removeAttr("disabled");
    } else {
        $("#btnConfirmarArqueo").attr("disabled","true");
    }

    $(".form-line").addClass("focused");
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

// =======================
// REGISTRAR ARQUEO
// =======================
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
            swal("Correcto", resp.mensaje, "success", function () {
                location.reload(true);
            });
        })
        .fail(function (a, b, c) {
            console.log(a.responseText);
            swal("Error", "No se pudo registrar el arqueo", "error");
        });

    });
}

// =======================
// CONFIRMAR ARQUEO FINAL
// =======================
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
            swal("Correcto", resp.mensaje, "success", function(){
                listarArqueos();
            });
        })
        .fail(function(a,b,c){
            console.log(a.responseText);
            swal("Error", "No se pudo confirmar el arqueo", "error");
        });

    });
}

// LIMPIAR ARQUEO
function limpiarArqueo() {
    $(".cantidad").val(0);
    $(".total").text("0");
    $("#totalGeneral").text("0");
}




