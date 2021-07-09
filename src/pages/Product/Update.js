import axios from 'axios';
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

function Update() {
    const history = useHistory();
    // Ini berasal dari url '/product/single/:productId' yang terdapat di routes.js 
    const { productId } = useParams();
    const [product, setProduct] = React.useState({
        name: '',
        price: 0,
        stock: 1,
        status: true
    })

    // Update data berasal dari api
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

    // Menangkap nilai dari form menggunakan useState product dan handleChange form
    const handleChange = (e, name) => {
        const value = e.target.value;
        setProduct({...product, [name]: value})
    }

    // Mengambil data dari backend
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Tangkap data state form transfer ke api put product
            const response = await axios.put(`http://localhost:5000/product/${productId}`, product)

            // Dapat dari response api backend
            const { status, message } = response.data

            // Lakukan pengecekkan status dari api
            if (status === 'success') {
                alert(message)

                // Asal dari useHistory react router dom yang di deklarasi diatas
                // /product berasal dari router yang dibuat di file routes.js
                history.push('/product')
            } else {
                alert(message)
            }
        } catch (error) {
            alert('Network Error')
        }
    }

    return (
        <div>
            <h2>Halaman Form Update Product</h2>
            <form>
                <div className="form-group mt-4">
                    <label>Name</label>
                    <input type="text" className="form-control" value={product.name} size={50} onChange={(e) => handleChange(e, 'name')} />
                </div>

                <div className="form-group mt-4">
                    <label>Price</label>
                    <input type="number" className="form-control" value={product.price} onChange={(e) => handleChange(e, 'price')} />
                </div>

                <div className="form-group mt-4">
                    <label>Stock</label>
                    <input type="number" className="form-control" size={30} value={product.stock} onChange={(e) => handleChange(e, 'stock')} />
                </div>

                <div className="form-group mt-4">
                    <label>Status</label>
                    <select className="form-control" value={product.status} onChange={(e) => handleChange(e, 'status')}>
                        <option value={false}>Off</option>
                        <option value={true}>On</option>
                    </select>    
                </div>

                <button onClick={handleSubmit} className="btn btn-primary mt-4">Submit</button>
                <button onClick={() => history.push('/product')} className="btn btn-success mt-4 mr-2">Back</button>
            </form>
        </div>
    )
}

export default Update
