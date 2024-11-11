//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let IncidentModel = mongoose.Schema({
    Name: String,
    Date: String,
    Location: String,
    Description: String,
},
{
    collection:"IncidentsCollection"
});
module.exports =mongoose.model('Incident',IncidentModel);
