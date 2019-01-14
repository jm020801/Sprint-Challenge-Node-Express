const express = require("express");
const actionDB = require("../data/helpers/actionModel.js");
const router = express.Router();

// get all action
router.get("/", (req, res) => {
  actionDB
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Actions retrival could not be performed " });
    });
});

// get action by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  actionDB
    .get(id)
    .then(action => {
      if (action) {
        res.status(200).json({ action });
      } else {
        res
          .status(404)
          .json({ error: "Specified Action ID could not be found" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: "Error performing that action" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;

    actionDB
      .insert(post)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json(err)
          // ({
          //   error:
          //     "Could not add new action. Provide projectID, notes, description and try again."
          // });
      });
    });

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;

  actionDB
    .update(id, post)
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Action Update operation failed, try again" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    actionDB
      .remove(id)
      .then(result => {
        if (result !== 0) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ error: "Action ID does not exist" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Deleting Action could not be performed, try again" });
      });
  } else {
    res.status(404).json({ error: "Provide Action ID for removal" });
  }
});

module.exports = router;
