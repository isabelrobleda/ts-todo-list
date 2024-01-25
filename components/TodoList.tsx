import React, { useEffect, useState } from 'react';
import Removebtn from './Removebtn';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

interface Todo {
  _id: string;
  title: string;
  description: string;
}

const getTodo = async (): Promise<Todo[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/todos", { cache: "no-store" });
    
    if (!res.ok) {
      throw new Error("Failed to fetch the Todos");
    }

    const response = await res.json();

    console.log("Response from server:", res);

    if (!Array.isArray(response.todos)) {
      throw new Error("Invalid data format from the server");
    }

    return response.todos;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const TodoList: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: Todo[] = await getTodo();
        setTodos(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {todos && todos.map((t: Todo) => (
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
      ))}
    </div>
  );
};

export default TodoList;
