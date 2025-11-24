<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI REGISTRO DE NOTAS DE COMPRAS</title>
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
                            <h2>Registrar Notas de Compras <small>CRUD de Registro de Notas de Compras y sus detalles</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <input type="hidden" value="1" id="user_id"/>
                                <input type="hidden" value="0" id="user_name"/>
                                <input type="hidden" value="PENDIENTE" id="nota_comp_estado"/>
                                <!-- CAMPO PARA CODIGO CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
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
                                <!-- CAMPO PARA DEPOSITO CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="deposito_id" value="0"/>
                                            <input type="text" id="deposito_desc" class="form-control" disabled onkeyup="buscarDepositos();">
                                            <label class="form-label">Deposito</label>
                                        </div>
                                        <div id="listaDepositos" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA NOTA DE COMPRA CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtFecha" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha</label>
                                        </div>
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
                                <!-- CAMPO PARA NOTA DE COMPRA TIMBRADO CON 3 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtTimbrado" class="form-control" disabled>
                                            <label class="form-label">Timbrado</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA NRO DE FACTURA DE COMPRA CON 3 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtNroFact" class="form-control" disabled>
                                            <label class="form-label">Nro. Factura</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA ELEGIR CONDICION DE COMPRA CON 3 COLUMNAS-->
                                <div class="col-sm-5">
                                    <h2 class="card-inside-title" style="font-weight: normal; font-size: 13px; color: #555;">Condición Compra</h2>
                                    <div class="demo-radio-button">
                                        <input name="tipo_fact_id" type="radio" id="contado" value="6" disabled checked onchange />
                                        <label for="contado">Contado</label>
                                        <input name="tipo_fact_id" type="radio" id="credito" value="7" disabled onchange />
                                        <label for="credito">Crédito</label>
                                    </div>
                                </div>
                                <!-- CAMPO PARA SELECCIONAR NOTA DE COMPRA TIPO CON 3 COLUMNAS-->
                                <div class="col-sm-3">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #555;">TIPO NOTA</label>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="nota_comp_tipo" class="form-control selectpicker">
                                                <!-- Las opciones se generarán dinámicamente -->
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA BUSCAR COMPRAS CON 5 COLUMNAS -->
                                <div class="col-sm-5">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="compra_id" value="0"/>
                                            <input type="text" id="compra" class="form-control" disabled onkeyup="buscarCompras();">
                                            <label class="form-label">Compras</label>
                                        </div>
                                        <div id="listaCompras" style="display:none;"></div>
                                    </div>
                                </div> 
                                <div class="col-sm-12">
                                    <div class="button-demo">
                                        <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                        <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>EDITAR</button>
                                        <button type="button" id="btnAnular" class="btn btn-danger waves-effect" onclick="anular();"disabled>ANULAR</button>
                                        <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();"disabled>CONFIRMAR</button>
                                        <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                        <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card" id="detalles" style="display:none"> 
                            <div class="header">
                                <h2>Detalles del Registro de Notas de Compras</h2>
                            </div>
                            <div class="body">
                                <div class="row clearfix" id="formDetalles">
                                    <input type="hidden" value="0" id="txtOperacionDetalle"/>
                                    <!-- CAMPO PARA CODIGO CON 1 COLUMNAS -->
                                    <div class="col-sm-1">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="producto_id" class="form-control" disabled>
                                                <label class="form-label">Código</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- CAMPO PARA BUSCAR PRODUCTOS CON 3 COLUMNAS -->
                                    <div class="col-sm-3">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="prod_desc" class="form-control" disabled onkeyup="buscarProductos();">
                                                <label class="form-label">Productos</label>
                                            </div>
                                            <div id="ListaProductos" style="display:none;"></div>
                                        </div>
                                    </div>
                                    <!-- CAMPO PARA CANTIDAD CON 1 COLUMNAS -->
                                    <div class="col-sm-1">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="det_cantidad" class="form-control" disabled>
                                                <label class="form-label">Cantidad</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- CAMPO PARA PRECIO COMPRA CON 2 COLUMNAS -->
                                    <div class="col-sm-2">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="det_costo" class="form-control" disabled>
                                                <label class="form-label">Precio Compra</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- CAMPO PARA MOTIVO DE NOTA DE COMPRA CON 3 COLUMNAS -->
                                    <div class="col-sm-3">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="motivo" class="form-control" disabled>
                                                <label class="form-label">Motivo Nota</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="icon-button-demo">
                                            <button type="button" id="btnAgregarDetalle" class="btn btn-primary waves-effect" onclick="agregarDetalle();">
                                                <i class="material-icons">add</i>
                                            </button>
                                            <button type="button" id="btnEditarDetalle" class="btn btn-warning waves-effect" onclick="editarDetalle();">
                                                <i class="material-icons">mode_edit</i>
                                            </button>
                                            <button type="button" id="btnEliminarDetalle" class="btn btn-danger waves-effect"onclick="eliminarDetalle();">
                                                <i class="material-icons">clear</i>
                                            </button>
                                            <button type="button" id="btnGrabarDetalle" class="btn btn-success waves-effect" style="display:none" onclick="grabarDetalle();">
                                                <i class="material-icons">save</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover dataTable">
                                        <thead>
                                            <tr style="background-color: #e6e6e6;">
                                                <th>Código</th>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Precio Unitario</th>
                                                <th>Exentas</th>
                                                <th>5%</th>
                                                <th>10%</th>
                                                <th>Sub Total</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableDetalles">
                                            
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="4">Total General</th>
                                                <th class="text-right" id="txtTotalGral">0</th>
                                                <th class="text-right">0</th> <!-- total exentas -->
                                                <th class="text-right">0</th> <!-- total 5% -->
                                                <th class="text-right">0</th> <!-- total 10% -->
                                            </tr>
                                        </tfoot>    
                                    </table>
                                </div>
                            </div>
                        </div>  
                        <div class="card" id="registros">
                            <div class="header">
                                <h2>Registros de Compras</h2>
                            </div>
                            <div class="body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead>
                                            <tr style="background-color: #e6e6e6;">
                                                <th>Código</th>
                                                <th>Empresa</th>
                                                <th>Sucursal</th>
                                                <th>Deposito</th>
                                                <th>Fecha</th>
                                                <th>Proveedor</th>
                                                <th>Nro. Factura</th>
                                                <th>Condición Compra</th>
                                                <th>Tipo Nota</th>
                                                <th>Compra</th>
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
                                                <th>Deposito</th>
                                                <th>Fecha</th>
                                                <th>Proveedor</th>
                                                <th>Nro. Factura</th>
                                                <th>Condición Compra</th>
                                                <th>Tipo Nota</th>
                                                <th>Compra</th>
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
