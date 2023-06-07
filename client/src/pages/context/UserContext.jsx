import React, { createContext, useEffect, useState } from 'react';
import { deleteUserById, getUsers, updateUserById } from '../api/requests';
import swal from 'sweetalert';

const UserContext = createContext();


const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        role: "unlogged",
        cart: [],
        likes: []
    });
    useEffect(() => {
        getUsers()
            .then(data => {
                setUsers(data)
            });
        const loginUser = localStorage.getItem("user");
        if (loginUser) {
            setUser(JSON.parse(loginUser))
        }
        else {
            setUser({
                role: "unlogged",
                cart: [],
                likes: []
            })
        }
    }, []);
    const getUser = (userEmail) => {
        localStorage.setItem('user', JSON.stringify(users.filter(user => user.email === userEmail)[0]))
    }
    const sweetAlert = (title, text, type) => {
        swal({
            title: title,
            text: text,
            icon: type,
        });
    }
    const deleteUser = async (id) => {
        await deleteUserById(id);
    }
    const updateUser = async (user) => {
        await updateUserById(user);
    }

    const value = {
        users,
        setUsers,
        sweetAlert,
        getUser,
        setUser,
        user,
        deleteUser,
        updateUser
    };


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };