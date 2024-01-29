import EditTodoForm from '@/components/EditTodoForm'
import React from 'react'

const updateTodo = async (id: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, 
    {cache : 'no-store'})
    if(!res.ok){
      throw new Error("Failed to update")
    }
    return res.json()
  } 
  catch (error) {
    console.log(error)
}}

const editTodo = async ({params}: {params: any}) => {
  const {id} = params
  const {todo} = await updateTodo(id)
  const {title, description} = todo

  return (
    <EditTodoForm id={id} title={title} description={description} />
  )
}

export default editTodo