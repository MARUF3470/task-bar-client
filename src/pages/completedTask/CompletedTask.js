import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import Completed from './Completed';

const CompletedTask = () => {
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('https://task-bar-server-maruf3470.vercel.app/tasks')
            const data = await res.json();
            console.log(data)
            return data;
        }
    })
    const handleDelete = (id) => {
        const deleteConfirm = window.confirm('Do You want to delete this task')
        console.log(deleteConfirm)
        if (!deleteConfirm) {
            return
        }
        fetch(`https://task-bar-server-maruf3470.vercel.app/deletetasks/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success("Successfully deleted Your Task.");
                }
                refetch()
            })
    }
    return (
        <div className='w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2'>
            {
                tasks.map(task => <Completed key={task.id} task={task} handleDelete={handleDelete} refetch={refetch}></Completed>)
            }
        </div>
    );
};

export default CompletedTask;