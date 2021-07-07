import axios from 'axios';
import React from 'react'
import { useHistory } from 'react-router-dom'

function Create() {
    // Buat redirect ke halaman tertentu
    const history = useHistory()

    // Buat menangkap value dari form
    const [product, setProduct] = React.useState({
        name: '',
        price: 0,
        stock: 1,
        status: true
    });

    // Buat menangkap nilai dari 
    const handleChange = (e, name) => {
        const value = e.target.value
        // State product diisi dengan nilai yang berasal dari form (menangkap nilai menggunakan event onChange)
        setProduct({ ...product, [name]: value })
    }

    // Event submit data ke api backend
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/product', product)
            const { status, message } = response.data;
            if (status === 'success') {
                alert(message)
                history.push('/product')
            } else {
                alert(message)
            }
        } catch(error) {
            alert('Network Error');
        }
    }

    return (
        <div>
            <h2>Halaman Form Create Product</h2>
            <form>
                <div className="form-group mt-4">
                    <label>Name</label>
                    <input type="text" className="form-control" size={50} value={product.name} onChange={(e) => handleChange(e, 'name')} />
                </div>

                <div className="form-group mt-4">
                    <label>Price</label>
                    <input type="number" className="form-control" value={product.price} onChange={(e) => handleChange(e, 'price')} />
                </div>

                <div className="form-group mt-4">
                    <label>Stock</label>
                    <input type="number" className="form-control" size={30} onChange={(e) => handleChange(e, 'stock')} />
                </div>

                <div className="form-group mt-4">
                    <label>Status</label>
                    <select className="form-control">
                        <option value="">-- Choose Status --</option>
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

export default Create
