import React from 'react'

function Update() {
    return (
        <div>
            <h2>Halaman Form Update Product</h2>

            <form>
                <label>Name</label>
                <input type="text" />

                <label>Price</label>
                <input type="text" />

                <label>Stock</label>
                <input type="text" />

                <label>Status</label>
                <select>
                    <option value="">-- Choose Status --</option>
                    <option value="">Off</option>
                    <option value="">On</option>
                </select>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default Update
