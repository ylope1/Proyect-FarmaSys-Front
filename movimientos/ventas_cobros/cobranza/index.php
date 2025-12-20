<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI REGISTRO DE COBROS</title>

    <link rel="icon" href="../../../favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Bootstrap -->
    <link href="../../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../../plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
    <link href="../../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../../../plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet" />
    <link href="../../../css/style.css" rel="stylesheet">
    <link href="../../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-blue">

    <?php require_once('../../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">

            <div class="col-md-12">

                <div class="card">
                    <div class="header">
                    <h2>Registrar Cobros <small>Registro de Cobros a Clientes</small></h2>
                </div>

                <div class="body">
                    <div class="row clearfix">
                        <input type="hidden" id="txtOperacion" value="0">
                        <input type="hidden" id="cobro_estado" value="REGISTRADO">
                        <input type="hidden" id="user_id" value="1">
                        <input type="hidden" id="apertura_cierre_id" value="0">
                        <input type="hidden" id="caja_id" value="0">

                        <!-- Código -->
                        <div class="col-sm-3">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" id="cobro_id" class="form-control" disabled>
                                    <label class="form-label">Código</label>
                                </div>
                            </div>
                        </div>
                        <!-- Fecha -->
                        <div class="col-sm-3">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" id="cobro_fecha" class="datetimepicker form-control" disabled>
                                    <label class="form-label">Fecha Cobro</label>
                                </div>
                            </div>
                        </div>
                        <!-- Cliente -->
                        <div class="col-sm-6">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="hidden" id="cliente_id" value="0">
                                    <input type="text" id="cliente_desc" class="form-control" disabled onkeyup="buscarClientes();">
                                    <label class="form-label">Cliente</label>
                                </div>
                                <div id="listaClientes" style="display:none;"></div>
                            </div>
                        </div>
                        <!-- Forma de Cobro (RADIOS) -->
                        <div class="col-sm-12">
                            <h2 class="card-inside-title" style="font-size:13px;">Forma de Cobro</h2>
                            <div class="demo-radio-button">
                                <input name="forma_cobro" type="radio" id="cobro_efectivo" value="2" disabled>
                                <label for="cobro_efectivo">Efectivo</label>

                                <input name="forma_cobro" type="radio" id="cobro_tarjeta" value="3" disabled>
                                <label for="cobro_tarjeta">Tarjeta</label>

                                <input name="forma_cobro" type="radio" id="cobro_cheque" value="4" disabled>
                                <label for="cobro_cheque">Cheque</label>
                            </div>
                        </div>
                        <!-- Botones -->
                        <div class="col-sm-12">
                            <div class="button-demo">
                                <button id="btnAgregar" class="btn btn-success" onclick="agregar();">AGREGAR</button>
                                <button id="btnEditar" class="btn btn-primary" onclick="editar();" disabled>EDITAR</button>
                                <button id="btnAnular" class="btn btn-danger" onclick="anular();" disabled>ANULAR</button>
                                <button id="btnConfirmar" class="btn btn-success" onclick="confirmar();" disabled>CONFIRMAR</button>
                                <button id="btnGrabar" class="btn btn-default" onclick="confirmarOperacion();" disabled>GRABAR</button>
                                <button id="btnCancelar" class="btn btn-warning" onclick="cancelar();" disabled>CANCELAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DETALLES -->
            <div class="card" id="detalles" style="display:none">
            <div class="header">
                <h2>Detalles del Cobro</h2>
            </div>

            <div class="body">
                <div class="row clearfix">
                    <input type="hidden" id="txtOperacionDetalle" value="0">
                    <!-- DOCUMENTOS-->
                    <div class="col-sm-4">
                        <div class="form-group form-float">
                            <div class="form-line">
                                <input type="text" id="cta_desc" class="form-control" disabled onkeyup="buscarCtasCobrar();">
                                <label class="form-label">Documento / Venta</label>
                            </div>
                            <div id="listaCtasCobrar" style="display:none;"></div>
                        </div>
                    </div>
                    <!-- MONTO-->
                    <div class="col-sm-3">
                        <div class="form-group form-float">
                            <div class="form-line">
                                <input type="text" id="monto_cobro" class="form-control" disabled>
                                <label class="form-label">Monto</label>
                            </div>
                        </div>
                    </div>
                    <!-- BOTONES -->
                    <div class="col-sm-3">
                        <div class="icon-button-demo">
                            <button id="btnAgregarDetalle" class="btn btn-primary" onclick="agregarDetalle();">
                                <i class="material-icons">add</i>
                            </button>
                            <button id="btnEliminarDetalle" class="btn btn-danger" onclick="eliminarDetalle();">
                                <i class="material-icons">clear</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Forma Cobro</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody id="tableDetalles"></tbody>
                        <tfoot>
                            <tr>
                                <th colspan="2">Total Cobrado</th>
                                <th id="totalCobrado">0</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

        <!-- REGISTROS -->
        <div class="card">
            <div class="header">
                <h2>Registros de Cobros</h2>
            </div>
                <div class="body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover js-exportable">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody"></tbody>
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
    <script src="../../../plugins/momentjs/moment.js"></script>
    <script src="../../../plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
    <script src="../../../plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="../../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="../../../js/admin.js"></script>
    <script src="../../../js/demo.js"></script>
    <script src="../../../js/ruta.js"></script>
    <script src="metodos.js"></script>

</body>
</html>
