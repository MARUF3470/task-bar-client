import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleTaskSubmit = (data, event) => {
        event.preventDefault()
        console.log(data)
        const imageApiKey = process.env.REACT_APP_imgkey
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
                console.log(imageData)
                if (imageData.success) {
                    const taskInfo = {
                        taskName: data.TaskName,
                        taskDetails: data.TaskDetails,
                        image: imageData.data.url
                    }
                    fetch('https://task-bar-server-maruf3470.vercel.app/tasks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(taskInfo),
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success('Your car added successfully')
                                event.target.reset()
                            }
                        })
                }
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleTaskSubmit)}>
                <div className='w-11/12 mx-auto my-5'>
                    <div className="mb-6">
                        <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                        <input type="text" {...register('TaskName', { required: 'Put a Task Name' })} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {errors.TaskName && <p className='text-red-500 text-sm'>{errors.TaskName.message}</p>}
                    </div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
                    <textarea {...register('TaskDetails', { required: 'Give Task details' })} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    {errors.TaskDetails && <p className='text-sm text-red-500'>{errors.TaskDetails.message}</p>}
                </div>
                <div className="flex items-center justify-center w-11/12 mx-auto mb-5">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input {...register('image', { required: 'Upload a image' })} id="dropzone-file" type="file" className="" />
                        {errors.image && <p className='text-sm text-red-500'>{errors.image.message}</p>}
                    </label>
                </div>
                <div className='w-1/2 mx-auto'>
                    <input type="submit" className=' text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5 w-full ' value="Submit Your task" />
                </div>
            </form>
        </div>
    );
};

export default AddTask;