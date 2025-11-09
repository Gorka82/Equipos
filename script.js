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

    function crearCarrusel() {
        carruselElemento.innerHTML = ''; // Limpiamos el carrusel
        imagenes.forEach(imagen => {
            const imgElemento = document.createElement('img');
            imgElemento.src = `imagenes/${imagen}`;
            imgElemento.alt = imagen;
            carruselElemento.appendChild(imgElemento);
        });
    }

    function crearIndicadores() {
        contenedorIndicadores.innerHTML = '';
        imagenes.forEach((_, index) => {
            const punto = document.createElement('span');
            punto.classList.add('punto');
            if (index === 0) punto.classList.add('activo');
            punto.addEventListener('click', () => mostrarImagen(index));
            contenedorIndicadores.appendChild(punto);
        });
    }

    function mostrarImagen(indice) {
        if (indice >= imagenes.length) {
            indiceActual = 0;
        } else if (indice < 0) {
            indiceActual = imagenes.length - 1;
        } else {
            indiceActual = indice;
        }

        const desplazamiento = -indiceActual * 100;
        carruselElemento.style.transform = `translateX(${desplazamiento}%)`;

        document.querySelectorAll('.punto').forEach((punto, i) => {
            punto.classList.toggle('activo', i === indiceActual);
        });
    }

    botonSiguiente.addEventListener('click', () => mostrarImagen(indiceActual + 1));
    botonAnterior.addEventListener('click', () => mostrarImagen(indiceActual - 1));

    crearCarrusel();
    crearIndicadores();
    mostrarImagen(0);
});

