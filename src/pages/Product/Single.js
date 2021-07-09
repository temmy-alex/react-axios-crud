import React from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function Single() {
    const history = useHistory()
    const { productId } = useParams();
    const [product, setProduct] = React.useState({
        name: '',
        price: 0,
        stock: 1,
        status: true
    });

    React.useEffect(() => {
        axios.get(`http://localhost:5000/product/${productId}`)
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
    }, [productId])

    const handleDelete = async (id) => {
        if (window.confirm('Yakin mau dihapus?')) {
            try {
                const response = await axios.delete('http://localhost:5000/product/' + id)
                const { message } = response.data
                alert(message)
                history.push('/product')
            } catch (error) {
                alert('Network Error')
            }
        }
    }

    return (
        <div>
            <h2 className="mb-4">Halaman Single Product</h2>
            <table className="table table-bordered">
                <tr>
                    <td style={{ width: "9em" }}>Nama Produk</td>
                    <td>{product.name}</td>
                </tr>
                <tr>
                    <td>Harga</td>
                    <td>{product.price}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>
                        {product.status ? 'On' : 'Off'}
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button onClick={() => handleDelete(product._id)} className="btn btn-danger">Delete</button>
                        <button onClick={() => history.push('/product')} className="btn btn-success">&laquo; Back</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Single
