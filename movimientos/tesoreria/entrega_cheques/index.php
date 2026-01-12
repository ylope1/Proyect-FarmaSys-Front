<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ENTREGA DE CHEQUES</title>
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
                            <h2>Registrar Entrega de Cheques <small>CRUD de Entrega de Cheques y sus detalles</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <input type="hidden" id="orden_pago_id" value="0">
                                <input type="hidden" id="mov_bancario_id" value="0">
                                <input type="hidden" value="1" id="user_id"/>
                                <input type="hidden" value="0" id="user_name"/>
                                <input type="hidden" id="pag_cheq_estado" value="REGISTRADO">
                                <!-- CAMPO PARA CODIGO CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- BUSCADOR ORDEN DE PAGO (CONFIRMADA) -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="orden_pago_buscar" class="form-control" disabled onkeyup="buscarOrdenesPago();">
                                            <label class="form-label">Orden de Pago</label>
                                        </div>
                                        <div id="listaOrdenesPago" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA EMPRESA CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="empresa_id" value="0"/>
                                            <input type="text" id="empresa_desc" class="form-control" disabled onkeyup="buscarEmpresas();">
                                            <label class="form-label">Empresa</label>
                                        </div>
                                        <div id="listaEmpresas" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA SUCURSAL CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="sucursal_id" value="0"/>
                                            <input type="text" id="suc_desc" class="form-control" disabled onkeyup="buscarSucursales();">
                                            <label class="form-label">Sucursal</label>
                                        </div>
                                        <div id="listaSucursales" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA BUSCAR PROVEEDOR CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="proveedor_id" value="0"/>
                                            <input type="text" id="proveedor_desc" class="form-control" disabled onkeyup="buscarProveedores();">
                                            <label class="form-label">Proveedor</label>
                                        </div>
                                        <div id="listaProveedores" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA CARGAR OBSERVACION CON 6 COLUMNAS -->
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="observacion" class="form-control" disabled>
                                            <label class="form-label">Observación</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="fecha_entrega" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha Entrega</label> 
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA MOSTRAR ESTADO CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="estado" class="form-control" disabled>
                                            <label class="form-label">Estado</label>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            <hr>
                            <h4>Datos del Cheque</h4>
                            <div class="row clearfix">
                                <!-- BUSCADOR CUENTA BANCARIA / TITULAR -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="cta_buscar" class="form-control" disabled onkeyup="buscarCtasTitulares();">
                                            <label class="form-label">Buscar Cuenta / Titular</label>
                                        </div>
                                        <div id="listaCtas" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA CUENTA BANCARIA -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="cta_bancaria_id">
                                            <input type="text" id="cta_banc_desc" class="form-control" disabled>
                                            <label class="form-label">Cuenta Bancaria</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA TITULAR -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="titular_id">
                                            <input type="text" id="titular_desc" class="form-control" disabled>
                                            <label class="form-label">Titular</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA CARGAR DE FORMA MANUAL NRO DE CHEQUE -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="mov_banc_nro_ref" class="form-control" disabled>
                                            <label class="form-label">Nro. Cheque</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="mov_banc_fec_emision" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fec. Emisión</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="mov_banc_fec_valor" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fec. Pago</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="mov_banc_monto" class="form-control" disabled>
                                            <label class="form-label">Monto</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <h4>Registro de Entrega</h4>
                            <div class="row clearfix">
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="retira_nombre" class="form-control" disabled>
                                            <label class="form-label">Recibido por</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="retira_ci" class="form-control" disabled>
                                            <label class="form-label">CI</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="retira_telefono" class="form-control" disabled>
                                            <label class="form-label">Teléfono</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-demo">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnAnular" class="btn btn-danger waves-effect" onclick="anular();"disabled>ANULAR</button>
                                <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();"disabled>CONFIRMAR</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button> 
                            </div>
                        </div>
            
                        <!-- CARD PARA LOS REGISTROS DE ORDENES DE PAGOS -->
                        <div class="card" id="registros">
                            <div class="header">
                                <h2>Registros de Entrega de Cheques</h2>
                            </div>
                            <div class="body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead>
                                            <tr style="background-color: #e6e6e6;">
                                                <th>Orden Pago</th>
                                                <th>Proveedor</th>
                                                <th>Nro Cheque</th>
                                                <th>Monto</th>
                                                <th>Fecha Entrega</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody"> </tbody>  
                                    </table>
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
