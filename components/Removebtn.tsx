"use client"
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi';

function Removebtn({ id }: { id: any }) {

  const removeTodo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const confirm: any = window.confirm('Are you sure you want to delete this todo?')

    if (confirm) {
      try {
        const res = await fetch(`http://localhost:3000/api/todos?id=${id}`,
          {
            method: "DELETE"
          }
        )
        if (res.ok) {
          console.log("Deleted Successfully")
          await window.location.reload();
        }
      }
      catch (err) { console.log(err) }
    }

  }
  return (
    <button
      className='text-red-400'
      onClick={(e) => removeTodo(e)}
    ><HiOutlineTrash size={24} /></button>
  )
}

export default Removebtn