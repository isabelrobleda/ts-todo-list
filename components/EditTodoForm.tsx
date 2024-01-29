"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


function EditTodoForm({id, title, description}: {id: any, title: string, description: string}) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)

  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newTitle,newDescription})
      })

      if(!res.ok){
        throw new Error ("Failed to update todo")

      }
      router.push('/')
      router.refresh()
    } 
    catch (error) {
      console.log(error)
    }
  }
  return (
    <form 
    onSubmit={handleSubmit}
    className='flex flex-col gap-3 max-w-3xl mx-auto p-4'>
      <input 
        type="text" 
        className='border border-slate-500 px-8 py-2' 
        placeholder='Todo Title'
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        />
      <input 
        type="text" 
        className='border border-slate-500 px-8 py-2' 
        placeholder='Todo Description'
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        />
      <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit' type='submit'>Update Todo</button>
  </form>
  )
}

export default EditTodoForm