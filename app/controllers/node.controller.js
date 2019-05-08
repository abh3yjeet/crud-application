const Node = require('../models/node.model');

//create and save a new Node
exports.create = (req,res) => {
    //Validate request
    if(!req.body.content){
        return res.status(400).send({
            message: 'Node content can not be empty'
        });
    }

    //create a node
    const node = new Node({
        title: req.body.title || "Untitled Node",
        content: req.body.content
    });

    //Save node on Database
    node.save()
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error Occured"
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req,res) => {
    Node.find()
    .then(nodes => {
        res.send(nodes);
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred"
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req,res) => {
        Node.findById(req.params.nodeId)
        .then(note => {
            if(!note){
                return res.status(404).send({
                    message: "Node not found with Id"+ req.params.nodeId
                });
            }
        })
        .catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message:"Error Retrienig node with Id"+req.params.nodeId
                });
            }
            return res.status(500).send({
                message:"Error in retreing the node with id" +req.params.nodeId
            })
        });
};

// Update a note identified by the noteId in the request
exports.update = (req,res) => {
        if(!req.body.content){
            return res.status(400).send({
                message:"Node content can not be empty"
            });
        }

        Node.findByIdAndUpdate(req.params.nodeId,{
            title:req.body.title || "untitiled Node",
            content:req.bo.content
        },{ new:true })
        .then( node => {
            if(!note){
                return res.status(404).send({
                    message:"Node not found with id"+req.params.nodeId
                });
            }
            res.send(node);
        })
        .catch(err => {
            if(err.kind === 'ObjectId'){
                message:"Node not found with id"+req.params.nodeId
            }
            return res.status(500).send({
                message:"Error Updating node with id"+req.params.nodeId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req,res) => {
    Node.findByIdAndDelete(req.params.nodeId)
    .then(node => {
        if(!node){
            return res.status(404).send({
                message:"Node not found with ID"+req.params.nodeId
            });
        }
        res.send({ message:"Node Deleted Successfully" });
    })
    .catch(err =>{
        if(err.kind === 'ObjectId' || err.name === "NotFound"){
            return req.status(404).send({
                message:"node not found with Id"+req.params.nodeId
            });
        }
        return res.status(500).send({
            message:"Could not delete node with the id"+req.params.nodeId
        });
    });
};
