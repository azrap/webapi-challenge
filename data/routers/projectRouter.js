const express = require('express');
const Projects = require('../helpers/projectModel.js')
const Actions = require('../helpers/actionModel.js');

const router = express.Router();


//The Project CRUD and the actions crud are both in this file


// ******** Projects **********//

//Project Create: tested

router.post('/', async (req, res) => {
    try {
        const project = await Projects.insert(req.body)
        res.status(201).json(project);

    }
    catch (error){
        console.log(error);
        res.status(500).json({
          message: 'Error creating a new project suckas',
        });

    }
});

// Project Read

//all projects: tested
router.get('/', async (req, res) => {
    try {

      const projects = await Projects.get();
      console.log(projects);
      res.status(200).json(projects);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the project',
      });
    }
  });


// project by a specific id: tested
router.get('/:id', async (req, res) => {
    try {

        const project = await Projects.get(req.params.id);
      console.log(project);
      res.status(200).json(project);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the project',
      });
    }
  });


  //project: get all actions for a specific project
  router.get('/:id/actions/', async (req, res) => {
    try {
      const actions = await Projects.getProjectActions(req.params.id)
    //   const action=actions[req.params.a_id]
      console.log(req.params);
      res.status(200).json(actions);
    } 
    catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the actions for the hub',
      });
    }
});


//Project Update: tested

router.put('/:id', async (req, res) => {
    try {
      const project = await Projects.update(req.params.id, req.body);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    }
  });
  


// Project Delete: tested

router.delete('/:id', async (req, res) => {
    try {
        const count = await Projects.remove(req.params.id)
        if (count>0){
            res.status(200).json({mesage: 'project has been removed'})
        }
        else {
            res.status(200).json({mesage: 'could not find project with the specified ID'})

        }

    }
    catch {
        res.status(500).json({
            message: 'Error removing the project',
          });

    }


});





module.exports = router;