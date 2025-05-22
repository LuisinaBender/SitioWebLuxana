// Metodo Crud 
const urlJuegosDeMesa = "https://ingenieriasoftware-9437.restdb.io/rest/juegosdemesa?apikey=64f8c70e68885478040bfe82";
appJuegos = {
    listarJuegos: () => {
        const contenedor = document.getElementById("contenedorJuegos"); 

        // Creamos una variable vacia que tendra todo e codigo HTML que vamos insertar 
        let contenidoHTML = "";

        fetch(urlJuegosDeMesa)
        .then(respuesta => respuesta.json())
        .then(jdm => {
            console.log(jdm);
            for (const juegosdm of jdm) { // Para que cada juego se genere en el siguente bloque de codigo HTML
                contenidoHTML += `
                <div class="row">
                    <div class="col_juegos">
                        <div class="card" id="card-ma">
                            <img src="${juegosdm.Imagen_URL}" class="card-img-top" id="card-im">
                            <div class="card-body" id="card-bdys"> 
                                <h5 class="card-title">Nombre del Juego: ${juegosdm.Nombre}</h5>
                                <p class="card-text">Cantidad de Jugadores: ${juegosdm.Jugadores}</p>
                                <p class="card-text">Tiempo de Juego: ${juegosdm.Tiempo} minutos</p>
                                <a href="#" onclick="appJuegos.eliminarJuegos('${juegosdm._id}', '${encodeURIComponent(juegosdm.Nombre)}')">Eliminar</a>
                                <a href="#" onclick="appJuegos.editarJuegos('${juegosdm._id}')">Editar</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
            contenedor.innerHTML = contenidoHTML;
        })
        .catch(error => console.error("Error al obtener los juegos:", error));
    },

agregarJuego: () => {
    const txtId = document.getElementById("txtId");
    const txtNombreDelJuego = document.getElementById("txtNombreDelJuego");
    const txtCantidadDeJugadores = document.getElementById("txtCantidadDeJugadores");
    const txtTiempoDeJuego = document.getElementById("txtTiempoDeJuego");
    const txtImgUrl = document.getElementById("txtImgUrl");

    const juegoAGuardar = {
        "Nombre": txtNombreDelJuego.value,
        "Jugadores": txtCantidadDeJugadores.value,
        "Tiempo": txtTiempoDeJuego.value,
        "Imagen_URL": txtImgUrl.value
    };

    let urlApi = "https://ingenieriasoftware-9437.restdb.io/rest/juegosdemesa";
    let metodoHttp = "POST";

    // Si hay un ID cargado, significa que estamos editando un juego existente
    if (txtId.value) {
        urlApi += `/${txtId.value}`;
        metodoHttp = "PUT";
    }

    fetch(urlApi, {
        method: metodoHttp,
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '64f8c70e68885478040bfe82'
        },
        body: JSON.stringify(juegoAGuardar)
    })
    .then(response => {
        console.log(response);
        window.location.href = "club.html"; // o cerrar el modal y recargar la lista si preferís
    })
    .catch(error => console.error("Error al guardar el juego:", error));
},

    eliminarJuegos: (idAEliminar, nombreBorrar) => { 
        Swal.fire({
            title: `¿Estás seguro de que deseas borrar el juego "${nombreBorrar}"`,
            text: "No podrás revertir esta operación.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, quiero borrarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                const urlApi = `https://ingenieriasoftware-9437.restdb.io/rest/juegosdemesa/${idAEliminar}`;
    
                fetch(urlApi, {
                    method: 'DELETE',
                    headers: {
                        'x-apikey': '64f8c70e68885478040bfe82'
                    }
                })
                .then(response => {
                    console.log(response);
                    return appJuegos.listarJuegos();
                })
                .then(() => {
                    Swal.fire(
                        '¡Eliminado!',
                        `El juego "${nombreBorrar}" fue borrado.`,
                        'success'
                    );
                })
                .catch(error => console.error("Error al eliminar el juego:", error));
            }
        });
    },    
    // Metodo para editar el juego
    editarJuegos: (idAEditar) => {
        const urlApi = `https://ingenieriasoftware-9437.restdb.io/rest/juegosdemesa/${idAEditar}?apikey=64f8c70e68885478040bfe82`;
        fetch(urlApi)
        .then(res => res.json())
        .then(juego => {
            document.getElementById("txtId").value = idAEditar;
            document.getElementById("txtNombreDelJuego").value = juego.Nombre;
            document.getElementById("txtCantidadDeJugadores").value = juego.Jugadores;
            document.getElementById("txtTiempoDeJuego").value = juego.Tiempo;
            document.getElementById("txtImgUrl").value = juego.Imagen_URL;

            const ventanaEditar=document.getElementById("agregarEditarModal");
            let ventana = new bootstrap.Modal(ventanaEditar); //se crea otra instancia del modal de bootstrap
            ventana.show();//se muestra el modal en pantalla con los datos
        });
    }
}

appJuegos.listarJuegos();

