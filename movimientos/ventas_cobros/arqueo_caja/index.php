<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ARQUEO DE CAJA</title>
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

    <!-- Bootstrap Select Css -->
    <link href="../../../plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet" />

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
                            <h2>Arqueo de Caja <small>Registro y verificación de arqueo</small></h2>
                        </div>
                        <div class="body">
                            <input type="hidden" id="user_id" value="1">
                            <input type="hidden" id="apertura_cierre_id" value="0">

                            <div class="row clearfix">

                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="caja_desc" class="form-control" disabled>
                                            <label class="form-label">Caja</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="arqueo_fec" class="form-control datetimepicker">
                                            <label class="form-label">Fecha Arqueo</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <label class="card-inside-title">Tipo de Arqueo</label>
                                    <div class="demo-radio-button">
                                        <input name="arqueo_tipo" type="radio" id="verificacion" value="VERIFICACION" checked />
                                        <label for="verificacion">Verificación</label>

                                        <input name="arqueo_tipo" type="radio" id="final" value="FINAL" />
                                        <label for="final">Final</label>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="header">
                                        <h2>Detalle de Denominaciones</h2>
                                    </div>
                                    <div class="body">

                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <thead>
                                                    <tr style="background-color:#e6e6e6;">
                                                        <th>Cantidad</th>
                                                        <th>Denominación</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tablaDenominaciones">

                                                    <!-- Repetimos filas -->
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="100000">100.000</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="50000">50.000</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="20000">20.000</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="10000">10.000</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="5000">5.000</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="2000">2.000</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="1000">1.000</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="500">500</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="100">100</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="number" class="form-control cantidad" value="0"></td>
                                                        <td class="denominacion" data-valor="50">50</td>
                                                        <td class="total text-right">0</td>
                                                    </tr>

                                                </tbody>
                                                <tfoot>
                                                    <tr style="background-color:#f5f5f5;">
                                                        <th colspan="2" class="text-right">TOTAL GENERAL</th>
                                                        <th class="text-right" id="totalGeneral">0</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                                <div class="card">
                                    <div class="body">
                                        <button type="button" class="btn btn-success waves-effect" onclick="registrarArqueo();">
                                            <i class="material-icons">save</i> REGISTRAR
                                        </button>

                                        <button type="button" class="btn btn-warning waves-effect" onclick="location.reload(true);">
                                            <i class="material-icons">refresh</i> CANCELAR
                                        </button>
                                    </div>
                                </div>
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
