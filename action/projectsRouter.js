const express = require("express");
const projectDB = require("../data/helpers/projectModel.js");
const router = express.Router();

// get all project
router.get("/", (req, res) => {
  projectDB
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "projects retrival could not be performed " });
    });
});

// get project by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  projectDB
    .get(id)
    .then(project => {
      if (project) {
        res.status(200).json({ project });
      } else {
        res
          .status(404)
          .json({ error: "Specified project ID could not be found" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: "Error performing that project" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;

    projectDB
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
          //     "Could not add new project. Provide projectID, notes, description and try again."
          // });
      });
    });

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;

  projectDB
    .update(id, post)
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "project Update operation failed, try again" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    projectDB
      .remove(id)
      .then(result => {
        if (result !== 0) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ error: "project ID does not exist" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Deleting project could not be performed, try again" });
      });
  } else {
    res.status(404).json({ error: "Provide project ID for removal" });
  }
});

module.exports = router;
