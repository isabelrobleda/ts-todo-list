import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse, NextRequest } from "next/server";

interface TodoData {
    newTitle: string;
    newDescription?: string;
}

interface TodoDataGet {
    title: string;
    description?: string;
}

export async function PUT(req: NextRequest, {params}: {params: any}){
    try{
        const {id}: {id: string | null} = params;
        const { newTitle: title, newDescription: description }: TodoData = await req.json();
        await connectMongoDB();
        await Todo.findByIdAndUpdate(id, {title, description});
        return NextResponse.json({message: 'Todo updated'}, {status: 200})
    } catch(error){
        return NextResponse.json({error: 'Error updating todo'}, {status: 500})
    }
    
}

export async function GET(req: NextRequest, {params}: {params: any}){
    try{
        const {id}: {id: string | null} = params;
        await connectMongoDB();
        const todo: TodoDataGet | null = await Todo.findOne({_id: id});
        return NextResponse.json({todo});
    } catch(error){ 
        return NextResponse.json({error: 'Error fetching todo'}, {status: 500})
    }
}
