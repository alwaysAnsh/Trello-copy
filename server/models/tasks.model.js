import mongoose from 'mongoose'


const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Under Review', 'Completed'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'Urgent'],
    required: true,
  },
  deadline: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now()
  },
  updatedAt:{
    type: Date,
    default: Date.now()
  }
}, {timestamps:true});
const Task = mongoose.model('Task',taskSchema)

export default Task;
