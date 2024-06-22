import React from 'react'
import './ProductForm.css'

function UserForm({user, pass, nome, email, handleUser, handlePass, handleNome, handleEmail, saveProduct}) {
    return (
        <div className='container'>
        <h2>Cadastro de Usuario</h2>
        <form onSubmit={(e) => saveProduct(e)}>
            <label className='form-label' htmlFor="usuario">Usuário:</label>
            <input className='form-input' value={user} type="text" name="usuario" onChange={(e) => handleUser(e)} required/>
            <label className='form-label' htmlFor="senha">Senha:</label>
            <input className='form-input' value={pass} type="password" name="senha" onChange={(e) => handlePass(e)} required/>
            <label className='form-label' htmlFor="nomes">Nome:</label>
            <input className='form-input' value={nome} type="text" name="nomes" onChange={(e) => handleNome(e)} required/>
            <label className='form-label' htmlFor="mail">Email:</label>
            <input className='form-input' value={email} type="email" name="mail" onChange={(e) => handleEmail(e)} required/>
            <input className='form-submit' type="submit" value="Cadastrar" />
        </form>
      </div>
    )
}

export default UserForm
