import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Completed = ({ task, handleDelete, refetch }) => {
    const navigate = useNavigate()
    console.log(task)
    const handleCompletedTask = () => {
        fetch(`https://task-bar-server-maruf3470.vercel.app/tasks/${task?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskCompleted: false })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Task UnCompleted')
                    refetch()
                    navigate('/mytasks')
                }
            })
    }
    const handleComment = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value;
        // console.log(comment)
        fetch(`https://task-bar-server-maruf3470.vercel.app/tasks/comments/${task?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: comment })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('commentAdded')
                    refetch()
                    event.target.reset()
                }
            })
    }
    return (
        <div>
            {
                task?.completedTask &&
                <div>
                    <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={task?.image} alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task?.taskName}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task?.taskDetails}</p>
                            <div>
                                <button onClick={() => handleDelete(task._id)} className='w-28 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>Delete</button>
                                <button onClick={handleCompletedTask} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Undone</button>
                            </div>
                            <p className='text-sm text-lime-600'>Comment: {task.comments}</p>
                        </div>

                    </div>
                    <form onSubmit={handleComment}>
                        <div className="relative">
                            <input type="text" name='comment' id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="comment" required />
                            <input type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value='post' />
                        </div>
                    </form>
                </div>

            }
        </div >
    );
};

export default Completed;