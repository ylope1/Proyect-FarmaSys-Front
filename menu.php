<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Bienvenido a | FarmaSys</title>
    <!-- Favicon-->
    <link rel="icon" href="images/logo_miniatura.jpg" type="image/jpeg">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Sweetalert Css -->
    <link href="plugins/sweetalert/sweetalert.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Custom Css -->
    <link href="css/style.css" rel="stylesheet">

    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-blue">

    <?php require_once('opciones_menu.php'); ?> 
    <section class="content">
        <div class="container-fluid">

            <div class="row clearfix">
                <div class="col-xs-12">
                    <div class="card">

                        <div class="body align-center">

                            <img src="images/menu_principal.png"
                                alt="FarmaSys"
                                class="img-responsive center-block"
                                style="width: 100%; border-radius: 8px;">

                            <h3 class="m-t-25">Panel Principal del Sistema</h3>

                            <p class="font-16">
                                Desde este menú podrá acceder a los módulos de compras, ventas y cobros,
                                referenciales e informes del sistema.
                            </p>

                            <div class="row clearfix m-t-30">
                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div class="info-box bg-blue hover-expand-effect">
                                        <div class="icon">
                                            <i class="material-icons">shopping_cart</i>
                                        </div>
                                        <div class="content">
                                            <div class="text">COMPRAS</div>
                                            <div class="number">Módulo</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div class="info-box bg-green hover-expand-effect">
                                        <div class="icon">
                                            <i class="material-icons">point_of_sale</i>
                                        </div>
                                        <div class="content">
                                            <div class="text">VENTAS Y COBROS</div>
                                            <div class="number">Módulo</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div class="info-box bg-orange hover-expand-effect">
                                        <div class="icon">
                                            <i class="material-icons">settings</i>
                                        </div>
                                        <div class="content">
                                            <div class="text">REFERENCIALES</div>
                                            <div class="number">Módulo</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div class="info-box bg-purple hover-expand-effect">
                                        <div class="icon">
                                            <i class="material-icons">assessment</i>
                                        </div>
                                        <div class="content">
                                            <div class="text">INFORMES</div>
                                            <div class="number">Módulo</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Jquery Core Js -->
    <script src="plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Select Plugin Js -->
    <script src="plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="plugins/node-waves/waves.js"></script>

    <!-- SweetAlert Plugin Js -->
    <script src="plugins/sweetalert/sweetalert.min.js"></script>

    <!-- Custom Js -->
    <script src="js/admin.js"></script>
    <script src="js/ruta.js"></script>

    <script src="plugins/jquery-countto/jquery.countTo.js"></script>
    <script src="plugins/raphael/raphael.min.js"></script>
    <script src="plugins/morrisjs/morris.js"></script>
    <script src="plugins/chartjs/Chart.bundle.js"></script>
    <script src="plugins/jquery-sparkline/jquery.sparkline.js"></script>
    <script src="js/pages/index.js"></script>
    <script src="js/seguridad.js"></script>
    <script src="js/menu_dinamico.js"></script>

    <!-- Demo Js -->
    <script src="js/demo.js"></script>

    <script>
        function cerrarSesion() {

            var datosSesion = sessionStorage.getItem('datosSesion');
            var accessToken = sessionStorage.getItem('accessToken');

            if (datosSesion == null || accessToken == null) {
                limpiarSesion();
                window.location.href = "index.html";
                return;
            }

            swal({
                title: "Cerrar sesión",
                text: "¿Desea salir del sistema?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4CAF50",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false
            }, function(confirmar) {

                if (confirmar) {

                    $.ajax({
                        url: getUrl() + "logout",
                        method: "GET",
                        dataType: "json",
                        headers: {
                            "Authorization": "Bearer " + accessToken
                        }
                    })
                    .done(function(resultado) {

                        limpiarSesion();

                        swal({
                            title: "Correcto",
                            text: resultado.message,
                            type: "success",
                            confirmButtonText: "Aceptar"
                        }, function() {
                            window.location.href = "index.html";
                        });

                    })
                    .fail(function(a,b,c) {

                        limpiarSesion();

                        swal({
                            title: "Atención",
                            text: "La sesión fue cerrada localmente.",
                            type: "warning",
                            confirmButtonText: "Aceptar"
                        }, function() {
                            window.location.href = "index.html";
                        });

                        console.log(a.responseText);
                    });
                }
            });
        }

        function limpiarSesion() {
            sessionStorage.removeItem('datosSesion');
            sessionStorage.removeItem('rolSesion');
            sessionStorage.removeItem('permisosSesion');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('token_type');
        }

        document.addEventListener("DOMContentLoaded", function () {

            var datosSesion = sessionStorage.getItem('datosSesion');
            var rolSesion = sessionStorage.getItem('rolSesion');
            var accessToken = sessionStorage.getItem('accessToken');

            if (datosSesion == null || accessToken == null) {
                limpiarSesion();
                window.location.href = "index.html";
                return;
            }

            datosSesion = JSON.parse(datosSesion);

            document.getElementById("nombreUsuario").innerText = datosSesion.name;
            document.getElementById("emailUsuario").innerText = datosSesion.email;

            if (rolSesion != null && document.getElementById("rolUsuario")) {
                rolSesion = JSON.parse(rolSesion);
                document.getElementById("rolUsuario").innerText = rolSesion.rol_desc;
            }
        });

        document.addEventListener("DOMContentLoaded", function () {
            generarMenuDinamico("");
        });

    </script>
</body>

</html>
