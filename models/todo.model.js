import mongoose, { Document, Schema } from "mongoose";


const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum:["Todo","InProgress","UnderReview","Finished"],
        required: true,

    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "Urgent"],
    },
    deadline: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });


const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
