import Task from "../../models/tasks.model.js";


export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    
    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: error.message });
  }
};


