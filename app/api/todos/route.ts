import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse, NextRequest } from "next/server";

interface TodoData {
  title: string;
  description?: string;
}

export async function POST(req: NextRequest) {
    try {
      const { title, description }: TodoData = await req.json();
      await connectMongoDB();
      await Todo.create({ title, description });
      return NextResponse.json({ message: 'Todo created' }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating todo' }, { status: 500 });
    }
  }

export async function GET() {
  try {
    await connectMongoDB();
    const todos: TodoData[] = await Todo.find()
    return NextResponse.json({todos})
  } catch(error) {
    return NextResponse.json({error: 'Error fetching todos'}, {status: 500})
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id: string | null = req.nextUrl.searchParams.get('id') as string;
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }
    await connectMongoDB();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Todo deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting todo' }, { status: 500 });
  }
}