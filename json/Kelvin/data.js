

window.onload = function () {
    fetch("http://localhost:3000/user?1")
        .then((req) => req.json())
        .then((data) => imprimeDados(data))
        .catch((error) => console.error('Erro ao buscar dados:', error));
};

function imprimeDados(data) {
    const foto1 = document.getElementById('fotos1');
    const foto2 = document.getElementById('fotos2');
    const foto3 = document.getElementById('fotos3');
    
    const categoria = document.getElementById('tipo');
    const categoria2 = document.getElementById('tipo2');
    const categoria3 = document.getElementById('tipo3');

    // Extrair as fotos do objeto data
    const { foto: Foto1, categoria: Tipo1 } = data[0];
    const { foto: Foto2, categoria: Tipo2 } = data[1];
    const { foto: Foto3, categoria: Tipo3 } = data[2];
    
    // Atribuir o conteúdo HTML com os links das fotos
    foto1.innerHTML = `<img src="${Foto1}" alt="Foto" class="foto-perfil p-1" />`;
    foto2.innerHTML = `<img src="${Foto2}" alt="Foto" class="foto-perfil p-1 " />`;
    foto3.innerHTML = `<img src="${Foto3}" alt="Foto" class="foto-perfil p-1 " />`;
    
    categoria.innerHTML = `<h1 class = "titulo" >${Tipo1}<h1/>`;
    categoria2.innerHTML = `<h1 class = "titulo" >${Tipo2}<h1/>`;
    categoria3.innerHTML = `<h1 class = "titulo" >${Tipo3}<h1/>`;
}