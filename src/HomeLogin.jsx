import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

function HomeLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState(""); // Estado para gerenciar mensagens de erro de login
  const [loading, setLoading] = useState(false); // Estado para indicar se o login está em processo

  // Simula dados de usuários do seu db.json
  const usersData = {
    "user": [
      {
        "id": "a0fb",
        "user": "teste",
        "pass": "123",
        "nome": "teste",
        "email": "teste@eemail.com"
      },
      {
        "id": "a0fc",
        "user": "teste2",
        "pass": "1233",
        "nome": "teste1",
        "email": "teste1@eemail.com"
      }
    ]
  };

  // Função para buscar dados do usuário pelo username
  const fetchUserData = async (username) => {
    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Procura o usuário pelo username nos dados simulados
    return usersData.user.find(u => u.user === username);
  };

  // Função para realizar o login
  const loginProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await fetchUserData(user);

      if (!userData || userData.pass !== pass) {
        setLoginError("Usuário ou senha incorretos. Por favor, tente novamente.");
        setLoading(false);
        return;
      }

      // Limpa o erro de login se autenticado com sucesso
      setLoginError("");

      // Redirecionar ou realizar outras ações após o login
      console.log('Usuário autenticado:', userData);
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setLoginError("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Mudança dos estados ao digitar no formulário:
  const handleUser = (e) => { setUser(e.target.value); };
  const handlePass = (e) => { setPass(e.target.value); };

  return (
    <>
      <LoginForm
        user={user}
        pass={pass}
        handleUser={handleUser}
        handlePass={handlePass}
        loginProduct={loginProduct}
        loading={loading}
      />

      {/* Exibe mensagem de erro de login, se houver */}
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </>
  )
}

export default HomeLogin;
