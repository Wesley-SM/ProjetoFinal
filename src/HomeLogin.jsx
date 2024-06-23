import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomeLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState(""); // Estado para gerenciar mensagens de erro de login
  const [loading, setLoading] = useState(false); // Estado para indicar se o login está em processo
  const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
  const navigate = useNavigate();

  // Função para buscar dados do usuário pelo username através de uma requisição GET
  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/user?user=${username}`);
      return response.data[0]; // Supondo que o servidor responde com um array de usuários e pegamos o primeiro (assumindo que há apenas um usuário com o mesmo username)
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      throw new Error('Erro ao buscar dados do usuário');
    }
  };

  // Efeito para carregar os dados do usuário ao montar o componente
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData(user);
        setUserData(data);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

  // Função para realizar o login
  const loginProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!userData || userData.pass !== pass) {
        setLoginError("Usuário ou senha incorretos. Por favor, tente novamente.");
        setLoading(false);
        return;
      }

      // Limpa o erro de login se autenticado com sucesso
      setLoginError("");

      // Redirecionar para /products após o login
      navigate('/products');

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
