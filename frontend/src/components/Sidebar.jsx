import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    }

    return (
        <div className='border-r border-blue-300 p-6 flex flex-col bg-blue-100 min-h-screen'>
            {/* Search Form */}
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-3 mb-6'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-full px-4 py-2 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
                    type="text"
                    placeholder='Search for users...'
                />
                <button type='submit' className='btn bg-blue-600 text-black hover:bg-blue-700 transition-transform transform hover:scale-105 rounded-full px-4 py-2 shadow-md'>
                    <BiSearchAlt2 className='w-6 h-6' />
                </button>
            </form>

            <div className="divider"></div>

            {/* Display other users */}
            <OtherUsers />

            {/* Logout Button */}
            <div className='mt-auto'>
                <button
                    onClick={logoutHandler}
                    className='btn bg-red-600 text-white hover:bg-red-700 transition-transform transform hover:scale-105 rounded-full px-4 py-2 shadow-md'>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
