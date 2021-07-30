const router = require("express").Router();
const { TaskModel } = require("../models");

//!TEST ENDPOINT
router.get("/test", function (req, res) {
  res.send("Hey!! This is the task route!");
});

//! CREATE TASK
router.post("/create/:listId", async (req, res) => {
  const task = {
    description: req.body.description,
    owner: req.user.id,
    listId: req.params.listId,
  };
  try {
    const taskEntry = await TaskModel.create(task);

    res.status(200).json({
      message: "New task has successfully been created!",
      taskEntry,
    });
  } catch (err) {
    res.status(500).json({
      message: `Task could not be created: ${err}`,
    });
  }
});

//! UPDATE TASK BY ID
router.put("/update/:id", async (req, res) => {
  const task = {
    description: req.body.description,
  };

  const query = { where: { id: req.params.id } };

  TaskModel.update(task, query)
    .then((list) =>
      res.status(200).json({ message: "Your task has been updated!", list })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//! DELETE TASK BY ID
router.delete("/delete/:id", (req, res) => {
  const query = { where: { id: req.params.id } };

  TaskModel.destroy(query)
    .then((task) => res.status(200).json({ message: "Yeet that Task!" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
