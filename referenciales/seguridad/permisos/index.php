<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI PERMISOS</title>

    <link rel="icon" href="../../../favicon.ico" type="image/x-icon">

    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <link href="../../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../../../plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="../../../plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="../../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="../../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <link href="../../../css/style.css" rel="stylesheet">
    <link href="../../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-blue">
    
    <?php require_once('../../../opciones.php')?>    

    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <h2>MANTENER PERMISOS</h2>
            </div>

            <div class="row clearfix">
                <div class="col-md-12">

                    <div class="card">
                        <div class="header">
                            <h2>Asignación de Permisos <small>Permisos por rol y acceso</small></h2>
                        </div>

                        <div class="body">
                            <div class="row clearfix">
                                <div class="col-sm-5">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select id="txtRol" class="form-control selectpicker" data-live-search="true">
                                                <option value="">-- Selecciona Rol --</option>
                                            </select>
                                            <label class="form-label" style="top: -20px; font-size: 12px;">Rol</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-7">
                                    <div class="button-demo" style="margin-top: 5px;">
                                        <button type="button" id="btnConsultar" class="btn btn-primary waves-effect" onclick="consultarPermisos();">
                                            CONSULTAR
                                        </button>

                                        <button type="button" id="btnGrabar" class="btn btn-success waves-effect" onclick="confirmarOperacion();" disabled>
                                            GRABAR
                                        </button>

                                        <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>
                                            CANCELAR
                                        </button>

                                        <button type="button" id="btnSalir" class="btn btn-default waves-effect" onclick="salir();">
                                            SALIR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="header">
                            <h2>Detalle de Permisos</h2>
                            <small>
                                Marque las acciones permitidas para el rol seleccionado.
                            </small>
                        </div>

                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Módulo</th>
                                            <th>Acceso</th>
                                            <th class="text-center">Ver</th>
                                            <th class="text-center">Crear</th>
                                            <th class="text-center">Modificar</th>
                                            <th class="text-center">Anular</th>
                                            <th class="text-center">Confirmar</th>
                                            <th class="text-center">Aprobar</th>
                                            <th class="text-center">Rechazar</th>
                                            <th class="text-center">Imprimir</th>
                                        </tr>
                                    </thead>

                                    <tbody id="tableBody">
                                        <tr>
                                            <td colspan="10" class="text-center">
                                                Seleccione un rol y presione Consultar.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <script src="../../../plugins/jquery/jquery.min.js"></script>
    <script src="../../../plugins/bootstrap/js/bootstrap.js"></script>
    <script src="../../../plugins/bootstrap-select/js/bootstrap-select.js"></script>
    <script src="../../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
    <script src="../../../plugins/node-waves/waves.js"></script>
    <script src="../../../plugins/sweetalert/sweetalert.min.js"></script>

    <script src="../../../plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="../../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>

    <script src="../../../js/admin.js"></script>
    <script src="../../../js/demo.js"></script>
    <script src="../../../js/ruta.js"></script>
    <script src="metodos.js"></script>

</body>

</html>