document.addEventListener('DOMContentLoaded', () => {
    const carruselElemento = document.querySelector('.carrusel');
    const contenedorIndicadores = document.getElementById('contenedorIndicadores');
    const botonAnterior = document.getElementById('botonAnterior');
    const botonSiguiente = document.getElementById('botonSiguiente');

    let indiceActual = 0;
    let imagenes = [];

    // Función para cargar la lista de imágenes desde el directorio
    async function cargarImagenes() {
        try {
            // Hacemos una petición a la carpeta de imágenes
            const respuesta = await fetch('imagenes/');
            const texto = await respuesta.text();
            
            // Creamos un DOM temporal para parsear el HTML de la lista de archivos
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(texto, 'text/html');

            // Extraemos los nombres de los archivos que son imágenes
            const archivos = Array.from(htmlDoc.querySelectorAll('a'))
                .map(enlace => enlace.getAttribute('href'))
                .filter(archivo => {
                    // Filtramos para quedarnos solo con archivos de imagen válidos
                    return archivo.match(/\.(jpeg|jpg|gif|png)$/i);
                });

            imagenes = archivos;
            crearCarrusel();
            crearIndicadores();
            mostrarImagen(0); // Mostramos la primera imagen

        } catch (error) {
            console.error("No se pudo cargar el directorio de imágenes:", error);
            carruselElemento.innerHTML = '<p style="color: white; padding: 20px;">No se pudieron cargar las imágenes. Asegúrate de usar un servidor local.</p>';
        }
    }

    // Función para crear los elementos <img> en el carrusel
    function crearCarrusel() {
        carruselElemento.innerHTML = ''; // Limpiamos el carrusel
        imagenes.forEach(imagen => {
            const imgElemento = document.createElement('img');
            imgElemento.src = `imagenes/${imagen}`;
            imgElemento.alt = imagen;
            carruselElemento.appendChild(imgElemento);
        });
    }

    // Función para crear los puntos indicadores
    function crearIndicadores() {
        contenedorIndicadores.innerHTML = ''; // Limpiamos los indicadores
        imagenes.forEach((_, index) => {
            const punto = document.createElement('span');
            punto.classList.add('punto');
            if (index === 0) punto.classList.add('activo');
            punto.addEventListener('click', () => mostrarImagen(index));
            contenedorIndicadores.appendChild(punto);
        });
    }

    // Función para mostrar una imagen específica
    function mostrarImagen(indice) {
        if (indice >= imagenes.length) {
            indiceActual = 0;
        } else if (indice < 0) {
            indiceActual = imagenes.length - 1;
        } else {
            indiceActual = indice;
        }
        
        // Movemos el carrusel
        const desplazamiento = -indiceActual * 100;
        carruselElemento.style.transform = `translateX(${desplazamiento}%)`;

        // Actualizamos los puntos activos
        document.querySelectorAll('.punto').forEach((punto, i) => {
            punto.classList.toggle('activo', i === indiceActual);
        });
    }

    // Event Listeners para los botones
    botonSiguiente.addEventListener('click', () => mostrarImagen(indiceActual + 1));
    botonAnterior.addEventListener('click', () => mostrarImagen(indiceActual - 1));

    // Inicializar el carrusel
    cargarImagenes();
});