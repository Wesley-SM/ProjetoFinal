import { useState, useEffect } from 'react'

import './App.css'
import UserTable from './components/UserTable'
import UserForm from './components/UserForm'

// CRUD COM JSON SERVER

function HomeUser() {  
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const url = 'http://localhost:3000/user';

  useEffect(() => {
    // Lista todos os produtos:
    const getProductsList = async() => {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }

    getProductsList();

  }, []);

  const clearForm = () => {
    setUser("");
    setPass("");
    setNome("");
    setEmail("");
  }

  // Busca apenas um produto pelo seu id:
  const getProductById = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    // Carrega os dados no formulário para edição:
    setId(data.id);
    setUser(data.user)
    setPass(data.pass);
    setNome(data.nome);
    setEmail(data.email);

    // Habilita edição:
    setEdit(true);
  }

  const saveProduct = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ user, pass, nome, email })
    }

    // Cria url para buscar todos ou apenas um produto
    const save_url = edit ? url + `/${id}` : url;

    // Faz a requisição http
    const res = await fetch(save_url, saveRequestParams);

    // Se for cadastro de produto novo:
    if(!edit) { 
      const newProduct = await res.json();
      // Atualização da tabela:
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }

    // Se for edição/atualização de produto já cadastrado:
    if(edit) {       
      const editedProduct = await res.json();
      // Atualização da tabela:
      const editedProductIndex = products.findIndex(prod => prod.id === id);
      products[editedProductIndex] = editedProduct;
      setProducts(products);
   }

    clearForm();
    setEdit(false);
  }

  const deleteProduct = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    });

    const deletedProduct = await res.json();
    // Atualização da tabela:
    setProducts(products.filter(prod => prod.id !== deletedProduct.id));
  }

  // Mudança dos estados ao digitar no formulário:
  const handleUser = (e) => {setUser(e.target.value)};
  const handlePass = (e) => {setPass(e.target.value)};
  const handleNome= (e) => {setNome(e.target.value)};
  const handleEmail = (e) => {setEmail(e.target.value)};

  return (
    <>
     <div>
        {
          products.length > 0 ? <UserTable products={products} deleteProduct={deleteProduct} editProduct={getProductById} /> : <h3 style={{marginBottom: '30px'}}>Nenhum usuário cadastrado...</h3>
        }
      </div>

      <UserForm user={user} pass={pass} nome={nome} email={email} handleUser={handleUser} handlePass={handlePass} handleNome={handleNome} handleEmail={handleEmail} saveProduct={saveProduct}/>
    </>
  )
}

export default HomeUser