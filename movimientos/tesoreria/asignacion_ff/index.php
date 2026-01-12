<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ASIGNACIÓN FONDO FIJO</title>
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
                            <h2>Registrar Asignación Fondo Fijo <small>CRUD de Asignación de Fondo Fijo y sus responsables</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <input type="hidden" value="1" id="user_id"/>
                                <input type="hidden" value="0" id="user_name"/>
                                <input type="hidden" value="GENERADO" id="asignacion_ff_estado"/>
                                <!-- CAMPO PARA CODIGO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA EMPRESA CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="empresa_id" value="0"/>
                                            <input type="text" id="empresa_desc" class="form-control" disabled onkeyup="buscarEmpresas();">
                                            <label class="form-label">Empresa</label>
                                        </div>
                                        <div id="listaEmpresas" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA SUCURSAL CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="sucursal_id" value="0"/>
                                            <input type="text" id="suc_desc" class="form-control" disabled onkeyup="buscarSucursales();">
                                            <label class="form-label">Sucursal</label>
                                        </div>
                                        <div id="listaSucursales" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA PROVEEDOR (RESPONSABLE) CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="proveedor_id" value="0"/>
                                            <input type="text" id="proveedor_desc" class="form-control" disabled onkeyup="buscarProveedores();">
                                            <label class="form-label">Responsable</label>
                                        </div>
                                        <div id="listaProveedores" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA ASIGNACIÓN CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="asignacion_ff_fecha" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha Asignación</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA MONTO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="asignacion_ff_monto" class="form-control" disabled>
                                            <label class="form-label">Monto Fondo Fijo</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA OBSERVACIÓN CON 6 COLUMNAS -->
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="asignacion_ff_obs" class="form-control" disabled>
                                            <label class="form-label">Observación</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12">
                                    <div class="button-demo">
                                        <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                        <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();" disabled>CONFIRMAR</button>
                                        <button type="button" id="btnInactivar" class="btn btn-warning waves-effect" onclick="inactivar();" disabled>INACTIVAR</button>
                                        <button type="button" id="btnActivar" class="btn btn-primary waves-effect" onclick="activar();" disabled>ACTIVAR</button>
                                        <button type="button" id="btnCerrar" class="btn btn-danger waves-effect" onclick="cerrar();" disabled>CERRAR</button>
                                        <button type="button" id="btnGrabar" class="btn btn-default waves-effect" onclick="confirmarOperacion();" disabled>GRABAR</button>
                                        <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>
                                    </div>
                                </div>
                            </div>
                        </div>
 
                        <div class="card" id="registros">
                            <div class="header">
                                <h2>Registros de Asignaciones de Fondo Fijo</h2>
                            </div>
                            <div class="body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead>
                                            <tr style="background-color: #e6e6e6;">
                                                <th>Código</th>
                                                <th>Empresa</th>
                                                <th>Sucursal</th>
                                                <th>Responsable</th>
                                                <th>Monto</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                                <th>Usuario</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody">
                                            
                                        </tbody>
                                        <tfoot>
                                            <tr style="background-color: #e6e6e6;">
                                                <th>Código</th>
                                                <th>Empresa</th>
                                                <th>Sucursal</th>
                                                <th>Responsable</th>
                                                <th>Monto</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                                <th>Usuario</th>
                                            </tr>
                                        </tfoot>    
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
