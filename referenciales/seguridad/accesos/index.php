<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ACCESOS</title>
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
    
    <?php require_once('../../../opciones.php')?>    

    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <h2>MANTENER ACCESOS</h2>
            </div>

            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h2>Mantener datos de Accesos <small>CRUD de Accesos</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" id="txtOperacion" value="0">
                                <!--CAMPO PARA CODIGO CON 2 COLUMNAS-->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtCodigo" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
                                <!--CAMPO PARA MÓDULO CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="txtModulo" class="form-control selectpicker" disabled >
                                                <option value="">-- Selecciona Módulo --</option>
                                            </select>
                                            <label class="form-label" style="top: -20px; font-size: 12px;">Módulo</label>
                                        </div>
                                    </div>
                                </div>
                                <!--CAMPO PARA DESCRIPCIÓN CON 6 COLUMNAS-->
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtDescripcion" class="form-control" disabled maxlength="50">
                                            <label class="form-label">Descripción</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <!--CAMPO PARA RUTA CON 6 COLUMNAS-->
                                    <div class="col-sm-7">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="txtRuta" class="form-control" disabled maxlength="255">
                                                <label class="form-label">Ruta</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!--CAMPO PARA ORDEN CON 2 COLUMNAS-->
                                    <div class="col-sm-2">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="txtOrden" class="form-control" disabled min="0" value="0">
                                                <label class="form-label">Orden</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!--CAMPO PARA ESTADO CON 3 COLUMNAS-->
                                    <div class="col-sm-3">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <select id="txtEstado" class="form-control selectpicker" disabled>
                                                    <option value="">-- Selecciona Estado --</option>
                                                    <option value="ACTIVO">ACTIVO</option>
                                                    <option value="INACTIVO">INACTIVO</option>
                                                </select>
                                                <label class="form-label" style="top: -20px; font-size: 12px;">Estado</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="button-demo" style="margin-top: 20px;">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();">MODIFICAR</button>
                                <button type="button" id="btnAnular" class="btn btn-danger waves-effect" onclick="anular();">ANULAR</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>
                                <button type="button" id="btnSalir" class="btn btn-default waves-effect" onclick="salir();">SALIR</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="header">
                            <h2>Registros de Accesos</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-border table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Módulo</th>
                                            <th>Descripción</th>
                                            <th>Ruta</th>
                                            <th>Orden</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Módulo</th>
                                            <th>Descripción</th>
                                            <th>Ruta</th>
                                            <th>Orden</th>
                                            <th>Estado</th>
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
    <!--<script src="../../../js/pages/tables/jquery-datatable.js"></script -->

    <!-- Demo Js -->
    <script src="../../../js/demo.js"></script>

    <!-- Ruta Js -->
    <script src="../../../js/ruta.js"></script>

    <!-- Metodo Js -->
    <script src="metodos.js"></script>

</body>

</html>
