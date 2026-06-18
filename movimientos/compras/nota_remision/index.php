<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI REMISIÓN COMPRA</title>
    <!-- Favicon-->
    <link rel="icon" href="../../../images/logo_miniatura.jpg" type="image/jpeg">

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
                            <h2>Registrar Notas de Remisión de Compras <small>CRUD de Notas de Remisión de Compras y sus detalles</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <input type="hidden" value="1" id="user_id"/>
                                <input type="hidden" value="0" id="user_name"/>
                                <input type="hidden" value="PENDIENTE" id="rem_comp_estado"/>
                                <!-- CAMPO PARA CODIGO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtFecha" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA DE SALIDA CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtFecSal" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha Salida</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA DE RECEPCIÓN CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtFecRecep" class="datetimepicker form-control" disabled>
                                            <label class="form-label">Fecha Recepción</label>
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
                                <!-- CAMPO PARA SUCURSAL ORIGEN CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="sucursal_origen_id" value="0"/>
                                            <input type="text" id="suc_origen_desc" class="form-control" disabled onkeyup="buscarSucursalOrigen();">
                                            <label class="form-label">Sucursal Origen</label>
                                        </div>
                                        <div id="listaSucursalOrigen" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA DEPOSITO ORIGEN CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="deposito_origen_id" value="0"/>
                                            <input type="text" id="deposito_origen_desc" class="form-control" disabled onkeyup="buscarDepositoOrigen();">
                                            <label class="form-label">Deposito Origen</label>
                                        </div>
                                        <div id="listaDepositoOrigen" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA SUCURSAL DESTINO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="sucursal_destino_id" value="0"/>
                                            <input type="text" id="suc_destino_desc" class="form-control" disabled onkeyup="buscarSucursalDestino();">
                                            <label class="form-label">Sucursal Destino</label>
                                        </div>
                                        <div id="listaSucursalDestino" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA DEPOSITO DESTINO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="deposito_destino_id" value="0"/>
                                            <input type="text" id="deposito_destino_desc" class="form-control" disabled onkeyup="buscarDepositoDestino();">
                                            <label class="form-label">Deposito Destino</label>
                                        </div>
                                        <div id="listaDepositoDestino" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA NRO DE FACTURA CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtNroFact" class="form-control" disabled>
                                            <label class="form-label">Nro. Factura</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA BUSCAR REMISION MOTIVO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="remision_motivo_id" value="0"/>
                                            <input type="text" id="remision_motivo_desc" class="form-control" disabled onkeyup="buscarMotivo();">
                                            <label class="form-label">Motivo</label>
                                        </div>
                                        <div id="listaMotivos" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA BUSCAR NOMBRE CHOFER CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="persona_id" value="0"/>
                                            <input type="text" id="chofer_nombre" class="form-control" disabled onkeyup="buscarChofer();">
                                            <label class="form-label">Chofer</label>
                                        </div>
                                        <div id="listaChoferes" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA BUSCAR VEHICULOS CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="vehiculo_id" value="0"/>
                                            <input type="text" id="vehiculo_desc" class="form-control" disabled onkeyup="buscarVehiculos();">
                                            <label class="form-label">Vehiculo</label>
                                        </div>
                                        <div id="listaVehiculos" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA ELEGIR PEDIDO  -->
                                <div class="col-sm-4">
                                    <label class="card-inside-title" style="font-weight: normal; font-size: 13px; color: #555;">¿Tiene Pedido?</label>
                                    <div class="demo-radio-button">
                                        <div>
                                            <input type="radio" id="Con_Pedido" name="pedido_option" value="1" disabled>
                                            <label for="Con_Pedido">Sí</label>

                                            <input type="radio" id="Sin_Pedido" name="pedido_option" value="0" disabled>
                                            <label for="Sin_Pedido">No</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA BUSCAR PEDIDOS CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="pedido_comp_id" value="0"/>
                                            <input type="text" id="pedido" class="form-control" disabled onkeyup="buscarPedidos();">
                                            <label class="form-label">Pedidos</label>
                                        </div>
                                        <div id="listaPedidos" style="display:none;"></div>
                                    </div>
                                </div>
                            </div>    

                            <div class="button-demo">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();" disabled>MODIFICAR</button>
                                <button type="button" id="btnAnular" class="btn btn-danger waves-effect" onclick="anular();"disabled>ANULAR</button>
                                <button type="button" id="btnConfirmar" class="btn btn-success waves-effect" onclick="confirmar();"disabled>CONFIRMAR</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button> 
                                <button type="button" id="btnSalir" class="btn btn-default waves-effect" onclick="salir();" enabled>SALIR</button>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="detalles" style="display:none"> 
                        <div class="header">
                            <h2>Detalles de la Nota de Remisión de Compra</h2>
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
                                    <!-- CAMPO PARA OBSERVACIÓN DE NOTA DE REMISIÓN COMPRA CON 3 COLUMNAS -->
                                    <div class="col-sm-3">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="rem_comp_obs" class="form-control" disabled>
                                                <label class="form-label">Observación</label>
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
                                <h2>Registros de Notas de Remisión Compras</h2>
                            </div>
                            <div class="body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead>
                                            <tr style="background-color: #e6e6e6;">
                                                <th>Código</th>
                                                <th>Fecha</th>
                                                <th>Fecha Salida</th>
                                                <th>Fecha Recepción</th>
                                                <th>Empresa</th>
                                                <th>Sucursal Origen</th>
                                                <th>Deposito Origen</th>
                                                <th>Sucursal Destino</th>
                                                <th>Deposito Destino</th>
                                                <th>Nro. Factura</th>
                                                <th>Motivo</th>
                                                <th>Chofer</th>
                                                <th>Vehículo</th>
                                                <th>Pedido</th>
                                                <th>Encargado</th>
                                                <th>Estado</th> 
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody">
                                            
                                        </tbody>
                                        <tfoot>
                                            <tr style="background-color: #e6e6e6;">
                                                <th>Código</th>
                                                <th>Fecha</th>
                                                <th>Fecha Salida</th>
                                                <th>Fecha Recepción</th>
                                                <th>Empresa</th>
                                                <th>Sucursal Origen</th>
                                                <th>Deposito Origen</th>
                                                <th>Sucursal Destino</th>
                                                <th>Deposito Destino</th>
                                                <th>Nro. Factura</th>
                                                <th>Motivo</th>
                                                <th>Chofer</th>
                                                <th>Vehículo</th>
                                                <th>Pedido</th>
                                                <th>Encargado</th>
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

    <script src="../../../js/seguridad.js"></script>
    <script src="../../../js/menu_dinamico.js"></script>

    <script src="metodos.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            generarMenuDinamico("../../../");
        });
    </script>
</body>

</html>
