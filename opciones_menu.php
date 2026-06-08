<div class="page-loader-wrapper">
        <div class="loader">
            <div class="preloader">
                <div class="spinner-layer pl-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <p>Por favor espere...</p>
        </div>
    </div>
    <!-- #END# Page Loader -->      
    <!-- Top Bar -->
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                <a href="javascript:void(0);" class="bars"></a>
                <a class="navbar-brand">SISTEMA DE GESTION FARMASYS</a>
            </div>
        </div>
    </nav>
    <!-- #Top Bar -->
    <section>
        <!-- Left Sidebar -->
        <aside id="leftsidebar" class="sidebar">
            <!-- User Info -->
            <div class="user-info">
                <div class="image">
                    <img src="images/user.png" width="48" height="48" alt="User" />
                </div>
                <div class="info-container">
                    <div class="name" id="nombreUsuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></div>
                    <div class="email" id="emailUsuario"></div>
                    <div class="btn-group user-helper-dropdown">
                        <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                        <ul class="dropdown-menu pull-right">
                            <li role="separator" class="divider"></li>
                            <li>
                                <a href="javascript:void(0);" onclick="cerrarSesion();">
                                    <i class="material-icons">input</i>Cerrar Sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- #User Info -->
            <!-- Menu -->
            <div class="menu">
                <ul class="list">
                    <li class="header">MENU PRINCIPAL</li>
                    <li>
                        <a href="http://localhost/ProyectFarmaSys-front/menu.php">
                            <i class="material-icons">home</i>
                            <span>Menu</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">star_half</i>
                            <span>Gestionar Mantenimiento y Seguridad</span>
                        </a>
                        <ul class="ml-menu">
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <span>Referenciales Compras</span>
                                </a>
                                <ul class="ml-menu">
                                    <li class="opcion-menu" data-ruta="referenciales/compras/proveedores/">
                                        <a href="referenciales/compras/proveedores">
                                            <span>Mantener Proveedores</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/compras/productos/">
                                        <a href="referenciales/compras/productos">
                                            <span>Mantener Productos</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/compras/tipo_impuesto/">
                                        <a href="referenciales/compras/tipo_impuesto">
                                            <span>Mantener Tipo Impuestos</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/compras/marcas/">
                                        <a href="referenciales/compras/marcas">
                                            <span>Mantener Marcas</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/compras/items/">
                                        <a href="referenciales/compras/items">
                                            <span>Mantener Items</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <span>Referenciales Ventas y Cobros</span>
                                </a>
                                <ul class="ml-menu"> 
                                    <li class="opcion-menu" data-ruta="referenciales/ventas/clientes/">
                                        <a href="referenciales/ventas/clientes">
                                            <span>Mantener Clientes</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/ventas/tipo_facturas/">
                                        <a href="referenciales/ventas/tipo_facturas">
                                            <span>Mantener Tipo de Facturas</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/ventas/cajas/">
                                        <a href="referenciales/ventas/cajas">
                                            <span>Mantener Cajas</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/ventas/forma_cobro/">
                                        <a href="referenciales/ventas/forma_cobro">
                                            <span>Mantener Formas de Cobros</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/ventas/entidad_adherida/">
                                        <a href="referenciales/ventas/entidad_adherida">
                                            <span>Mantener Entidades Adheridas</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/ventas/entidad_emisora/">
                                        <a href="referenciales/ventas/entidad_emisora">
                                            <span>Mantener Entidades Emisoras</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/ventas/marca_tarjeta/">
                                        <a href="referenciales/ventas/marca_tarjeta">
                                            <span>Mantener Marca Tarjeta</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <!-- <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <span>Referenciales Tesoreria</span>
                                </a>
                                <ul class="ml-menu">
                                    <li>
                                        <a href="referenciales/tesoreria/rubro">
                                            <span>MantenerRubros</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="referenciales/tesoreria/titular">
                                            <span>Mantener Titular</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="referenciales/tesoreria/documentos">
                                            <span>Mantener Documentos</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="referenciales/tesoreria/bancos">
                                            <span>Mantener Bancos</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>-->
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <span>Mantener Seguridad</span>
                                </a>
                                <ul class="ml-menu">
                                    <li class="opcion-menu" data-ruta="referenciales/seguridad/accesos/">
                                        <a href="referenciales/seguridad/accesos">
                                            <span>Mantener Accesos</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/seguridad/usuarios/">
                                        <a href="referenciales/seguridad/usuarios">
                                            <span>Mantener Usuarios</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/seguridad/permisos/">
                                        <a href="referenciales/seguridad/permisos">
                                            <span>Mantener Permisos</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/seguridad/roles/">
                                        <a href="referenciales/seguridad/roles">
                                            <span>Mantener Roles</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/seguridad/modulos/">
                                        <a href="referenciales/seguridad/modulos">
                                            <span>Mantener Módulos</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <span>Referenciales Varios</span>
                                </a>
                                <ul class="ml-menu">
                                    <li class="opcion-menu" data-ruta="referenciales/compras/funcionarios/">
                                        <a href="referenciales/compras/funcionarios">
                                            <span>Mantener Funcionarios</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/varios/cargos/">
                                        <a href="referenciales/varios/cargos">
                                            <span>Mantener Cargos</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/compras/depositos/">
                                        <a href="referenciales/compras/depositos">
                                            <span>Mantener Depositos</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/compras/empresa/">
                                        <a href="referenciales/compras/empresa">
                                            <span>Mantener Empresa</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/compras/sucursales/">
                                        <a href="referenciales/compras/sucursales">
                                            <span>Mantener Sucursales</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/varios/paises/">
                                        <a href="referenciales/varios/paises">
                                            <span>Mantener Paises</span>
                                        </a>
                                    </li>
                                    <li class="opcion-menu" data-ruta="referenciales/varios/ciudades/">
                                        <a href="referenciales/varios/ciudades">
                                            <span>Mantener Ciudades</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">shopping_cart</i>
                            <span>Gestionar Compras</span>
                        </a>
                        <ul class="ml-menu">
                            <li class="opcion-menu" data-ruta="movimientos/compras/pedidos/">
                                <a href="movimientos/compras/pedidos">
                                    <span>Registrar Pedido</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/compras/presupuestos/">
                                <a href="movimientos/compras/presupuestos">
                                    <span>Registrar Presupuesto Prov</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/compras/orden_compras/">
                                <a href="movimientos/compras/orden_compras">
                                    <span>Registrar Orden de Compras</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/compras/compras/">
                                <a href="movimientos/compras/compras">
                                    <span>Registrar Compras</span>
                                </a>
                            <li>
                            <li class="opcion-menu" data-ruta="movimientos/compras/ajustes/">
                                <a href="movimientos/compras/ajustes">
                                    <span>Registrar Ajustes de Inventario</span>
                                </a>
                            <li>
                            <li class="opcion-menu" data-ruta="movimientos/compras/notas_cred_deb/">
                                <a href="movimientos/compras/notas_cred_deb">
                                    <span>Registrar Notas Crédito/Débito</span>
                                </a>
                            <li>
                            <li class="opcion-menu" data-ruta="movimientos/compras/nota_remision/">
                                <a href="movimientos/compras/nota_remision">
                                    <span>Registrar Nota de Remision</span>
                                </a>
                            <li>
                        </ul>
                    </li>  
                    <li>  
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">business_center</i>
                            <span>Gestionar Ventas y Cobros</span>
                        </a>
                        <ul class="ml-menu">
                            <li class="opcion-menu" data-ruta="movimientos/ventas_cobros/pedidos_ventas/">
                                <a href="movimientos/ventas_cobros/pedidos_ventas">
                                    <span>Registrar Pedidos Clientes</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/ventas_cobros/registrar_ventas/">
                                <a href="movimientos/ventas_cobros/registrar_ventas">
                                    <span>Registrar Ventas</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/ventas_cobros/apertura_cierre/">
                                <a href="movimientos/ventas_cobros/apertura_cierre">
                                    <span>Registrar Apertura-Cierre de Caja</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/ventas_cobros/arqueo_caja/">
                                <a href="movimientos/ventas_cobros/arqueo_caja">
                                    <span>Registrar Arqueo de Caja</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/ventas_cobros/nota_remision/">
                                <a href="movimientos/ventas_cobros/nota_remision">
                                    <span>Registrar Nota de Remision</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/ventas_cobros/cobranza/">
                                <a href="movimientos/ventas_cobros/cobranza">
                                    <span>Registrar Cobranzas</span>
                                </a>
                            </li>
                            <li class="opcion-menu" data-ruta="movimientos/ventas_cobros/notas_cred_deb/">
                                <a href="movimientos/ventas_cobros/notas_cred_deb">
                                    <span>Registrar Nota de Crédito-Débito</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!--<li>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">monetization_on</i>
                            <span>Gestionar Tesorería</span>
                        </a>
                        <ul class="ml-menu">
                            <li>
                                <a href="movimientos/tesoreria/facturas">
                                    <span>Registrar Facturas Varias</span>
                                </a>
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/orden_pago">
                                    <span>Registrar Ordenes de Pagos</span>
                                </a>
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/entrega_cheques">
                                    <span>Registrar Entrega de Cheques</span>
                                </a>
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/procesos_especiales">
                                    <span>Registrar Procesos Especiales</span>
                                </a>    
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/asignacion_ff">
                                    <span>Registrar Asignación Fondo Fijo</span>
                                </a>    
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/rendicion_ff">
                                    <span>Registrar Rendición Fondo Fijo</span>
                                </a>    
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/reposicion_ff">
                                    <span>Registrar Reposición Fondo Fijo</span>
                                </a>    
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/conciliacion_bancaria">
                                    <span>Registrar Conciliación Bancaria</span>
                                </a>    
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/deposito_bancario">
                                    <span>Registrar Depositos Bancarios</span>
                                </a>    
                            </li>
                            <li>
                                <a href="movimientos/tesoreria/otros_creditos_debitos">
                                    <span>Registrar Otros Créditos Débitos</span>
                                </a>    
                            </li>
                        </ul>
                    </li>  --> 
                    <li class="header">Elaborar Informes Varios</li>
                    <li class="opcion-menu" data-ruta="informes/referenciales_compras">
                        <a href="informes/referenciales_compras">
                            <i class="material-icons col-red">donut_large</i>
                            <span>Informes Referenciales de Compras</span>
                        </a>
                    </li>
                    <li class="opcion-menu" data-ruta="informes/referenciales_ventas">
                        <a href="informes/referenciales_ventas">
                            <i class="material-icons col-amber">donut_large</i>
                            <span>Informes Referenciales de Ventas y Cobros</span>
                        </a>
                    </li>
                    <!-- <li>
                        <a href="informes/referenciales_tesoreria">
                            <i class="material-icons col-light-blue">donut_large</i>
                            <span>Informes Referenciales de Tesoreria</span>
                        </a>
                    </li> -->
                    <li class="opcion-menu" data-ruta="informes/seguridad">
                        <a href="informes/seguridad">
                            <i class="material-icons col-green">donut_large</i>
                            <span>Informes de Seguridad</span>
                        </a>
                    </li>
                    <li class="opcion-menu" data-ruta="informes/referenciales_varios">
                        <a href="informes/referenciales_varios">
                            <i class="material-icons col-purple">donut_large</i>
                            <span>Informes Referenciales Varios</span>
                        </a>
                    </li>
                    <li class="opcion-menu" data-ruta="informes/movimientos_compras/Compras">
                        <a href="informes/movimientos_compras/Compras">
                            <i class="material-icons col-teal">donut_large</i>
                            <span>Informes de Compras</span>
                        </a>
                    </li>
                    <li class="opcion-menu" data-ruta="informes/movimientos_ventas">
                        <a href="informes/movimientos_ventas">
                            <i class="material-icons col-orange">donut_large</i>
                            <span>Informes de Ventas y Cobros</span>
                        </a>
                    </li>
                    <!-- <li>
                        <a href="informes/movimientos_tesoreria">
                            <i class="material-icons col-blue-grey">donut_large</i>
                            <span>Informes de Tesoreria</span>
                        </a>
                    </li> -->
                </ul>
            </div>
            <!-- #Menu -->
            <!-- Footer -->
            <div class="legal">
                <div class="copyright">
                    &copy; 2024 - 2027 <a href="javascript:void(0);">Sistema de Gestión FarmaSys</a>.
                </div>
                <div class="version">
                    <b>Version: </b> 1.0.0
                </div>
            </div>
            <!-- #Footer -->
        </aside>
        <!-- #END# Left Sidebar -->
        <script>
            function cerrarSesion() {

                //var datosSesion = sessionStorage.getItem('datosSesion');
                var accessToken = sessionStorage.getItem('accessToken');

                if (accessToken == null) {//if (datosSesion == null || accessToken == null) {
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

                aplicarPermisosMenu();
            });
    
            function tienePermisoRuta(ruta) {
                var permisosSesion = sessionStorage.getItem('permisosSesion');

                if (permisosSesion == null) {
                    return false;
                }

                permisosSesion = JSON.parse(permisosSesion);

                for (var i = 0; i < permisosSesion.length; i++) {
                    if (permisosSesion[i].acc_ruta === ruta && permisosSesion[i].ver === true) {
                        return true;
                    }
                }

                return false;
            }

            function aplicarPermisosMenu() {
                var permisosSesion = JSON.parse(
                    sessionStorage.getItem('permisosSesion')
                );

                console.log("PERMISOS:", permisosSesion);
                $(".opcion-menu").each(function () {
                    var ruta = $(this).data("ruta");

                    if (!tienePermisoRuta(ruta)) {
                        $(this).hide();
                    }
                });
            }
        </script>
    </section>
</div>