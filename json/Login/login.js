document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;

    fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user?email=${username}&senha=${password}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                const user = data[0];
                localStorage.setItem('user', JSON.stringify(user));
                alert('Login successful!');
                // Redirecionar para outra página ou realizar outra ação
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => console.error('Error:', error));
});
