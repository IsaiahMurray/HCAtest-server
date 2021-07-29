const router = require("express").Router();
const {ListModel, TaskModel} = require("../models");

router.get("/test", function (req, res) {
  res.send("Hey!! This is the list route!");
});

router.post("/create", (req, res) => {
  const list = {
    title: req.body.title,
    description: req.body.description,
    owner: req.user.id,
  };
  List.create(list)
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/create", async(req, res) => {

    const {title, description} = req.body;
    const newList = {
      title: title,
      description: description,
      owner: req.user.id
    }
  try{
    List
  } catch(err) {

  }
})

router.get("/", (req, res) => {
  List.findAll({
    where: { owner: req.user.id },
  })
    .then((lists) => {
      if (lists.length === 0 || null) {
        return res.status(200).json("You do not have any lists");
      } else {
        res.status(200).json(lists);
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:title", (req, res) => {
  let title = req.params.title;

  List.findAll({
    where: { title: title },
    include: [{ model: Task, as: "tasks" }],
    required: true,
  })
    .then((lists) => res.status(200).json(lists))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

  
router.put("/update/:id", (req, res) => {
  const list = {
    title: req.body.title,
    description: req.body.description,
  };

  const query = { where: { id: req.params.id } };

  List.update(list, query)
    .then(
        
        (list) => res.status(200).json({message: "Your list has been updated", list}))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", (req, res) => {
  const query = { where: { id: req.params.id } };

  List.destroy(query)
    .then((lists) => res.status(200).json({ message: "Yeet that List!" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
