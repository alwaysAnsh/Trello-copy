import Task from '../../models/tasks.model.js'
import User from '../../models/user.model.js'

export const deleteTask = async (req, res) => {
  try {
    console.log("inside delete api")
    const taskId = req.params.id;
    const userId = req.user.id;
    

    await Task.findByIdAndDelete(taskId);

    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
