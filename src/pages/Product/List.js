import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'

function List() {
    const [products, setProduct] = React.useState([])
    // Untuk mengakses url yang terdapat pada react router dom
    const history = useHistory()

    React.useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                const { status, message, data } = response.data
                if (status === 'success') {
                    setProduct(data)
                } else {
                    alert(message)
                }
            })
            .catch(error => {
                alert(error)
            })
    }, [])

    return (
        <div>
            <h2>Halaman List Product</h2>
            <a className="btn btn-success mt-4" href="/product/create">Create</a>
            <br /><br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, index) => {
                        return <tr key={index}>
                                <td><a href={`/product/single/${product._id}`}>{product.name}</a></td>
                                <td>{product.price}</td>
                                <td>
                                    <a href={`/product/update/${product._id}`} className="btn btn-primary">Edit</a>
                                </td>
                            </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default List
