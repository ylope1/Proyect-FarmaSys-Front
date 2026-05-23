<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI INFORMES DE COMPRAS</title>
    <!-- Favicon-->
    <link rel="icon" href="../../../favicon.ico" type="image/x-icon">

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
                                <div class="col-sm-3">
                                    <label>Tipo de Informe</label>
                                    <select id="tipo_informe" class="form-control show-tick">
                                        <option value="">-- Seleccione informe --</option>
                                        <option value="PEDIDOS_GENERAL">Informe general de pedidos</option>
                                        <option value="HOJA_PREPARACION">Hoja de preparación por pedido</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label>Sucursal</label>
                                    <select id="sucursal_id" class="form-control show-tick">
                                        <option value="">TODAS</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="fecha_desde" class="datepicker form-control">
                                            <label class="form-label">Fecha Desde</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="fecha_hasta" class="datepicker form-control">
                                            <label class="form-label">Fecha Hasta</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <label>Estado</label>
                                    <select id="estado" class="form-control show-tick">
                                        <option value="CONFIRMADO">CONFIRMADO</option>
                                    </select>
                                </div>

                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="pedido_id" class="form-control">
                                            <label class="form-label">Nro. Pedido</label>
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

    <script src="metodos.js"></script>
</body>

</html>
