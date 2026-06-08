function obtenerPermisosSesion() {
    var permisos = sessionStorage.getItem("permisosSesion");

    if (permisos == null || permisos === "undefined") {
        return [];
    }

    return JSON.parse(permisos);
}

function tienePermiso(ruta, accion) {
    var permisos = obtenerPermisosSesion();

    for (var i = 0; i < permisos.length; i++) {
        if (permisos[i].acc_ruta === ruta && permisos[i][accion] === true) {
            return true;
        }
    }

    return false;
}

function validarAccesoPantalla(ruta, rutaSalida) {
    if (!tienePermiso(ruta, "ver")) {
        swal({
            title: "Acceso denegado",
            text: "No tiene permiso para acceder a esta pantalla.",
            type: "warning",
            confirmButtonText: "Aceptar"
        }, function () {
            window.location.href = rutaSalida;
        });

        return false;
    }

    return true;
}

function controlarBotonPorPermiso(ruta, accion, boton) {
    if (!tienePermiso(ruta, accion)) {
        $(boton).attr("disabled", "true");
        $(boton).hide();
    }
}