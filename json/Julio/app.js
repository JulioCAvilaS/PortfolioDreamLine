let linkInsta;
let linkEmail;
let linkWhatsApp;

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const portId = urlParams.get('id');

    // Verificar se o ID foi fornecido
    if (!portId) {
        document.getElementById('teste').innerText = 'Repositório não encontrado.';
    } else {
        // Função para buscar detalhes do usuário
        async function fetchRepoDetails(portId) {
            try {
                const response = await fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${portId}`);
                if (!response.ok) {
                    throw new Error('Usuário não encontrado');
                }
                const data = await response.json();
                imprimeDados(data); // Chama a função imprimeDados com os dados obtidos
            } catch (error) {
                document.getElementById('repo-details').innerText = error.message;
            }
        }

        fetchRepoDetails(portId); // Chama a função para buscar os detalhes do usuário
    }
};

function imprimeDados(data) {
    const nome = document.getElementById('nome');
    const estudio = document.getElementById('estudio');
    const endereco = document.getElementById('endereco');
    const bio = document.getElementById('bio');
    const fotoPerfil = document.getElementById('foto-perfil');
    const fotoTattoo1 = document.getElementById('fotos1');
    const fotoTattoo2 = document.getElementById('fotos2');

    const { nome: nomeContato, estudio: estudioContato, end: enderecoContato, bio: bioContato, fotoperfil, fotos, insta: instaContato, email: emailContato, whatsapp: whatsappContato } = data;

    // Atribuir os links às variáveis globais
    linkInsta = instaContato;
    linkEmail = emailContato;
    linkWhatsApp = whatsappContato;

    nome.innerHTML = `<p>${nomeContato}</p>`;
    estudio.innerHTML = `<p>${estudioContato}</p>`;
    endereco.innerHTML = `<p>${enderecoContato}</p>`;
    bio.innerHTML = `<p>${bioContato}</p>`;
    fotoPerfil.innerHTML = `<img src="${fotoperfil}" alt="Foto" class="foto-perfil">`;

    fotoTattoo1.innerHTML = '';
    fotoTattoo2.innerHTML = '';
    for (let i = 0; i < fotos.length; i += 2) {
        fotoTattoo1.innerHTML += `<div class="card-trabalhos"><img src="${fotos[i]}" alt="Foto" class="foto-trabalhos"></div>`;
    }

    for (let i = 1; i < fotos.length; i += 2) {
        fotoTattoo2.innerHTML += `<div class="card-trabalhos"><img src="${fotos[i]}" alt="Foto" class="foto-trabalhos"></div>`;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM completamente carregado e analisado');

    const estrelaInputs = document.querySelectorAll('input[name="rate"]');
    let valorAvaliado = localStorage.getItem('estrelas') || null;

    // Marcar a estrela salva no localStorage
    if (valorAvaliado) {
        document.getElementById(`rate-${valorAvaliado}`).checked = true;
        console.log('Estrela carregada: ', valorAvaliado);
    }

    estrelaInputs.forEach(input => {
        input.addEventListener('change', () => {
            valorAvaliado = input.value;
            console.log('Estrela selecionada: ', valorAvaliado);

            // Salvar a classificação no localStorage
            localStorage.setItem('estrelas', valorAvaliado);

            // Enviar a classificação selecionada ao servidor
            fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ estrelas: valorAvaliado })
            })
                .then(response => {
                    console.log('Resposta recebida');
                    if (!response.ok) {
                        throw new Error('Erro ao enviar a classificação');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Classificação enviada com sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        });
    });
});

function abrirInstagram() {
    window.open(linkInsta, "_blank");
}

function abrirWhatsApp() {
    window.open(linkWhatsApp, "_blank");
}

function abrirEmail() {
    window.open(`mailto:${linkEmail}`, "_blank");
}
