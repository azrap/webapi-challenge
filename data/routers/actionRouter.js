const express = require('express');
const Actions = require('../helpers/actionModel.js');
const Projects = require('../helpers/projectModel.js');

const router = express.Router();

//The Project CRUD and the actions crud are both in this file

//project id testing middleware:

async function validateProjectId(req, res, next) {
    try { 
        const { project_id } =req.body;
        const project = await Projects.get(project_id);
        if(!project){
            res.status(400).json({ message: "invalid project id" })
        }
        else {
            next()
        }
    }
    catch {
        res.status(400).json({ message: "failed to process request" })

    }

};


// ******** Actions **********//

//Actions Create: tested


router.post('/', validateProjectId, async (req, res) => {
    try {
        const action = await Actions.insert(req.body)
        res.status(201).json(action);
    }
    catch (error){
        console.log(error);
        res.status(500).json({
          message: 'Error creating a new action suckas',
        });
    }
});

// Actions Read: tested

//all projects
router.get('/', async (req, res) => {
    try {

      const actions = await Actions.get();
      
      res.status(200).json(actions);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the actions',
      });
    }
  });


// ACTIONS by a specific id: tested
router.get('/:id', async (req, res) => {
    try {

     const action = await Actions.get(req.params.id);
      
      res.status(200).json(action);
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the action',
      });
    }
  });


//project: get all actions for a specific project
 

//ACTIONS Update: tested

router.put('/:id', async (req, res) => {
    try {
      const action = await Actions.update(req.params.id, req.body);
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the action',
      });
    }
  });
  

// ACTIONS Delete: tested

router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const count = await Actions.remove(req.params.id)
        console.log(count);
       
        if (count){
            res.status(200).json({mesage: 'action has been removed'})
        }
        else {
            res.status(200).json({mesage: 'could not find action with the specified ID'})

        }

    }
    catch {
        res.status(500).json({
            message: 'Error removing the action',
          });

    }

});



module.exports = router;