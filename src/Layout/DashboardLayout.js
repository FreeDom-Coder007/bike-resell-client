import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider'; 
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext)
    
    const [appUser, setAppUser] = useState({})
    useEffect(() => {
      fetch(`http://localhost:4000/users?email=${user?.email}`)
      .then(res => res.json())
      .then(data => setAppUser(data))
    }, [user?.email]) 

    return (
        <section>
        <Navbar/>      
        <div className="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content"> 
             <Outlet/> 
            </div> 
            <div className="drawer-side">
             <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>             
             <ul className="menu p-4 w-80 bg-base-100 text-base-content"> 
              {   appUser && 
                  appUser?.role === 'admin' ?
                  <React.Fragment>
                  <li><Link to='/dashboard/allBuyers'>All Buyers</Link></li>
                  <li><Link to='/dashboard/allSellers'>All Sellers</Link></li>
                  <li><Link to='/dashboard/reportedItems'>Reported items</Link></li>
                 </React.Fragment>
                 : 
                  appUser?.role === 'Seller' ? 
                 <React.Fragment>
                  <li><Link to='/dashboard/myOrders'>My orders</Link></li>
                  <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                  <li><Link to='/dashboard/addProduct'>Add Product</Link></li> 
                 </React.Fragment>
                 : 
                 <li><Link to='/dashboard/myOrders'>My orders</Link></li>
              }
             </ul> 
            </div>
        </div>
        </section>
       )

}

export default DashboardLayout;