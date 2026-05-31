var datosSesion = JSON.parse(sessionStorage.getItem("datosSesion"));
var usuarioLogueado = datosSesion ? datosSesion.user : null;
var token = datosSesion ? datosSesion.accessToken : null;

if (!datosSesion || !usuarioLogueado || !token) {
    swal("Sesión expirada", "Debe iniciar sesión nuevamente", "warning");
    setTimeout(function(){
        window.location.href = "../../../index.php";
    }, 1500);
} else {
    $.ajaxSetup({
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    campoFecha();
    cargarSucursales();
    validarCampos();
    controlarCampoDocumento();
}

function campoFecha(){
    $('.datepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    });
}

function convertirFechaBD(fecha){
    if(fecha === ""){
        return "";
    }

    var partes = fecha.split("/");

    return partes[2] + "-" + partes[1] + "-" + partes[0];
}

function consultarInforme(){
    var tipoInforme = $("#tipo_informe").val();

    if(tipoInforme === ""){
        swal("Atención", "Debe seleccionar un tipo de informe", "warning");
        return;
    }

    if(tipoInforme === "PEDIDOS_GENERAL"){
        consultarPedidosGeneral();
        return;
    }

    if(tipoInforme === "HOJA_PREPARACION"){
        if($("#documento_id").val() === ""){
            swal("Atención", "Debe ingresar el número de documento", "warning");
            return;
        }

        consultarHojaPreparacion();
        return;
    }

    if(tipoInforme === "PRESUPUESTOS_GENERAL"){
        consultarPresupuestosGeneral();
        return;
    }

    if(tipoInforme === "HOJA_PRESUPUESTO"){
        if($("#documento_id").val() === ""){
            swal("Atención", "Debe ingresar el número de presupuesto", "warning");
            return;
        }

        consultarHojaPresupuesto();
        return;
    }
}

function consultarPedidosGeneral(){
    if($("#fecha_desde").val() === "" || $("#fecha_hasta").val() === ""){
        swal("Atención", "Debe ingresar Fecha Desde y Fecha Hasta para generar el informe", "warning");
        return;
    }
    if(($("#fecha_desde").val() !== "" && $("#fecha_hasta").val() === "") ||($("#fecha_desde").val() === "" && $("#fecha_hasta").val() !== "")){
        swal("Atención", "Debe completar Fecha Desde y Fecha Hasta para filtrar por periodo", "warning");
        return;
    }
    if(convertirFechaBD($("#fecha_desde").val()) > convertirFechaBD($("#fecha_hasta").val())){
        swal("Atención", "La Fecha Desde no puede ser mayor a la Fecha Hasta", "warning");
        return;
    }
    $("#cardHojaPreparacion").attr("style","display:none;");
    $("#cardInformeGeneral").attr("style","display:block;");
    var sucursalTexto = $("#sucursal_id option:selected").text();

    $.ajax({
        url: getUrl()+"informes/compras/pedidos",
        method: "POST",
        dataType: "json",
        data: {
            fecha_desde: convertirFechaBD($("#fecha_desde").val()),
            fecha_hasta: convertirFechaBD($("#fecha_hasta").val()),
            estado: $("#estado").val(),
            empresa_id: "",
            sucursal_id: $("#sucursal_id").val()
        }
    })
    .done(function(resultado){
        var lista = "";

        $("#inf_fecha_desde").html($("#fecha_desde").val() === "" ? "TODOS" : $("#fecha_desde").val());
        $("#inf_fecha_hasta").html($("#fecha_hasta").val() === "" ? "TODOS" : $("#fecha_hasta").val());
        $("#inf_estado").html($("#estado").val() === "" ? "TODOS" : $("#estado").val());
        $("#inf_sucursal").html($("#sucursal_id").val() === "" ? "TODAS" : sucursalTexto);
        $("#inf_usuario").html(usuarioLogueado.name);

        for(rs of resultado){
            lista += "<tr>";
            lista += "<td>"+rs.id+"</td>";
            lista += "<td>"+rs.pedido_comp_fec+"</td>";
            lista += "<td>"+rs.pedido_comp_fec_aprob+"</td>";
            lista += "<td>"+rs.empresa_desc+"</td>";
            lista += "<td>"+rs.suc_desc+"</td>";
            lista += "<td>"+rs.encargado+"</td>";
            lista += "<td>"+rs.pedido_comp_estado+"</td>";
            lista += "<td>"+rs.cantidad_items+"</td>";
            lista += "<td>"+rs.total_cantidad+"</td>";
            lista += "</tr>";
        }

        $("#tableInformeGeneral").html(lista);
    })
    .fail(function(xhr, status, error){
        swal("Error", "No se pudo generar el informe general de pedidos", "error");
        console.log(xhr.responseText);
    });
}

function consultarPresupuestosGeneral(){
    if($("#fecha_desde").val() === "" || $("#fecha_hasta").val() === ""){
        swal("Atención", "Debe ingresar Fecha Desde y Fecha Hasta para generar el informe", "warning");
        return;
    }

    if(convertirFechaBD($("#fecha_desde").val()) > convertirFechaBD($("#fecha_hasta").val())){
        swal("Atención", "La Fecha Desde no puede ser mayor a la Fecha Hasta", "warning");
        return;
    }

    $("#cardInformeGeneral").attr("style","display:none;");
    $("#cardHojaPreparacion").attr("style","display:none;");
    $("#cardHojaPresupuesto").attr("style","display:none;");
    $("#cardInformePresupuestos").attr("style","display:block;");

    var sucursalTexto = $("#sucursal_id option:selected").text();

    $.ajax({
        url: getUrl()+"informes/compras/presupuestos",
        method: "POST",
        dataType: "json",
        data: {
            fecha_desde: convertirFechaBD($("#fecha_desde").val()),
            fecha_hasta: convertirFechaBD($("#fecha_hasta").val()),
            estado: $("#estado").val(),
            empresa_id: "",
            sucursal_id: $("#sucursal_id").val(),
            proveedor_id: $("#proveedor_id").val()
        }
    })
    .done(function(resultado){
        var lista = "";

        $("#pre_fecha_desde").html($("#fecha_desde").val());
        $("#pre_fecha_hasta").html($("#fecha_hasta").val());
        $("#pre_estado").html($("#estado").val() === "" ? "TODOS" : $("#estado").val());
        $("#pre_sucursal").html($("#sucursal_id").val() === "" ? "TODAS" : sucursalTexto);
        $("#pre_usuario").html(usuarioLogueado.name);

        for(rs of resultado){
            lista += "<tr>";
            lista += "<td>"+rs.id+"</td>";
            lista += "<td>"+rs.presup_comp_fec+"</td>";
            lista += "<td>"+rs.presup_comp_fec_aprob+"</td>";
            lista += "<td>"+rs.proveedor_desc+"</td>";
            lista += "<td>"+rs.empresa_desc+"</td>";
            lista += "<td>"+rs.suc_desc+"</td>";
            lista += "<td>"+rs.encargado+"</td>";
            lista += "<td>"+rs.pedido_comp_id+"</td>";
            lista += "<td>"+rs.presup_comp_estado+"</td>";
            lista += "<td>"+rs.cantidad_items+"</td>";
            lista += "<td>"+rs.total_cantidad+"</td>";
            lista += "<td class='text-right'>"+rs.total_presupuesto+"</td>";
            lista += "</tr>";
        }

        $("#tableInformePresupuestos").html(lista);
    })
    .fail(function(xhr, status, error){
        swal("Error", "No se pudo generar el informe general de presupuestos", "error");
        console.log(xhr.responseText);
    });
}

function consultarHojaPreparacion(){
    var pedidoId = $("#documento_id").val();

    if(pedidoId === ""){
        swal("Atención", "Debe ingresar el número de documento", "warning");
        return;
    }

    $("#cardInformeGeneral").attr("style","display:none;");
    $("#cardHojaPreparacion").attr("style","display:block;");

    $.ajax({
        url: getUrl()+"informes/compras/pedidos/preparacion/"+pedidoId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var cab = resultado.cabecera;
        var detalles = resultado.detalles;

        if(cab.pedido_comp_estado !== "CONFIRMADO"){
            swal("Atención", "Solo se puede imprimir la hoja de preparación de pedidos confirmados", "warning");

            $("#cardHojaPreparacion").attr("style","display:none;");
            $("#tableHojaPreparacion").html("");

            return;
        }

        $("#prep_id").html(cab.id);
        $("#prep_fecha").html(cab.pedido_comp_fec);
        $("#prep_fecha_aprob").html(cab.pedido_comp_fec_aprob);
        $("#prep_estado").html(cab.pedido_comp_estado);
        $("#prep_empresa").html(cab.empresa_desc);
        $("#prep_sucursal").html(cab.suc_desc);
        $("#prep_funcionario").html(cab.encargado);

        var lista = "";

        for(rs of detalles){
            lista += "<tr>";
            lista += "<td>"+rs.producto_id+"</td>";
            lista += "<td>"+rs.prod_desc+"</td>";
            lista += "<td>"+rs.pedido_comp_cant+"</td>";
            lista += "<td></td>";
            lista += "<td></td>";
            lista += "</tr>";
        }

        $("#tableHojaPreparacion").html(lista);
    })
    .fail(function(xhr, status, error){
        swal("Error", "No se pudo generar la hoja de preparación", "error");
        console.log(xhr.responseText);
    });
}

function consultarHojaPresupuesto(){
    var presupuestoId = $("#documento_id").val();

    if(presupuestoId === ""){
        swal("Atención", "Debe ingresar el número de presupuesto", "warning");
        return;
    }

    $("#cardInformeGeneral").attr("style","display:none;");
    $("#cardHojaPreparacion").attr("style","display:none;");
    $("#cardInformePresupuestos").attr("style","display:none;");
    $("#cardHojaPresupuesto").attr("style","display:block;");

    $.ajax({
        url: getUrl()+"informes/compras/presupuestos/hoja/"+presupuestoId,
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var cab = resultado.cabecera;
        var detalles = resultado.detalles;
        var total = 0;

        $("#hp_id").html(cab.id);
        $("#hp_fecha").html(cab.presup_comp_fec);
        $("#hp_fecha_aprob").html(cab.presup_comp_fec_aprob);
        $("#hp_estado").html(cab.presup_comp_estado);
        $("#hp_pedido").html(cab.pedido_comp_id);
        $("#hp_proveedor").html(cab.proveedor_desc);
        $("#hp_empresa").html(cab.empresa_desc);
        $("#hp_sucursal").html(cab.suc_desc);
        $("#hp_funcionario").html(cab.encargado);

        var lista = "";

        for(rs of detalles){
            total += parseFloat(rs.subtotal);

            lista += "<tr>";
            lista += "<td>"+rs.producto_id+"</td>";
            lista += "<td>"+rs.prod_desc+"</td>";
            lista += "<td>"+rs.presup_comp_cant+"</td>";
            lista += "<td class='text-right'>"+rs.presup_comp_costo+"</td>";
            lista += "<td class='text-right'>"+rs.subtotal+"</td>";
            lista += "</tr>";
        }

        $("#tableHojaPresupuesto").html(lista);
        $("#hp_total").html(total);
    })
    .fail(function(xhr, status, error){
        swal("Error", "No se pudo generar la hoja de presupuesto", "error");
        console.log(xhr.responseText);
    });
}

function imprimirInforme(){
    var tipoInforme = $("#tipo_informe").val();

    if(tipoInforme === ""){
        swal("Atención", "Debe seleccionar y consultar un informe antes de imprimir", "warning");
        return;
    }

    if(tipoInforme === "PEDIDOS_GENERAL"){
        imprimirAreaInforme("areaInformeGeneral", "Informe General de Pedidos de Compra");
        return;
    }

    if(tipoInforme === "HOJA_PREPARACION"){
        imprimirAreaInforme("areaHojaPreparacion", "Hoja de Preparación de Pedido");
        return;
    }

     if(tipoInforme === "PRESUPUESTOS_GENERAL"){
        imprimirAreaInforme("areaInformePresupuestos", "Informe General de Presupuestos de Compra");
        return;
    }

    if(tipoInforme === "HOJA_PRESUPUESTO"){
        imprimirAreaInforme("areaHojaPresupuesto", "Hoja de Presupuesto de Compra");
        return;
    }
}

function limpiar(){
    location.reload(true);
}

function salir(){
    swal({
        title: "Salir",
        text: "¿Desea salir de la ventana de informes de compras?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: true
    }, function () {
        window.location.href = "../../../menu.php";
    });
}

function imprimirAreaInforme(idArea, titulo){
    var contenido = document.getElementById(idArea).innerHTML;

    if(contenido.trim() === ""){
        swal("Atención", "Debe consultar un informe antes de imprimir", "warning");
        return;
    }

    var ventana = window.open("", "_blank");

    ventana.document.write(`
        <html>
        <head>
            <title>${titulo}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 12px;
                    color: #000;
                    margin: 30px;
                }

                h3, h4 {
                    text-align: center;
                    margin: 3px;
                }

                hr {
                    border: 0;
                    border-top: 1px solid #000;
                    margin: 15px 0;
                }

                .row {
                    width: 100%;
                    display: table;
                    margin-bottom: 8px;
                }

                .col-sm-3 {
                    width: 25%;
                    display: table-cell;
                    vertical-align: top;
                }

                .col-sm-4 {
                    width: 33.33%;
                    display: table-cell;
                    vertical-align: top;
                }

                .col-sm-6 {
                    width: 50%;
                    display: table-cell;
                    vertical-align: top;
                }

                .col-sm-12 {
                    width: 100%;
                    display: block;
                }

                .text-center {
                    text-align: center;
                }

                p {
                    margin: 3px 0 8px 0;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                }

                table th, table td {
                    border: 1px solid #000;
                    padding: 6px;
                    text-align: left;
                }

                table th {
                    background: #e6e6e6;
                    font-weight: bold;
                }

                @media print {
                    body {
                        margin: 20px;
                    }
                }
            </style>
        </head>
        <body>
            ${contenido}
        </body>
        </html>
    `);

    ventana.document.close();

    ventana.onload = function(){
        ventana.focus();
        ventana.print();
    };
}

function cargarSucursales(){
    $.ajax({
        url: getUrl()+"sucursale/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<option value=''>TODAS</option>";

        for(rs of resultado){
            lista += "<option value='"+rs.id+"'>"+rs.suc_desc+"</option>";
        }

        $("#sucursal_id").html(lista);
        $("#sucursal_id").selectpicker("refresh");
    })
    .fail(function(xhr, status, error){
        swal("Error", "No se pudieron cargar las sucursales", "error");
        console.log(xhr.responseText);
    });
}

function validarCampos(){
    $("#documento_id").on("keypress", function(e){
        var tecla = e.which || e.keyCode;

        if(tecla < 48 || tecla > 57){
            e.preventDefault();
        }
    });

    $("#documento_id").on("paste", function(e){
        e.preventDefault();
    });
}

function controlarCampoDocumento(){
    var tipoInforme = $("#tipo_informe").val();

    $("#cardInformeGeneral").attr("style","display:none;");
    $("#cardHojaPreparacion").attr("style","display:none;");
    $("#cardInformePresupuestos").attr("style","display:none;");
    $("#cardHojaPresupuesto").attr("style","display:none;");

    if(tipoInforme === "HOJA_PREPARACION" || tipoInforme === "HOJA_PRESUPUESTO"){
        $("#documento_id").removeAttr("disabled");
    }else{
        $("#documento_id").val("");
        $("#documento_id").attr("disabled","true");
    }

    if(tipoInforme === "PRESUPUESTOS_GENERAL"){
        $("#proveedor_desc").removeAttr("disabled");
    }else{
        $("#proveedor_id").val("");
        $("#proveedor_desc").val("");
        $("#proveedor_desc").attr("disabled","true");
        $("#listaProveedores").html("");
        $("#listaProveedores").attr("style","display:none;");
    }

    $(".form-line").attr("class","form-line focused");
}