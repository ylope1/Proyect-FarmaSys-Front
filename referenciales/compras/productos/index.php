<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI PRODUCTOS</title>
    <!-- Favicon-->
    <link rel="icon" href="../../../favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="../../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Bootstrap Select Css -->
    <link href="../../../plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet" />

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
                <h2>MANTENER PRODUCTOS</h2>
            </div>

            <div class="row clearfix">

                <div class="col-md-12">
                    
                    <div class="card">
                        <div class="header">
                            <h2>Mantener datos de Productos <small>CRUD de Productos</small> </h2>
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
                                 <!--CAMPO PARA PRECIO DE COMPRA CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtPrecio_comp" class="form-control" disabled>
                                            <label class="form-label ">Precio Compra</label>
                                        </div>
                                    </div>
                                </div>
                                <!--CAMPO PARA PRECIO DE VENTA CON 4 COLUMNAS-->
                                <div class="col-sm-4">
                                <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtPrecio_vent" class="form-control" disabled>
                                            <label class="form-label ">Precio Venta</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA PROVEEDOR CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="proveedor_id" value="0"/>
                                            <input type="text" id="proveedor_desc" class="form-control" disabled onkeyup="buscarProveedores();">
                                            <label class="form-label">Proveedor</label>
                                        </div>
                                        <div id="listaProveedores" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA ITEMS CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="item_id" value="0"/>
                                            <input type="text" id="item_desc" class="form-control" disabled onkeyup="buscarItems();">
                                            <label class="form-label">Item</label>
                                        </div>
                                        <div id="listaItems" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA IMPUESTO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="impuesto_id" value="0"/>
                                            <input type="text" id="impuesto_desc" class="form-control" disabled onkeyup="buscarImpuestos();">
                                            <label class="form-label">Impuesto</label>
                                        </div>
                                        <div id="listaImpuestos" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA MARCA CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="marca_id" value="0"/>
                                            <input type="text" id="marca_desc" class="form-control" disabled onkeyup="buscarMarcas();">
                                            <label class="form-label">Marca</label>
                                        </div>
                                        <div id="listaMarcas" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA SELECCIONAR ESTADO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #adababff;">Estado</label>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="txtEstado" class="form-control selectpicker" disabled>
                                                <option value="">-- Selecciona Estado --</option>
                                                <option value="ACTIVO">ACTIVO</option>
                                                <option value="INACTIVO">INACTIVO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-demo">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();">MODIFICAR</button>
                                <button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();">ELIMINAR</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button>
                                <button type="button" id="btnSalir" class="btn btn-default waves-effect" onclick="salir();" enabled>SALIR</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="header">
                            <h2>Registros de Productos</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-border table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Precio Compra</th>
                                            <th>Precio Venta</th>
                                            <th>Proveedor</th>
                                            <th>Items</th>
                                            <th>Impuesto</th>
                                            <th>Marca</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Precio Compra</th>
                                            <th>Precio Venta</th>
                                            <th>Proveedor</th>
                                            <th>Items</th>
                                            <th>Impuesto</th>
                                            <th>Marca</th>
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

    <!-- Metodo Js -->
    <script src="metodos.js"></script>

</body>

</html>
