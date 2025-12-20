<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ARQUEO DE CAJA</title>

    <link rel="icon" href="../../../favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Bootstrap Core Css -->
    <link href="../../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
    <link href="../../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../../plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet" />

    <!-- Custom Css -->
    <link href="../../../css/style.css" rel="stylesheet">
    <link href="../../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-blue">

    <?php require_once('../../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">

            <!-- ================= ENCABEZADO ================= -->
            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h2>Arqueo de Caja <small>Registro y verificación de arqueo</small></h2>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= DATOS GENERALES ================= -->
            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="card">
                        <div class="body">

                            <input type="hidden" id="user_id" value="1">
                            <input type="hidden" id="apertura_cierre_id" value="0">
                            <input type="hidden" id="arqueo_id" value="0">
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
                                            <input type="text" id="arqueo_fec" class="datetimepicker form-control">
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

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= DENOMINACIONES ================= -->
            <div class="row clearfix">
                <div class="col-md-12">
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
                </div>
            </div>
            <!-- ================= BOTONES ================= -->
            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="card">
                        <div class="body">

                            <button type="button" class="btn btn-success waves-effect"
                                    onclick="registrarArqueo();">
                                <i class="material-icons">save</i> REGISTRAR
                            </button>

                            <button type="button" class="btn btn-info waves-effect"
                                    id="btnConfirmarArqueo"
                                    onclick="confirmarArqueo();"
                                    disabled>
                                <i class="material-icons">check_circle</i> CONFIRMAR
                            </button>

                            <button type="button" class="btn btn-danger waves-effect"
                                    id="btnAnularArqueo"
                                    onclick="anularArqueo();"
                                    disabled>
                                <i class="material-icons">cancel</i> ANULAR
                            </button>

                            <button type="button" class="btn btn-warning waves-effect"
                                    onclick="location.reload(true);">
                                <i class="material-icons">refresh</i> CANCELAR
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ================= LISTADO DE ARQUEOS ================= -->
        <div class="row clearfix">
            <div class="col-md-12">
                <div class="card">
                    <div class="header">
                        <h2>Listado de Arqueos</h2>
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead>
                                    <tr style="background-color:#e6e6e6;">
                                        <th>ID</th>
                                        <th>Caja</th>
                                        <th>Fecha</th>
                                        <th>Tipo</th>
                                        <th>Monto Sistema</th>
                                        <th>Monto Arqueo</th>
                                        <th>Diferencia</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- JS -->
    <script src="../../../plugins/jquery/jquery.min.js"></script>
    <script src="../../../plugins/bootstrap/js/bootstrap.js"></script>
    <script src="../../../plugins/bootstrap-select/js/bootstrap-select.js"></script>
    <script src="../../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
    <script src="../../../plugins/node-waves/waves.js"></script>
    <script src="../../../plugins/sweetalert/sweetalert.min.js"></script>
    <script src="../../../plugins/autosize/autosize.js"></script>
    <script src="../../../plugins/momentjs/moment.js"></script>
    <script src="../../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>

    <script src="../../../js/admin.js"></script>
    <script src="../../../js/demo.js"></script>
    <script src="../../../js/ruta.js"></script>

    <script src="metodos.js"></script>

</body>
</html>
