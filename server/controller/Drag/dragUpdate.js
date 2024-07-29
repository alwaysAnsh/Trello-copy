import Task from '../../models/tasks.model.js'


export const dragUpdate = async (req, res) => {
    try {
      const { taskId,status } = req.body;
      // console.log("status of drag: ", status)
      const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
      // console.log("updatedTAsk: ", updatedTask)
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  