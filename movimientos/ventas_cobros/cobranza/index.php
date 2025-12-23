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
                        <input type="hidden" value="0" id="usuario"/>

                        <!-- Código -->
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" id="id" class="form-control" disabled>
                                    <label class="form-label">Código</label>
                                </div>
                            </div>
                        </div>
                        <!-- CAMPO PARA EMPRESA CON 5 COLUMNAS -->
                        <div class="col-sm-5">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="hidden" id="empresa_id" value="0"/>
                                    <input type="text" id="empresa_desc" class="form-control" disabled onkeyup="buscarEmpresas();">
                                    <label class="form-label">Empresa</label>
                                </div>
                                <div id="listaEmpresas" style="display:none;"></div>
                            </div>
                        </div>
                        <!-- CAMPO PARA SUCURSAL CON 5 COLUMNAS -->
                        <div class="col-sm-5">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="hidden" id="sucursal_id" value="0"/>
                                    <input type="text" id="suc_desc" class="form-control" disabled onkeyup="buscarSucursales();">
                                    <label class="form-label">Sucursal</label>
                                </div>
                                <div id="listaSucursales" style="display:none;"></div>
                            </div>
                        </div>
                        <!-- CAMPO PARA CAJA CON 4 COLUMNAS -->
                        <div class="col-sm-4">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="hidden" id="caja_id" value="0"/>
                                    <input type="text" id="caja_desc" class="form-control" disabled onkeyup="buscarCajas();">
                                    <label class="form-label">Caja</label>
                                </div>
                                <div id="listaCajas" style="display:none;"></div>
                            </div>
                        </div>
                        <!-- CAMPO PARA APERTURAS ABIERTAS CON 4 COLUMNAS -->
                        <div class="col-sm-4">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="hidden" id="apertura_cierre_id" value="0"/>
                                    <input type="text" id="apertura_cierre_desc" class="form-control" disabled onkeyup="buscarAperturas();">
                                    <label class="form-label">Nro. Apertura</label>
                                </div>
                            </div>
                        </div>
                        <!-- Fecha -->
                        <div class="col-sm-4">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" id="cobro_fecha" class="datetimepicker form-control" disabled>
                                    <label class="form-label">Fecha Cobro</label>
                                </div>
                            </div>
                        </div>
                        <!-- Cliente -->
                        <div class="col-sm-4">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="hidden" id="cliente_id" value="0">
                                    <input type="text" id="nombre_cliente" class="form-control" disabled onkeyup="buscarClientes();">
                                    <label class="form-label">Cliente</label>
                                </div>
                                <div id="listaClientes" style="display:none;"></div>
                            </div>
                        </div>
                        <!-- CAMPO PARA BUSCAR VENTAS/FACTURAS CON 4 COLUMNAS -->
                        <div class="col-sm-4">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="hidden" id="venta_id" value="0"/>
                                    <input type="text" id="venta" class="form-control" disabled onkeyup="buscarVentas();">
                                    <label class="form-label">Venta</label>
                                </div>
                                <div id="listaVentas" style="display:none;"></div>
                            </div>
                        </div>
                        <!-- CAMPO PARA NRO DE FACTURA CON 3 COLUMNAS -->
                        <div class="col-sm-4">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" id="txtNroFact" class="form-control" disabled>
                                    <label class="form-label">Nro. Factura</label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Forma de Cobro (RADIOS) -->
                        <div class="col-sm-12">
                            <h2 class="card-inside-title" style="font-size:13px;">Forma de Cobro</h2>
                            <div class="demo-radio-button">
                                <input name="forma_cobro" type="radio" id="cobro_efectivo" value="2" disabled>
                                <label for="cobro_efectivo">Efectivo</label>

                                <input name="forma_cobro" type="radio" id="cobro_cheque" value="3" disabled>
                                <label for="cobro_cheque">Cheque</label>

                                <input name="forma_cobro" type="radio" id="cobro_tarjeta" value="4" disabled>
                                <label for="cobro_tarjeta">Tarjeta</label>
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
                    <div class="row clearfix" id="formDetalles">
                        <input type="hidden" id="txtOperacionDetalle" value="0">
                        <input type="hidden" id="saldo_cta" value="0">
                        <input type="hidden" id="cta_cobrar_id" value="0">
                        <input type="hidden" id="entidad_emisora_id" value="0">
                        <input type="hidden" id="entidad_adherida_tarjeta_id" value="0">
                        <div class="row clearfix">
                            <!-- DOCUMENTO -->
                            <div class="col-sm-4">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="cta_desc" class="form-control" disabled onkeyup="buscarCtasCobrar();">
                                        <label class="form-label">Documento / Venta</label>
                                    </div>
                                    <div id="listaCtasCobrar" style="display:none;"></div>
                                </div>
                            </div>

                            <!-- MONTO -->
                            <div class="col-sm-3">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="monto_cobro" class="form-control" disabled>
                                        <label class="form-label">Monto</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix" id="grupoEfectivo" style="display:none;">
                        <!-- EFECTIVO RECIBIDO (solo efectivo) -->
                            <div class="col-sm-3">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="monto_recibido" class="form-control">
                                        <label class="form-label">Efectivo Recibido</label>
                                    </div>
                                </div>
                            </div>
                            <!-- VUELTO (solo efectivo) -->
                            <div class="col-sm-3">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="vuelto" class="form-control" disabled>
                                        <label class="form-label">Vuelto</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- CHEQUES -->
                        <div class="row clearfix" id="grupoCheque" style="display:none;">
                            <!-- Banco -->
                            <div class="col-sm-4">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text"
                                            id="entidad_emisora_desc"
                                            class="form-control"
                                            disabled
                                            onkeyup="buscarEntidadesEmisoras();">
                                        <label class="form-label">Banco</label>
                                    </div>
                                    <div id="listaEntidadesEmisoras" style="display:none;"></div>
                                </div>
                            </div>
                            <!-- Nro Cheque -->
                            <div class="col-sm-3">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="nro_cheque" class="form-control" disabled>
                                        <label class="form-label">Nro. Cheque</label>
                                    </div>
                                </div>
                            </div>
                            <!-- Fecha Vto -->
                            <div class="col-sm-3">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="fecha_vto" class="datetimepicker form-control" disabled>
                                        <label class="form-label">Fecha Vencimiento</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- TARJETAS -->
                        <div class="row clearfix" id="grupoTarjeta" style="display:none;">
                            <!-- Entidad Adherida -->
                            <div class="col-sm-4">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text"
                                            id="entidad_adherida_tarjeta_desc"
                                            class="form-control"
                                            disabled
                                            onkeyup="buscarEntidadesAdheridasTarjetas();">
                                        <label class="form-label">Entidad / Tarjeta</label>
                                    </div>
                                    <div id="listaEntidadesAdheridasTarjetas" style="display:none;"></div>
                                </div>
                            </div>
                            <!-- Nro Tarjeta -->
                            <div class="col-sm-4">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="text" id="nro_tarjeta" class="form-control" disabled>
                                        <label class="form-label">Nro. Tarjeta</label>
                                    </div>
                                </div>
                            </div>
                            <!-- Fecha Vto -->
                            <div class="col-sm-4">
                                <div class="form-group form-float">
                                    <div class="form-line">
                                        <input type="date" id="fecha_vto_tarjeta" class="form-control" disabled>
                                        <label class="form-label">Vencimiento</label>
                                    </div>
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
                                <button id="btnGrabarDetalle" class="btn btn-success waves-effect" onclick="grabarDetalle();">
                                    <i class="material-icons">save</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>  

                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-hover dataTable">
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
        

            <!-- REGISTROS -->
            <div class="card" id="registros">
                <div class="header">
                    <h2>Registros de Cobros</h2>
                </div>
                    <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr style="background-color: #e6e6e6;">
                                            <th>Código</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Caja</th>
                                            <th>Apertura</th>
                                            <th>Fecha</th>
                                            <th>Cliente</th>
                                            <th>Venta</th>
                                            <th>Factura</th>
                                            <th>Estado</th>
                                            <th>Usuario</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody"></tbody>
                                    </tbody>
                                    <tfoot>
                                        <tr style="background-color: #e6e6e6;">
                                            <th>Código</th>
                                            <th>Empresa</th>
                                            <th>Sucursal</th>
                                            <th>Caja</th>
                                            <th>Apertura</th>
                                            <th>Fecha</th>
                                            <th>Cliente</th>
                                            <th>Venta</th>
                                            <th>Factura</th>
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
    <script src="../../../js/admin.js"></script>
    <script src="../../../js/demo.js"></script>
    <script src="../../../js/ruta.js"></script>
    <script src="metodos.js"></script>

</body>
</html>
