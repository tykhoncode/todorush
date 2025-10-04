import { Schema, model, InferSchemaType } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export type ITodo = InferSchemaType<typeof todoSchema>;
export const Todo = model<ITodo>("Todo", todoSchema);
