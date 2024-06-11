import classes from './ProductTable.module.css'

export default function UserTable({products, deleteProduct, editProduct}) {

    return (
        <div className={classes.table_container}>
            <h2>Lista de Produtos</h2>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Cod.</th>
                        <th>Usuário</th>
                        <th>Senha</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th style={{textAlign: 'center'}}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.user}</td>
                            <td>{prod.pass}</td>            
                            <td>{prod.nome}</td>
                            <td>{prod.email}</td> 
                            <td className={classes.actions}>
                            <button onClick={() => editProduct(prod.id)}>Editar</button>
                            <button onClick={() => deleteProduct(prod.id)}>Excluir</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}