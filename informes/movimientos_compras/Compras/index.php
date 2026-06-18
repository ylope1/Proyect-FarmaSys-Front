<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI INFORMES DE COMPRAS</title>
    <!-- Favicon-->
    <link rel="icon" href="../../../images/logo_miniatura.jpg" type="image/jpeg">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="../../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="../../../plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="../../../plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Bootstrap Material Datetime Picker Css -->
    <link href="../../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />

    <!-- Sweetalert Css -->
    <link href="../../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />

    <!-- JQuery DataTable Css -->
    <link href="../../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <!-- Custom Css -->
    <link href="../../../css/style.css" rel="stylesheet">

    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="../../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-blue">

    <?php require_once('../../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">
            
            <div class="row clearfix">

                <div class="col-md-12">
                    
                    <div class="card">
                        <div class="header">
                            <h2>Informes de Compras <small>Consulta y exportación por rango de fechas</small></h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <!-- CAMPO PARA SELECCIONAR TIPO DE INFORME CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #555;">Tipo de Informe</label>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="tipo_informe" class="form-control selectpicker">
                                                <option value="">-- Seleccione informe --</option>
                                                <option value="PEDIDOS_GENERAL">Informe general de pedidos</option>
                                                <option value="HOJA_PREPARACION">Hoja de preparación por pedido</option>
                                                <option value="PRESUPUESTOS_GENERAL">Informe general de presupuestos</option>
                                                <option value="HOJA_PRESUPUESTO">Hoja de presupuesto de compra</option>
                                                <option value="ORDENES_GENERAL">Informe general de órdenes de compras</option>
                                                <option value="HOJA_ORDEN">Hoja de orden de compra</option>
                                                <option value="COMPRAS_GENERAL">Informe general de compras</option>
                                                <option value="HOJA_COMPRA">Hoja de compra</option>
                                                <option value="NOTAS_COMPRAS_GENERAL">Informe general de notas de compras</option>
                                                <option value="HOJA_NOTA_COMPRA">Hoja de nota de compra</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- CAMPO PARA SELECCIONAR SUCURSAL CON 2 COLUMNAS -->
                                <div class="col-sm-2">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #555;">Sucursal</label>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="sucursal_id" class="form-control selectpicker">
                                                <option value="">TODAS</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- CAMPO PARA PROVEEDOR CON 2 COLUMNAS -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="proveedor_id" value="0"/>
                                            <input type="text" id="proveedor_desc" class="form-control" disabled onkeyup="buscarProveedores();">
                                            <label class="form-label">Proveedor</label>
                                        </div>
                                        <div id="listaProveedores" style="display:none;"></div>
                                    </div>
                                </div>

                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="fecha_desde" class="datepicker form-control">
                                            <label class="form-label">Fecha Desde</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="fecha_hasta" class="datepicker form-control">
                                            <label class="form-label">Fecha Hasta</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- CAMPO PARA SELECCIONAR ESTADO CON 2 COLUMNAS -->
                                <div class="col-sm-2">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #555;">Estado</label>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="estado" class="form-control selectpicker">
                                                <option value="PENDIENTE">PENDIENTE</option>
                                                <option value="CONFIRMADO">CONFIRMADO</option>
                                                <option value="RECIBIDO">RECIBIDO</option>
                                                <option value="APROBADO">APROBADO</option>
                                                <option value="RECHAZADO">RECHAZADO</option>
                                                <option value="ANULADO">ANULADO</option>
                                                <option value="PROCESADO">PROCESADO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-1" id="div_tipo_nota" style="display:none;">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #555;">
                                        Tipo Nota
                                    </label>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="tipo_nota" class="form-control selectpicker">
                                                <option value="TODOS">TODOS</option>
                                                <option value="NC">NC</option>
                                                <option value="ND">ND</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="documento_id" class="form-control">
                                            <label class="form-label">Nro. Documento</label>
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="col-md-12">
                                    <div class="button-demo" style="margin-top:25px;">
                                        <button type="button" id="btnConsultar" class="btn btn-primary waves-effect" onclick="consultarInforme();">
                                            CONSULTAR
                                        </button>

                                        <button type="button" id="btnImprimir" class="btn btn-success waves-effect" onclick="imprimirInforme();">
                                            IMPRIMIR
                                        </button>

                                        <button type="button" id="btnLimpiar" class="btn btn-warning waves-effect" onclick="limpiar();">
                                            LIMPIAR
                                        </button>

                                        <button type="button" id="btnSalir" class="btn btn-default waves-effect" onclick="salir();">
                                            SALIR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="cardInformeGeneral" style="display:none;">
                        <div class="header">
                            <h2>Informe General de Pedidos de Compra</h2>
                        </div>

                        <div class="body" id="areaInformeGeneral">
                            <div class="row clearfix">
                                <div class="col-sm-12 text-center">
                                    <h3>FARMASYS</h3>
                                    <h4>INFORME GENERAL DE PEDIDOS DE COMPRA</h4>
                                </div>
                            </div>

                            <hr>

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Fecha Desde:</b>
                                    <p id="inf_fecha_desde"></p>
                                </div>

                                <div class="col-sm-3">
                                    <b>Sucursal:</b>
                                    <p id="inf_sucursal"></p>
                                </div>

                                <div class="col-sm-3">
                                    <b>Fecha Hasta:</b>
                                    <p id="inf_fecha_hasta"></p>
                                </div>

                                <div class="col-sm-3">
                                    <b>Estado:</b>
                                    <p id="inf_estado"></p>
                                </div>

                                <div class="col-sm-3">
                                    <b>Generado por:</b>
                                    <p id="inf_usuario"></p>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover" id="tablaInformeGeneral">
                                    <thead>
                                        <tr style="background-color: #e6e6e6;">
                                            <th>Nro. Pedido</th>
                                            <th>Fecha</th>
                                            <th>Fecha Aprobación</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Funcionario</th>
                                            <th>Estado</th>
                                            <th>Ítems</th>
                                            <th>Total Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody 
                                        id="tableInformeGeneral">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="cardInformePresupuestos" style="display:none;">
                        <div class="header">
                            <h2>Informe General de Presupuestos de Compra</h2>
                        </div>

                        <div class="body" id="areaInformePresupuestos">
                            <div class="row clearfix">
                                <div class="col-sm-12 text-center">
                                    <h3>FARMASYS</h3>
                                    <h4>INFORME GENERAL DE PRESUPUESTOS DE COMPRA</h4>
                                </div>
                            </div>

                            <hr>

                            <div class="row clearfix">
                                <div class="col-sm-3"><b>Fecha Desde:</b><p id="pre_fecha_desde"></p></div>
                                <div class="col-sm-3"><b>Fecha Hasta:</b><p id="pre_fecha_hasta"></p></div>
                                <div class="col-sm-3"><b>Sucursal:</b><p id="pre_sucursal"></p></div>
                                <div class="col-sm-3"><b>Estado:</b><p id="pre_estado"></p></div>
                                <div class="col-sm-3"><b>Generado por:</b><p id="pre_usuario"></p></div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr style="background-color: #e6e6e6;">
                                            <th>Nro.</th>
                                            <th>Fecha</th>
                                            <th>Fecha Aprob.</th>
                                            <th>Proveedor</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Funcionario</th>
                                            <th>Pedido</th>
                                            <th>Estado</th>
                                            <th>Ítems</th>
                                            <th>Total Cant.</th>
                                            <th>Total Presupuesto</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableInformePresupuestos"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="cardInformeOrdenes" style="display:none;">
                        <div class="header">
                            <h2>Informe General de Órdenes de Compra</h2>
                        </div>

                        <div class="body" id="areaInformeOrdenes">

                            <div class="row clearfix">
                                <div class="col-sm-12 text-center">
                                    <h3>FARMASYS</h3>
                                    <h4>INFORME GENERAL DE ÓRDENES DE COMPRA</h4>
                                </div>
                            </div>

                            <hr>

                            <div class="row clearfix">
                                <div class="col-sm-3"><b>Fecha Desde:</b><p id="ord_fecha_desde"></p></div>
                                <div class="col-sm-3"><b>Fecha Hasta:</b><p id="ord_fecha_hasta"></p></div>
                                <div class="col-sm-3"><b>Sucursal:</b><p id="ord_sucursal"></p></div>
                                <div class="col-sm-3"><b>Estado:</b><p id="ord_estado"></p></div>
                                <div class="col-sm-3"><b>Generado por:</b><p id="ord_usuario"></p></div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">

                                    <thead>
                                        <tr style="background-color:#e6e6e6;">
                                            <th>Nro.</th>
                                            <th>Fecha</th>
                                            <th>Fecha Aprob.</th>
                                            <th>Proveedor</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Funcionario</th>
                                            <th>Tipo Fact.</th>
                                            <th>Estado</th>
                                            <th>Ítems</th>
                                            <th>Total Cant.</th>
                                            <th>Total Orden</th>
                                        </tr>
                                    </thead>

                                    <tbody id="tableInformeOrdenes">
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>

                    <div class="card" id="cardHojaPreparacion" style="display:none;">
                        <div class="header">
                            <h2>Hoja de Preparación de Pedido</h2>
                        </div>

                        <div class="body" id="areaHojaPreparacion">

                            <div class="row clearfix">
                                <div class="col-sm-12 text-center">
                                    <h3>FARMASYS</h3>
                                    <h4>HOJA DE PREPARACIÓN DE PEDIDO</h4>
                                </div>
                            </div>

                            <hr>

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Nro. Pedido:</b>
                                    <p id="prep_id"></p>
                                </div>

                                <div class="col-sm-3">
                                    <b>Fecha Pedido:</b>
                                    <p id="prep_fecha"></p>
                                </div>

                                <div class="col-sm-3">
                                    <b>Fecha Aprobación:</b>
                                    <p id="prep_fecha_aprob"></p>
                                </div>

                                <div class="col-sm-3">
                                    <b>Estado:</b>
                                    <p id="prep_estado"></p>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-4">
                                    <b>Empresa:</b>
                                    <p id="prep_empresa"></p>
                                </div>

                                <div class="col-sm-4">
                                    <b>Sucursal:</b>
                                    <p id="prep_sucursal"></p>
                                </div>

                                <div class="col-sm-4">
                                    <b>Funcionario:</b>
                                    <p id="prep_funcionario"></p>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr style="background-color: #e6e6e6;">
                                            <th>Cód. Producto</th>
                                            <th>Producto</th>
                                            <th>Cantidad Solicitada</th>
                                            <th>Verificado</th>
                                            <th>Observación</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableHojaPreparacion">

                                    </tbody>
                                </table>
                            </div>

                            <br><br>

                            <div class="row clearfix">
                                <div class="col-sm-6 text-center">
                                    _______________________________<br>
                                    Preparado por
                                </div>

                                <div class="col-sm-6 text-center">
                                    _______________________________<br>
                                    Recibido por
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="card" id="cardHojaPresupuesto" style="display:none;">
                        <div class="header">
                            <h2>Hoja de Presupuesto de Compra</h2>
                        </div>

                        <div class="body" id="areaHojaPresupuesto">
                            <div class="row clearfix">
                                <div class="col-sm-12 text-center">
                                    <h3>FARMASYS</h3>
                                    <h4>HOJA DE PRESUPUESTO DE COMPRA</h4>
                                </div>
                            </div>

                            <hr>

                            <div class="row clearfix">
                                <div class="col-sm-3"><b>Nro. Presupuesto:</b><p id="hp_id"></p></div>
                                <div class="col-sm-3"><b>Fecha Presupuesto:</b><p id="hp_fecha"></p></div>
                                <div class="col-sm-3"><b>Fecha Aprobación:</b><p id="hp_fecha_aprob"></p></div>
                                <div class="col-sm-3"><b>Estado:</b><p id="hp_estado"></p></div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-3"><b>Pedido Asociado:</b><p id="hp_pedido"></p></div>
                                <div class="col-sm-3"><b>Proveedor:</b><p id="hp_proveedor"></p></div>
                                <div class="col-sm-3"><b>Empresa:</b><p id="hp_empresa"></p></div>
                                <div class="col-sm-3"><b>Sucursal:</b><p id="hp_sucursal"></p></div>
                                <div class="col-sm-3"><b>Funcionario:</b><p id="hp_funcionario"></p></div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr style="background-color: #e6e6e6;">
                                            <th>Cód. Producto</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Costo</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableHojaPresupuesto"></tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="4" class="text-right">TOTAL</th>
                                            <th id="hp_total" class="text-right"></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <br><br>

                            <div class="row clearfix">
                                <div class="col-sm-6 text-center">
                                    _______________________________<br>
                                    Elaborado por
                                </div>

                                <div class="col-sm-6 text-center">
                                    _______________________________<br>
                                    Aprobado por
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="cardHojaOrden" style="display:none;">

                        <div class="header">
                            <h2>Hoja de Orden de Compra</h2>
                        </div>

                        <div class="body" id="areaHojaOrden">

                            <div class="row clearfix">
                                <div class="col-sm-12 text-center">
                                    <h3>FARMASYS</h3>
                                    <h4>HOJA DE ORDEN DE COMPRA</h4>
                                </div>
                            </div>

                            <hr>

                            <div class="row clearfix">
                                <div class="col-sm-3"><b>Nro. Orden:</b><p id="ho_id"></p></div>
                                <div class="col-sm-3"><b>Fecha Orden:</b><p id="ho_fecha"></p></div>
                                <div class="col-sm-3"><b>Fecha Aprobación:</b><p id="ho_fecha_aprob"></p></div>
                                <div class="col-sm-3"><b>Estado:</b><p id="ho_estado"></p></div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-3"><b>Pedido:</b><p id="ho_pedido"></p></div>
                                <div class="col-sm-3"><b>Presupuesto:</b><p id="ho_presupuesto"></p></div>
                                <div class="col-sm-3"><b>Proveedor:</b><p id="ho_proveedor"></p></div>
                                <div class="col-sm-3"><b>Condición:</b><p id="ho_tipo_fact"></p></div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-3"><b>Empresa:</b><p id="ho_empresa"></p></div>
                                <div class="col-sm-3"><b>Sucursal:</b><p id="ho_sucursal"></p></div>
                                <div class="col-sm-3"><b>Funcionario:</b><p id="ho_funcionario"></p></div>
                                <div class="col-sm-3"><b>IFV:</b><p id="ho_ifv"></p></div>
                            </div>

                            <div class="table-responsive">

                                <table class="table table-bordered table-striped table-hover">

                                    <thead>
                                        <tr style="background-color:#e6e6e6;">
                                            <th>Cód. Producto</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Costo</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>

                                    <tbody id="tableHojaOrden">
                                    </tbody>

                                    <tfoot>
                                        <tr>
                                            <th colspan="4" class="text-right">TOTAL</th>
                                            <th id="ho_total" class="text-right"></th>
                                        </tr>
                                    </tfoot>

                                </table>

                            </div>

                            <br><br>

                            <div class="row clearfix">

                                <div class="col-sm-6 text-center">
                                    _______________________________<br>
                                    Elaborado por
                                </div>

                                <div class="col-sm-6 text-center">
                                    _______________________________<br>
                                    Aprobado por
                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="card" id="cardInformeCompras" style="display:none;">
                        <div class="header">
                            <h2>INFORME GENERAL DE COMPRAS</h2>
                        </div>

                        <div class="body" id="areaInformeCompras">
                            <h3 class="text-center">INFORME GENERAL DE COMPRAS</h3>
                            <hr>

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Fecha Desde:</b>
                                    <p id="comp_fecha_desde"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Fecha Hasta:</b>
                                    <p id="comp_fecha_hasta"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Estado:</b>
                                    <p id="comp_estado"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Sucursal:</b>
                                    <p id="comp_sucursal"></p>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-6">
                                    <b>Usuario:</b>
                                    <p id="comp_usuario"></p>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nro.</th>
                                            <th>Fecha Factura</th>
                                            <th>Fecha Recepción</th>
                                            <th>Proveedor</th>
                                            <th>RUC</th>
                                            <th>Nro. Factura</th>
                                            <th>Timbrado</th>
                                            <th>Condición</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Depósito</th>
                                            <th>Usuario</th>
                                            <th>Estado</th>
                                            <th>Items</th>
                                            <th>Cantidad</th>
                                            <th>Exentas</th>
                                            <th>Grav. 5%</th>
                                            <th>IVA 5%</th>
                                            <th>Grav. 10%</th>
                                            <th>IVA 10%</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableInformeCompras"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="cardHojaCompra" style="display:none;">
                        <div class="header">
                            <h2>HOJA DE COMPRA</h2>
                        </div>

                        <div class="body" id="areaHojaCompra">
                            <h3 class="text-center">HOJA DE COMPRA</h3>
                            <hr>

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Nro. Compra:</b>
                                    <p id="hc_id"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Fecha Factura:</b>
                                    <p id="hc_fecha"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Fecha Recepción:</b>
                                    <p id="hc_fecha_recep"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Estado:</b>
                                    <p id="hc_estado"></p>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Orden Compra:</b>
                                    <p id="hc_orden"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Proveedor:</b>
                                    <p id="hc_proveedor"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>RUC:</b>
                                    <p id="hc_ruc"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Condición:</b>
                                    <p id="hc_tipo_fact"></p>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Nro. Factura:</b>
                                    <p id="hc_factura"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Timbrado:</b>
                                    <p id="hc_timbrado"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Cuotas:</b>
                                    <p id="hc_cuotas"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>IFV:</b>
                                    <p id="hc_ifv"></p>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Empresa:</b>
                                    <p id="hc_empresa"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Sucursal:</b>
                                    <p id="hc_sucursal"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Depósito:</b>
                                    <p id="hc_deposito"></p>
                                </div>
                                <div class="col-sm-3">
                                    <b>Usuario:</b>
                                    <p id="hc_funcionario"></p>
                                </div>
                            </div>

                            <br>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Cód.</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Costo</th>
                                            <th>Exentas</th>
                                            <th>5%</th>
                                            <th>10%</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableHojaCompra"></tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="4" class="text-right">Totales</th>
                                            <th class="text-right" id="hc_total_exentas">0</th>
                                            <th class="text-right" id="hc_total_grav_5">0</th>
                                            <th class="text-right" id="hc_total_grav_10">0</th>
                                            <th class="text-right" id="hc_total">0</th>
                                        </tr>
                                        <tr>
                                            <th colspan="4" class="text-right">Liquidación IVA</th>
                                            <th class="text-right">-</th>
                                            <th class="text-right">5%: <span id="hc_total_iva_5">0</span></th>
                                            <th class="text-right">10%: <span id="hc_total_iva_10">0</span></th>
                                            <th class="text-right">IVA Total: <span id="hc_total_iva">0</span></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card" id="cardInformeNotasCompras" style="display:none;">
                        <div class="header">
                            <h2>
                                INFORME GENERAL DE NOTAS DE COMPRAS
                            </h2>
                        </div>

                        <div class="body" id="areaInformeNotasCompras">

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Fecha Desde:</b>
                                    <label id="nc_fecha_desde"></label>
                                </div>

                                <div class="col-sm-3">
                                    <b>Fecha Hasta:</b>
                                    <label id="nc_fecha_hasta"></label>
                                </div>

                                <div class="col-sm-2">
                                    <b>Estado:</b>
                                    <label id="nc_estado"></label>
                                </div>

                                <div class="col-sm-2">
                                    <b>Sucursal:</b>
                                    <label id="nc_sucursal"></label>
                                </div>

                                <div class="col-sm-2">
                                    <b>Tipo Nota:</b>
                                    <label id="nc_tipo_nota"></label>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <b>Usuario:</b>
                                    <label id="nc_usuario"></label>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nro</th>
                                            <th>Fecha</th>
                                            <th>Tipo</th>
                                            <th>Factura</th>
                                            <th>Proveedor</th>
                                            <th>Condición</th>
                                            <th>Sucursal</th>
                                            <th>Estado</th>
                                            <th>Compra</th>
                                            <th>Items</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody id="tableInformeNotasCompras">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="cardHojaNotaCompra" style="display:none;">
                        <div class="header">
                            <h2>
                                HOJA DE NOTA DE COMPRA
                            </h2>
                        </div>

                        <div class="body" id="areaHojaNotaCompra">

                            <div class="row clearfix">
                                <div class="col-sm-2">
                                    <b>Nro Nota:</b>
                                    <label id="hnc_id"></label>
                                </div>

                                <div class="col-sm-3">
                                    <b>Fecha:</b>
                                    <label id="hnc_fecha"></label>
                                </div>

                                <div class="col-sm-2">
                                    <b>Estado:</b>
                                    <label id="hnc_estado"></label>
                                </div>

                                <div class="col-sm-2">
                                    <b>Tipo Nota:</b>
                                    <label id="hnc_tipo_nota"></label>
                                </div>

                                <div class="col-sm-3">
                                    <b>Condición:</b>
                                    <label id="hnc_tipo_fact"></label>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-4">
                                    <b>Proveedor:</b>
                                    <label id="hnc_proveedor"></label>
                                </div>

                                <div class="col-sm-2">
                                    <b>RUC:</b>
                                    <label id="hnc_ruc"></label>
                                </div>

                                <div class="col-sm-3">
                                    <b>Factura Nota:</b>
                                    <label id="hnc_factura"></label>
                                </div>

                                <div class="col-sm-3">
                                    <b>Timbrado:</b>
                                    <label id="hnc_timbrado"></label>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-2">
                                    <b>Compra Origen:</b>
                                    <label id="hnc_compra"></label>
                                </div>

                                <div class="col-sm-3">
                                    <b>Factura Compra:</b>
                                    <label id="hnc_compra_factura"></label>
                                </div>

                                <div class="col-sm-2">
                                    <b>Estado Compra:</b>
                                    <label id="hnc_compra_estado"></label>
                                </div>

                                <div class="col-sm-2">
                                    <b>Empresa:</b>
                                    <label id="hnc_empresa"></label>
                                </div>

                                <div class="col-sm-3">
                                    <b>Sucursal:</b>
                                    <label id="hnc_sucursal"></label>
                                </div>
                            </div>

                            <div class="row clearfix">
                                <div class="col-sm-3">
                                    <b>Depósito:</b>
                                    <label id="hnc_deposito"></label>
                                </div>

                                <div class="col-sm-3">
                                    <b>Funcionario:</b>
                                    <label id="hnc_funcionario"></label>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Cantidad</th>
                                            <th>Costo</th>
                                            <th>Exentas</th>
                                            <th>Grav.5%</th>
                                            <th>Grav.10%</th>
                                            <th>Subtotal</th>
                                            <th>Motivo</th>
                                        </tr>
                                    </thead>

                                    <tbody id="tableHojaNotaCompra">

                                    </tbody>

                                    <tfoot>
                                        <tr>
                                            <th colspan="4" class="text-right">Totales</th>
                                            <th id="hnc_total_exentas" class="text-right"></th>
                                            <th id="hnc_total_grav_5" class="text-right"></th>
                                            <th id="hnc_total_grav_10" class="text-right"></th>
                                            <th id="hnc_total" class="text-right"></th>
                                            <th></th>
                                        </tr>

                                        <tr>
                                            <th colspan="4" class="text-right">Liquidación IVA</th>
                                            <th class="text-right"></th>
                                            <th id="hnc_total_iva_5" class="text-right"></th>
                                            <th id="hnc_total_iva_10" class="text-right"></th>
                                            <th id="hnc_total_iva" class="text-right"></th>
                                            <th></th>
                                        </tr>
                                    </tfoot>

                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Jquery Core Js -->
    <script src="../../../plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="../../../plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Select Plugin Js -->
    <script src="../../../plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="../../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="../../../plugins/node-waves/waves.js"></script>

    <!-- SweetAlert Plugin Js -->
    <script src="../../../plugins/sweetalert/sweetalert.min.js"></script>

    <!-- Autosize Plugin Js -->
    <script src="../../../plugins/autosize/autosize.js"></script>

    <!-- Moment Plugin Js -->
    <script src="../../../plugins/momentjs/moment.js"></script>

    <!-- Bootstrap Material Datetime Picker Plugin Js -->
    <script src="../../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

    <!-- Jquery DataTable Plugin Js -->
    <script src="../../../plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="../../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="../../../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
    <script src="../../../plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
    <script src="../../../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
    <script src="../../../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
    <script src="../../../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
    <script src="../../../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
    <script src="../../../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

    <!-- Custom Js -->
    <script src="../../../js/admin.js"></script>

    <!-- Demo Js -->
    <script src="../../../js/demo.js"></script>

    <!-- Ruta Js (la url del backend o del api rest)-->
    <script src="../../../js/ruta.js"></script>

    <script src="../../../js/seguridad.js"></script>
    <script src="../../../js/menu_dinamico.js"></script>

    <script src="metodos.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            generarMenuDinamico("../../../");
        });
    </script>
</body>

</html>
