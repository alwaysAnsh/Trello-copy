import Task from '../../models/tasks.model.js'
import User from '../../models/user.model.js'

export const createTask = async (req, res) => {
  try {
    console.log("create task appi hit!!");
    const { title, description, status, priority, deadline } = req.body;
    const userId = req.user.id;
    // console.log("userid in create api: ", userId)

    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      user: userId,
      
    });

    await task.save();

    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
};
