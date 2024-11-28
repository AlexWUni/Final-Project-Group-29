var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Incident = require('../model/incident.js');
const incident = require('../model/incident.js');
let incidentController = require('../controllers/incident.js')

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}
/* Get route for the incident list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the incidents list */
router.get('/',async(req,res,next)=>{
try{
    const IncidentList = await Incident.find();
    res.render('Incident/list',{
        title:'Incidents',
        IncidentList:IncidentList,
        displayName: req.user ? req.user.displayName:''   
    })}
    catch(err){
        console.error(err);
        res.render('Incident/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',requireAuth,async(req,res,next)=>{
    try{
        res.render('Incident/add',{
            title: 'Add Incident',
            displayName: req.user ? req.user.displayName:''   
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Incident/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add', requireAuth,async(req,res,next)=>{
    try{
        let newIncident = Incident({
            "Name":req.body.Name,
            "Date":req.body.Date,
            "Location":req.body.Location,
            "Description":req.body.Description,
        });
        Incident.create(newIncident).then(()=>{
            res.redirect('/incidentslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Incident/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id', requireAuth,async(req,res,next)=>{
    try{
        const id = req.params.id;
        const incidentToEdit= await Incident.findById(id);
        res.render('Incident/edit',
            {
                title:'Edit Incident',
                Incident:incidentToEdit,
                displayName: req.user ? req.user.displayName:''   
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id', requireAuth,async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedIncident = Incident({
            "_id":id,
            "Name":req.body.Name,
            "Date":req.body.Date,
            "Location":req.body.Location,
            "Description":req.body.Description,
        });
        Incident.findByIdAndUpdate(id,updatedIncident).then(()=>{
            res.redirect('/incidentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Incident/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', requireAuth,async(req,res,next)=>{
    try{
        let id=req.params.id;
        Incident.deleteOne({_id:id}).then(()=>{
            res.redirect('/incidentslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Incident/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;