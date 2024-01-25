import React from 'react'
import Link from 'next/link' 
import { HiPencilAlt } from "react-icons/hi";
import Removebtn from './Removebtn';

function TodoList() {
  return (
    <div className='p-4 border border-slate-300 flex justify-between'>
            <div>
                <h2 className='font-bold text-2xl'>Title</h2>
                <p>Description</p>
            </div>
        
            <div className='flex gap-2 items-start'>
                <Removebtn />
                <Link href = {`/editTodo/123`} ><HiPencilAlt size={24}/></Link>
            </div>
        </div>
  )
}

export default TodoList