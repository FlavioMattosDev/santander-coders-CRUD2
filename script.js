const usuarios = [];

function adicionarUsuario(login, senha) {
	usuarios.push({ login, senha });
}

function verificarLogin(usuario, senha) {
	for (let i = 0; i < usuarios.length; i++) {
		if (usuarios[i].login === usuario && usuarios[i].senha === senha) {
			return true;
		}
	}
}

document.getElementById('btnCadastrar').addEventListener('click', function () {
	const novoUsuario = document.getElementById('novoUsuario').value;
	const novaSenha = document.getElementById('novaSenha').value;

	if (novoUsuario.trim() === '' || novaSenha.trim() === '') {
		alert('Preencha todos os campos para cadastrar.');
	} else {
		adicionarUsuario(novoUsuario, novaSenha);
		alert('Usuário cadastrado com sucesso.');
		document.getElementById('novoUsuario').value = '';
		document.getElementById('novaSenha').value = '';
	}
});

document.getElementById('btnLogar').addEventListener('click', function () {
	const pegaUsuario = document.getElementById('usuario').value;
	const pegaSenha = document.getElementById('senha').value;

	if (verificarLogin(pegaUsuario, pegaSenha)) {
		alert('Login bem-sucedido.');
		window.location.href = '/crud/crud.html';
	} else {
		alert('Usuário ou senha incorretos.');
	}
});
