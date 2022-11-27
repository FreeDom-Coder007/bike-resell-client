import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify'; 
import { AuthContext } from '../Contexts/AuthProvider';

const MyProducts = () => {
    const {user} = useContext(AuthContext) 

    const {data: myProducts = [], refetch} = useQuery({
        queryKey: ['myProducts', user?.displayName],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4000/myProducts?sellerName=${user?.displayName}`)
            const data = await res.json()
            return data;
        }
    })

    const handleDeleteProduct = (id) => {
        fetch(`http://localhost:4000/products/${id}`, {
            method: 'DELETE', 
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){ 
            toast.success(<h1 className='text-center'>Product Deleted</h1>, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            refetch() 
          }
        })
    }

    const handleAdvertise = (myProduct) => { 
        fetch(`http://localhost:4000/advertised-products`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myProduct)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                toast.success(<h1 className='text-center'>Product Advertised</h1>, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });  
            }
        })
    }
        
    return (
        <div className="overflow-x-auto w-full border h-5/6"> 
        <table className="table w-full"> 
          <thead>
            <tr>
              <th></th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Original Price</th>
              <th>Selling Price</th>
              <th>Advertise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> 
            {
                myProducts.map((myProduct, i) => <tr key={myProduct._id}>
                    <th>{1+i}</th>
                    <td>
                     <div className="avatar">
                       <div className="w-14 rounded-full">
                          <img src={myProduct.image} alt=''/>
                       </div>
                     </div>
                    </td> 
                    <td>{myProduct.product_name}</td>
                    <td>{myProduct.original_price}</td>
                    <td>{myProduct.resell_price}</td>
                    <td><button onClick={() => handleAdvertise(myProduct)} className='btn btn-sm bg-black'>Advertise</button></td>
                    <td><button onClick={() => handleDeleteProduct(myProduct._id)} className='btn btn-sm bg-black'>Delete</button></td>
                  </tr>)
            }
          </tbody>          
        </table>
        </div>
    )

}

export default MyProducts;