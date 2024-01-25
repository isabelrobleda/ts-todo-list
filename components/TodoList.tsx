"use client"
import React, { useEffect, useState } from 'react';
import Removebtn from './Removebtn';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

interface Todo {
  _id: string;
  title: string;
  description: string;
}

interface TodoRes {
  todos : Todo[]
}

const getTodo = async (): Promise<Todo[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/todos", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch the Todos");
    }

    return res.json();
  }
  catch (err) {
    console.log(err);
    return [];
  }
};

const TodoList: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: TodoRes | undefined = await getTodo();
  
        if (fetchedData && Array.isArray(fetchedData.todos)) {
          console.log('Type of fetchedData.todos:', typeof fetchedData.todos);
          setTodos(fetchedData.todos);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      {todos ? (todos.map((t: Todo) => (
        <div className='p-4 border border-slate-300 flex justify-between' key={t._id}>
          <div>
            <h2 className='font-bold text-2xl'>{t.title}</h2>
            <p>{t.description}</p>
          </div>
          <div className='flex gap-2 items-start'>
            <Removebtn id={t._id} />
            <Link href={`/editTodo/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))) :
      (
        <div>Loading...</div>
      )
      }
    </div>
  );
}

export default TodoList;