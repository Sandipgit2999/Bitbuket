import React from "react";
import { Routes, Route } from "react-router-dom";
import PostForm from "../Components/PostForm";
import UserForm from "../Components/UserForm";


const Allroutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/posts" element={<PostForm />} />
                 <Route path="/" element={<UserForm />} />
                
                <Route />
            </Routes>
        </div>
    );
};

export default Allroutes;