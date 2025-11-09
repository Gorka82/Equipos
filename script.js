document.addEventListener('DOMContentLoaded', () => {
    const carruselElemento = document.querySelector('.carrusel');
    const contenedorIndicadores = document.getElementById('contenedorIndicadores');
    const botonAnterior = document.getElementById('botonAnterior');
    const botonSiguiente = document.getElementById('botonSiguiente');

    let indiceActual = 0;
    // Aquí pon todos los nombres de archivos de imagen que tienes en la carpeta 'imagenes'
    let imagenes = [
      'gorkatr.jpg',
      'images.jpeg',
      'marca de agua legalitas.psd',
      'sithprophecy_esb_pub.jpg'
      // etc
    ];

    let indiceActual = 0;

    // Referencias a los elementos del DOM
    const carruselElemento = document.querySelector('.carrusel');
    const botonAnterior = document.getElementById('botonAnterior');
    const botonSiguiente = document.getElementById('botonSiguiente');

    // Función para mostrar sólo la imagen actual
    function mostrarImagen(indice) {
        carruselElemento.innerHTML = ''; // Limpia el carrusel

        const imgElemento = document.createElement('img');
        imgElemento.src = `imagenes/${imagenes[indice]}`;
        imgElemento.alt = imagenes[indice];
        imgElemento.style.width = "100%";
        imgElemento.style.height = "auto";
        carruselElemento.appendChild(imgElemento);
    }

    // Avanzar/retroceder en el array
    botonSiguiente.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % imagenes.length;
        mostrarImagen(indiceActual);
    });

    botonAnterior.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(indiceActual);
    });

    // Inicializa mostrando la primera imagen
    mostrarImagen(indiceActual);
});
