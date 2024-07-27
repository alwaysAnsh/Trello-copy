import Task from '../../models/tasks.model.js'

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, priority, deadline } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, priority, deadline },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
