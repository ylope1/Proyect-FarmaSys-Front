function obtenerPermisosMenu() {
    var permisos = sessionStorage.getItem("permisosSesion");

    if (permisos == null || permisos === "undefined") {
        return [];
    }

    return JSON.parse(permisos);
}

function obtenerIconoModulo(modulo) {
    modulo = modulo.toUpperCase();

    if (modulo.includes("SEGURIDAD")) {
        return "security";
    }

    if (modulo.includes("COMPRA")) {
        return "shopping_cart";
    }

    if (modulo.includes("VENTA")) {
        return "point_of_sale";
    }

    //if (modulo.includes("COBRO") || modulo.includes("TESORERIA") || modulo.includes("TESORERÍA")) {
      //  return "attach_money";
    //}

    if (modulo.includes("INFORME")) {
        return "assessment";
    }

    return "folder";
}

function generarMenuDinamico(prefijoRuta) {
    var permisos = obtenerPermisosMenu();
    var modulos = {};

    for (var i = 0; i < permisos.length; i++) {
        var permiso = permisos[i];

        if (permiso.ver !== true) {
            continue;
        }

        if (!modulos[permiso.modulo_id]) {
            modulos[permiso.modulo_id] = {
                mod_desc: permiso.mod_desc,
                mod_orden: permiso.mod_orden,
                accesos: []
            };
        }

        modulos[permiso.modulo_id].accesos.push({
            acc_desc: permiso.acc_desc,
            acc_ruta: permiso.acc_ruta,
            acc_orden: permiso.acc_orden
        });
    }

    var listaModulos = Object.keys(modulos).map(function(key) {
        return modulos[key];
    });

    listaModulos.sort(function(a, b) {
        return a.mod_orden - b.mod_orden;
    });

    var html = "";

    for (var j = 0; j < listaModulos.length; j++) {
        var modulo = listaModulos[j];

        modulo.accesos.sort(function(a, b) {
            return a.acc_orden - b.acc_orden;
        });

        html += "<li>";
        html += "   <a href=\"javascript:void(0);\" class=\"menu-toggle\">";
        html += "       <i class=\"material-icons\">" + obtenerIconoModulo(modulo.mod_desc) + "</i>";
        html += "       <span>" + modulo.mod_desc + "</span>";
        html += "   </a>";
        html += "   <ul class=\"ml-menu\">";

        for (var k = 0; k < modulo.accesos.length; k++) {
            var acceso = modulo.accesos[k];

            html += "       <li>";
            html += "           <a href=\"" + prefijoRuta + acceso.acc_ruta + "\">";
            html += "               <span>" + acceso.acc_desc + "</span>";
            html += "           </a>";
            html += "       </li>";
        }

        html += "   </ul>";
        html += "</li>";
    }

    function activarMenuDinamico() {
        $('.menu-toggle').off('click').on('click', function (e) {
            e.preventDefault();

            var $this = $(this);
            var $next = $this.next();

            if ($next.is(':visible')) {
                $next.slideUp(300);
                $this.removeClass('toggled');
            } else {
                $next.slideDown(300);
                $this.addClass('toggled');
            }
        });
    }

    $("#menuDinamico").replaceWith(html);
    activarMenuDinamico();
}