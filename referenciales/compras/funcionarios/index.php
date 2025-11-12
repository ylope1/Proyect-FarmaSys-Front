<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI FUNCIONARIO</title>
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

    <!-- Bootstrap DatePicker Css -->
    <link href="../../../plugins/bootstrap-datepicker/css/bootstrap-datepicker.css" rel="stylesheet" />

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

    <?php require_once('../../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <h2>MANTENER FUNCIONARIOS</h2>
            </div>

            <div class="row clearfix">

                <div class="col-md-12">
                    
                    <div class="card">
                        <div class="header">
                            <h2>Mantener datos de Funcionarios <small>CRUD de Funcionarios</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <!-- CAMPO PARA CODIGO CON 2 COLUMNAS -->
                                <div class="col-sm-2">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtCodigo" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA NOMBRE CON 5 COLUMNAS -->
                                <div class="col-sm-5">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtNombre" class="form-control" disabled>
                                            <label class="form-label">Nombre</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA APELLIDO CON 5 COLUMNAS -->
                                <div class="col-sm-5">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtApellido" class="form-control" disabled>
                                            <label class="form-label">Apellido</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA CEDULA CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtCedula" class="form-control" disabled>
                                            <label class="form-label">Nro. Cedula</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA DIRECCION CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtDireccion" class="form-control" disabled>
                                            <label class="form-label">Direccion</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA TELEFONO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtTelefono" class="form-control" disabled>
                                            <label class="form-label">Telefono</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA EMAIL CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtEmail" class="form-control" disabled>
                                            <label class="form-label">Email</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA PAIS CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="pais_id" value="0"/>
                                            <input type="text" id="pais_desc" class="form-control" disabled onkeyup="buscarPaises();">
                                            <label class="form-label">Pais</label>
                                        </div>
                                        <div id="listaPaises" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA CIUDAD CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="ciudad_id" value="0"/>
                                            <input type="text" id="ciudad_desc" class="form-control" disabled onkeyup="buscarCiudades();">
                                            <label class="form-label">Ciudad</label>
                                        </div>
                                        <div id="listaCiudades" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA DE NACIMIENTO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #adababff;">Fec. Nacimiento</label>
                                    <div class="input-group date" id="datepicker_nacimiento">
                                        <div class="form-line">
                                            <input type="text" id="txtFecNac" class="form-control" placeholder="DD/MM/YYYY" disabled>
                                        </div>
                                        <span class="input-group-addon">
                                            <i class="material-icons">date_range</i>
                                        </span>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA DE BAJA CON 4 COLUMNAS DE MOMENTO DEJO ASI COMO TEXTO-->
                                <!-- <div class="col-sm-4">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #adababff;">Fec. Salida</label>
                                    <div class="input-group date" id="datepicker_baja">
                                        <div class="form-line">
                                            <input type="text" id="txtFecBaj" class="form-control" placeholder="11/11/1111" disabled>
                                        </div>
                                        <span class="input-group-addon">
                                            <i class="material-icons">date_range</i>
                                        </span>
                                    </div>
                                </div>-->
                                <!-- CAMPO PARA FECHA DE SALIDA CON 4 COLUMNAS SOLO TEXTO PROVISORIO -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="txtFecBaj" class="form-control" disabled>
                                            <label class="form-label">Fec. Salida</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA FECHA DE INGRESO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #adababff;">Fec. Ingreso</label>
                                    <div class="input-group date" id="datepicker_ingreso">
                                        <div class="form-line">
                                            <input type="text" id="txtFecIng" class="form-control" placeholder="DD/MM/YYYY" disabled>
                                        </div>
                                        <span class="input-group-addon">
                                            <i class="material-icons">date_range</i>
                                        </span>
                                    </div>
                                </div>
                                <!-- CAMPO PARA SELECCIONAR ESTADO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <label class="form-label" style="font-weight: normal; font-size: 13px; color: #adababff;">Estado</label>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="txtEstado" class="form-control selectpicker" disabled>
                                                <option value="">-- Selecciona Estado --</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA CARGO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="cargo_id" value="0"/>
                                            <input type="text" id="cargo_desc" class="form-control" disabled onkeyup="buscarCargos();">
                                            <label class="form-label">Cargo</label>
                                        </div>
                                        <div id="listaCargos" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA USERS CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="hidden" id="user_id" value="0"/>
                                            <input type="text" id="login" class="form-control" disabled onkeyup="buscarUsers();">
                                            <label class="form-label">Usuario</label>
                                        </div>
                                        <div id="listaUsuarios" style="display:none;"></div>
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
                            <h2>Registros de Funcionarios</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr style="background-color: #e6e6e6;">
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Nro. Cedula</th>
                                            <th>Dirección</th>
                                            <th>Telefono</th>
                                            <th>Email</th>
                                            <th>Pais</th>
                                            <th>Ciudad</th>
                                            <th>Fec. Nacimiento</th>
                                            <th>Fec. Salida</th>
                                            <th>Fec. Ingreso</th>
                                            <th>Estado</th>
                                            <th>Cargo</th>
                                            <th>Usuario</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr style="background-color: #e6e6e6;">
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Nro. Cedula</th>
                                            <th>Dirección</th>
                                            <th>Telefono</th>
                                            <th>Email</th>
                                            <th>Pais</th>
                                            <th>Ciudad</th>
                                            <th>Fec. Nacimiento</th>
                                            <th>Fec. Salida</th>
                                            <th>Fec. Ingreso</th>
                                            <th>Estado</th>
                                            <th>Cargo</th>
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

    <!-- Jquery Core Js -->
    <script src="../../../plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="../../../plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Select Plugin Js -->
    <script src="../../../plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Select Plugin Js -->
    <script src="../../../plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="../../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="../../../plugins/node-waves/waves.js"></script>

    <!-- SweetAlert Plugin Js -->
    <script src="../../../plugins/sweetalert/sweetalert.min.js"></script>

    <!-- Bootstrap Datepicker Plugin Js -->
    <script src="../../../plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>

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

    <!-- Ruta Js -->
    <script src="../../../js/ruta.js"></script>

    <script src="metodos.js"></script>
</body>

</html>
