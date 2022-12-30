import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthProvider/AuthProvider';

const Register = () => {
    const { registretion, updateUserProfile } = useContext(AuthContext)
    const [registrationError, setRegistrationError] = useState('')
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleRegisterForm = (data, event) => {
        event.preventDefault()
        console.log(data)
        if (data.password !== data.cPassword) {
            return
        }
        const imageApiKey = 'f19f239d33bdbe964f4328a96c74aee3'
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageApiKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const profile = {
                        displayName: data.name,
                        photoURL: imageData.data.url
                    }
                    registretion(data.email, data.password)
                        .then(res => {
                            const user = res.user;
                            toast.success('Your account created Successfully')
                            updateUser(profile)
                        })
                        .catch(err => {
                            console.error(err)
                            setRegistrationError(err.message)
                        })
                }
            })
    }
    const updateUser = profile => {
        updateUserProfile(profile)
            .then(() => {
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <form onSubmit={handleSubmit(handleRegisterForm)} className='w-3/4 lg:w-1/2 mx-auto my-8'>
            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <input {...register('email', { required: 'You must need to use your email' })} type="email" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your email here" />
            </div>
            {errors.email && <p className='text-red-500 text-sm ' >{errors.email.message}</p>}
            <label htmlFor="website-admin" className="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    @
                </span>
                <input {...register('name', { required: 'Put your username' })} type="text" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your name" />
            </div>
            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
            <label htmlFor="website-admin" className="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">Your Image</label>
            <input {...register('image', { required: 'Give your image' })} type="file" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your name" />
            {errors.image && <p className='text-red-500 text-sm'>{errors.image.message}</p>}
            <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6">Password</label>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    *
                </span>
                <input type="password"  {...register('password', { required: 'Give a password' })} id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your password" />
            </div>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6">Confirm Password</label>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    *
                </span>
                <input type="password" {...register('cPassword', { required: 'Re-enter the password' })} id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm your password" />
            </div>

            {errors.cPassword && <p className='text-red-500 text-sm'>{errors.cPassword.message}</p>}
            <p className='text-red-500 text-sm'>{registrationError}</p>
            <div className='w-1/2 mx-auto mt-6'>
                <input type="submit" className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" value='Register' />
            </div>
            <p>Do you already have an account? <Link className='text-green-600' to='/login'>Login</Link></p>
        </form>
    );
};

export default Register;