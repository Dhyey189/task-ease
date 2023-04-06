import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import mindpeace from "../data/mindpeace.jpg"
import getWithExpiry from "../utils/GetWithExpiry";
import {FaPlus} from "react-icons/fa"
const Welcome = () => {
    const user = getWithExpiry("user")
    return (
    <div className=" m-4">
        <div className="ml-10"><p className="text-3xl">Welcome user.</p>
        <p className="text-lime-700">Add New Task <Link to="/app/new-task"><FaPlus/></Link></p>
        </div>
        <div className="ml-56 mt-24">
            <img src={mindpeace}/>
            <p className="text-center w-1/2">
                <p className="font-bold">
                Your peace of mind is priceless
                </p>
                <p>Well done, {user.name}! 
                All your tasks are organized 
                in the right place.</p>
            </p>
        </div>
    </div>)
};

export default Welcome