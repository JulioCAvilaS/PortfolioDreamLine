let cat = 'Neo Trad';

async function getJSONServer() {
    const estilos = document.getElementById('card');
    try {
        let res = await fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user?categoria=${cat}`);
        let data = await res.json();

        let cardsHTML = '';

        for (let item of data) {
            cardsHTML += `
            <a class="link-underline link-underline-opacity-0" href="/json/Julio/port.html?id=${item.id}">
                <div class="col">
                    <div class="card">
                        <div id="card1" class="row py-4">
                            <div class="col-5 p-0">
                                <img id="img1" src="${item.fotos[0]}" width="200px" height="200px" class="img-fluid p-0" alt="foto1card1">
                            </div>
                            <div id="imagens" class="col-3 p-0">
                                <div class="divimg2">
                                    <img id="img2" src="${item.fotos[1]}" width="200px" height="200px" class="img-fluid p-0" alt="foto2card1">
                                </div>
                                <div class="divimg3">
                                    <img id="img3" src="${item.fotos[2]}" width="200px" height="200px" class="img-fluid p-0" alt="foto3card1">
                                </div>
                            </div>
                            <div class="col-1 order-first"></div>
                            <div class="col-1"></div>
                            <div class="col-1 order-first"></div>
                            <div class="col-1 order-last"></div>
                        </div>
                    </div>
                    <h5 id="titulo" class="card-title fw-light text-white">${item.nome}</h5>
                    <p id="subtitulo" class="card-text fw-light">${item.end}</p>
                </div>
            </a>
            `;
        }

        estilos.innerHTML = cardsHTML;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

getJSONServer();
