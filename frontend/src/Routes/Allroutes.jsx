import React from "react";
import { Routes, Route } from "react-router-dom";


const Allroutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/posts" element={<PostForm />} />
                {/* <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> */}
                <Route />
            </Routes>
        </div>
    );
};

export default Allroutes;