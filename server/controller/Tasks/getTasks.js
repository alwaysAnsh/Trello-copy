import Task from '../../models/tasks.model.js'

export const getUserTasks = async (req, res) => {
  try {
    // console.log("req.user inside getapi: ", req.user);
    // console.log("inside getapi");
    const userId = req.params.id;
    // console.log("userId inside getapi: ", userId);

    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (error) {
    console.log("error inside getapi");
    res.status(500).json({ error: error.message });
  }
};
