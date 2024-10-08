﻿<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI EMPRESAS</title>
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
                <h2>MANTENER EMPRESAS</h2>
            </div>

            <div class="row clearfix">

                <div class="col-md-12">
                    
                    <div class="card">
                        <div class="header">
                            <h2>Mantener datos de Empresas <small>CRUD de Empresas</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <!--CAMPO PARA CODIGO CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtCodigo" class="form-control" disabled>
                                            <label class="form-label ">Código</label>
                                        </div>
                                    </div>
                                </div>
                                <!--CAMPO PARA DESCRIPCION CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtDescripcion" class="form-control" disabled>
                                            <label class="form-label ">Descripción</label>
                                        </div>
                                    </div>
                                </div>
                                 <!--CAMPO PARA RUC CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtRuc" class="form-control" disabled>
                                            <label class="form-label ">Ruc</label>
                                        </div>
                                    </div>
                                </div>
                                <!--CAMPO PARA DIRECCION CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtDireccion" class="form-control" disabled>
                                            <label class="form-label ">Direccion</label>
                                        </div>
                                    </div>
                                </div>
                                <!--CAMPO PARA TELEFONO CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtTelefono" class="form-control" disabled>
                                            <label class="form-label ">Telefono</label>
                                        </div>
                                    </div>
                                </div>
                                <!--CAMPO PARA EMAIL CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtEmail" class="form-control" disabled>
                                            <label class="form-label ">Email</label>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div class="button-demo">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();">EDITAR</button>
                                <button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();">ELIMINAR</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="header">
                            <h2>Registros de Empresas</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-border table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Ruc</th>
                                            <th>Direccion</th>
                                            <th>Telefono</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Ruc</th>
                                            <th>Direccion</th>
                                            <th>Telefono</th>
                                            <th>Email</th>
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

    <!-- Metodo Js -->
    <script src="metodos.js"></script>

</body>

</html>
