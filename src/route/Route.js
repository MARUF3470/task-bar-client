import AddTask from "../pages/AddTask/AddTask";
import CompletedTask from "../pages/completedTask/CompletedTask";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import MyTask from "../pages/My Tasks/MyTask";
import Register from "../pages/Register/Register";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layout/Main");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addtask',
                element: <AddTask></AddTask>
            },
            {
                path: '/mytasks',
                element: <MyTask></MyTask>
            },
            {
                path: '/completedtask',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }

        ]
    }
])

export default router