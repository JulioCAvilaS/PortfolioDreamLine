

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    
    const email = document.getElementById('e-mail').value;
    const senha = document.getElementById('senha').value;
    const nascimento = document.getElementById('nascimento').value;
    const tipo = document.getElementById('tipo').value;
    let nome = "";
    let bio = "";
    let exp = "";
    let end = "";
    let insta = "";
    let face = "";
    let categoria = "";
    let foto = "";

    // Função de validação de email
    function validaMail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function campoEstaVazio(valor) {
        return valor.trim() === '';
    }

    // Chame a função de validação de email
    if (!validaMail(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    if (campoEstaVazio(email) || campoEstaVazio(senha) || campoEstaVazio(nascimento) || campoEstaVazio(tipo)) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }



    try {
        const usersResponse = await fetch('http://localhost:3000/users');
        const users = await usersResponse.json();

        function emailExistente(email, users) {
            return users.some(user => user.email === email);
        }

        if (emailExistente(email, users)) {
            alert('Este email já está registrado. Por favor, use outro email.');
            return;
        }





        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha, nascimento, tipo, nome, bio, exp, end, insta, face, categoria, foto })
        });

        if (response.ok) {
            alert('Usuário registrado com sucesso!');
        } else {
            alert('Erro ao registrar usuário');
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao registrar usuário');
    }
});