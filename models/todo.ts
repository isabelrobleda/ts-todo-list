import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description?: string;
}

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;