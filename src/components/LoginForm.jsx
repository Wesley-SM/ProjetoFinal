import React from 'react';
import './ProductForm.css';

function LoginForm({ user, pass, handleUser, handlePass, loginProduct }) {
  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={(e) => loginProduct(e)}>
        <label className='form-label' htmlFor="usuario">Usuário:</label>
        <input className='form-input' value={user} type="text" name="usuario" onChange={(e) => handleUser(e)} required />
        <label className='form-label' htmlFor="senha">Senha:</label>
        <input className='form-input' value={pass} type="password" name="senha" onChange={(e) => handlePass(e)} required />
        <input className='form-submit' type="submit" value="Entrar" />
      </form>
    </div>
  );
}

export default LoginForm;
