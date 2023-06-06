import Home from "../pages/Main/Home";
import MainRoot from "../pages/Main/MainRoot";
import NotFound from "../pages/Main/NotFound ";
import Products from "../pages/Main/Products";
import Register from "../pages/Main/Register";
import AdminRoot from '../pages/Admin/AdminRoot'
import Login from "../pages/Admin/Login";
import Basket from "../pages/Main/Basket";

export const ROUTES=[
    {
        path:'/',
        element:<MainRoot/>,
        children:[
            {
                path:'',
                element:<Home/>,
            },
            {
                path:'products',
                element:<Products/>,
            },
            {
                path:'register',
                element:<Register/>,
            },
            {
                path:'*',
                element:<NotFound/>,
            },
        ]
    },
{
    path:'/admin',
    element:<AdminRoot/>,
    children:[
        {
            path:'',
            element:<Home/>,
        },
        {
            path:'products',
            element:<Products/>,
            },
            {
                path:'basket',
                element:<Basket/>,
                },
            {
                path:'login',
                element:<Login/>,
            }
    ]
}
]