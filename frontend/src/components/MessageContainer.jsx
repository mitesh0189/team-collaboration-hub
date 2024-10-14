import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {selectedUser !== null ? (
                <div className='md:min-w-[550px] flex flex-col bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden'>
                    {/* Header with Avatar and User Info */}
                    <div className='flex gap-4 items-center bg-zinc-700 text-white px-5 py-3 mb-3 shadow-md'>
                        <div className='relative'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full border-2 border-gray-300 overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            {isOnline && (
                                <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>
                            )}
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-xl font-semibold'>{selectedUser?.fullName}</p>
                            <p className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                                {isOnline ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>

                    {/* Messages Section */}
                    <div className='flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg shadow-inner'>
                        <Messages />
                    </div>

                    {/* Input Section */}
                    <div className='bg-zinc-700 px-5 py-3'>
                        <SendInput />
                    </div>
                </div>
            ) : (
                <div className='md:min-w-[550px] flex flex-col justify-center items-center bg-gray-900 text-white rounded-lg shadow-lg p-8'>
                    <h1 className='text-4xl font-bold mb-2 animate-bounce'>Hi, {authUser?.fullName}!</h1>
                    <h2 className='text-2xl'>Let's start a conversation</h2>
                </div>
            )}
        </>
    );
};

export default MessageContainer;
