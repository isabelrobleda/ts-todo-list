import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-3">
      <TodoList />
    </div>
  );
}
