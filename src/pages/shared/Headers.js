import { Navbar, Tooltip } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiTask } from 'react-icons/bi';
import { AuthContext } from '../../components/context/AuthProvider/AuthProvider';
// import { useThemeSwitcher } from 'react-css-theme-switcher';


const Headers = () => {
    const { user, logOut } = useContext(AuthContext)


    // const { switcher, themes, currentTheme, status } = useThemeSwitcher();
    // const [isDarkMode, setIsDarkMode] = React.useState(false);
    // if (status === 'loading') {
    //     return <div>Loading styles...</div>;
    // }
    // const toggleDarkMode = () => {
    //     setIsDarkMode(previous => {
    //         switcher({ theme: previous ? themes.light : themes.dark });
    //         return !previous;
    //     });
    // };

    const handleLogout = () => {
        logOut()
            .then(res => { })
            .catch(err => console.log(err))
    }
    return (

        <Navbar fluid={true}
            rounded={true}>

            <Navbar.Brand>
                <BiTask className='text-4xl text-green-600'></BiTask>

                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Task Bar
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Link to='/'>Home</Link>
                <Link to='/addtask'>Add Task</Link>
                <Link to='/mytasks'>My Task</Link>
                <Link to='/completedtask'>Completed Task</Link>
                {
                    user?.email ? <Link onClick={handleLogout}>Logout</Link> : <><Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link></>
                }
                {/* <div>
                    <Tooltip content={user?.displayName} className='mx-auto'>
                        <img className="w-10 h-10 rounded-full m-0" src={user?.photoURL} alt="" />
                    </Tooltip>
                </div> */}
            </Navbar.Collapse>
        </Navbar >

    );
};

export default Headers;