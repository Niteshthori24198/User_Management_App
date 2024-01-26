import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddUser from '../pages/AddUser'
import Home from '../pages/Home'
import User from '../pages/User'

function AllRouters() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/user' element={<User />} />
                <Route path='/add-user' element={<AddUser />} />
                <Route path='/edit-user/:userId' element={<AddUser />} />
            </Routes>
        </>
    )
}

export default AllRouters