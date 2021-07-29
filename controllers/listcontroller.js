const router = require("express").Router();
const { ListModel, TaskModel } = require("../models");
const chalk = require("chalk");


//! TEST ENDPOINT
router.get("/test", function (req, res) {
  res.send("Hey!! This is the list route!");
});


//! CREATE LIST
router.post("/create", async (req, res) => {
  const { title, description } = req.body;
  const listEntry = {
    title: title,
    description: description,
    owner: req.user.id,
  };

  try {
    const newList = await ListModel.create(listEntry);

    res.status(200).json({
      message: "New list has successfully been created!",
      newList,
    });
  } catch (err) {
    chalk.redBright(
      res.status(500).json({
        message: `List could not be created: ${err}`,
      })
    );
  }
});


//! GET ALL LISTS FROM SINGLE USER
router.get("/", async (req, res) => {
  try {
    const allLists = await ListModel.findAll({
      where: { owner: req.user.id }
    })

    if (allLists.length === 0 || null) {
      return res.status(204).json({
        message: "You do not have any lists yet. Go make some!",
      })
    } else {
      return res.status(200).json({
        message: "Lists have successfully been retrieved",
        allLists,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Lists could not be created: ${err}`,
    });
  }
});


//! GET ALL TASKS WITH SINGLE CORRESPONDING LIST BY ID
router.get("/tasklist/:listId", async (req, res) => {
  try {
    const list = await ListModel.findOne({
      where: { owner: req.user.id }
    })

    if (list.length === 0 || null) {
      return res.status(204).json({
        message: "You do not have any lists yet. Go make some!",
      })
    } else {
      const tasks = await TaskModel.findAll({
        where: {listId: req.params.listId}
      })
      if(tasks.length === 0 || null){
        return res.status(200).json({
          message: "You do not have any tasks for this list yet. Go make some!",
          list
        })
      } else{
        return res.status(200).json({
          message: "Lists and Tasks have successfully been retrieved!",
          list,
          tasks
        })
      }
    }

  } catch (err) {
    res.status(500).json({
      message: `Lists and tasks could not be retrieved: ${err}`,
    });
  }
});

//! GET ALL TASKS WITH ALL CORRESPONDING LISTS
router.get("/tasklist/:listId", async (req, res) => {
  try {
    const list = await ListModel.findOne({
      where: { owner: req.user.id }
    })

    if (list.length === 0 || null) {
      return res.status(204).json({
        message: "You do not have any lists yet. Go make some!",
      })
    } else {
      const tasks = await TaskModel.findAll({
        where: {listId: req.params.listId}
      })
      if(tasks.length === 0 || null){
        return res.status(200).json({
          message: "You do not have any tasks for this list yet. Go make some!",
          list
        })
      } else{
        return res.status(200).json({
          message: "Lists and Tasks have successfully been retrieved!",
          list,
          tasks
        })
      }
    }

  } catch (err) {
    res.status(500).json({
      message: `Lists and tasks could not be retrieved: ${err}`,
    });
  }
});

//! GET LIST BY TITLE
router.get("/:title", (req, res) => {
  let title = req.params.title;

  List.findAll({
    where: { title: title },
    include: [{ model: TaskModel, as: "tasks" }],
    required: true,
  })
    .then((lists) => res.status(200).json(lists))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


//! GET ALL TASKS WITH CORRESPONDING LIST BY TITLE


//! UPDATE LIST BY ID
router.put("/update/:id", (req, res) => {
  const list = {
    title: req.body.title,
    description: req.body.description,
  };

  const query = { where: { id: req.params.id } };

  List.update(list, query)
    .then((list) =>
      res.status(200).json({ message: "Your list has been updated", list })
    )
    .catch((err) => res.status(500).json({ error: err }));
});


//! DELETE LIST BY ID
router.delete("/delete/:id", (req, res) => {
  const query = { where: { id: req.params.id } };

  List.destroy(query)
    .then((lists) => res.status(200).json({ message: "Yeet that List!" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;