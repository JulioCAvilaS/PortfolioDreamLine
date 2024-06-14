const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

let user = require('./db.json');

// Endpoint para obter usuários
app.get('/user', (req, res) => {
    res.json(user);
});

// Endpoint para atualizar um usuário
app.patch('/user/:id', (req, res) => {
    console.log(`Recebido PATCH para /user/${req.params.id}`);
    console.log('Corpo da solicitação:', req.body);

    let id = parseInt(req.params.id, 10);
    let userUpdate = user.find(el => el.id === id);

    if (!userUpdate) {
        return res.status(404).json({ status: "erro", message: "Usuário não encontrado" });
    }

    Object.assign(userUpdate, req.body);
    let index = user.indexOf(userUpdate);
    user[index] = userUpdate;

    fs.writeFile('./db.json', JSON.stringify(user, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "erro", message: "Erro ao escrever no arquivo" });
        }
        res.status(200).json({
            status: "sucesso",
            db: userUpdate
        });
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


