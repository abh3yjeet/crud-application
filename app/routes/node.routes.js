module.exports = (app) => {
    const nodes = require('../controllers/node.controller');

    //Create a new node
    app.post('./nodes',nodes.create);

    //Retrieve all nodes
    app.get('./nodes',nodes.findAll);

    // Retrieve a single Note with noteId
    app.get('./nodes/:nodeId',nodes.findOne);

    // Update a Note with noteId
    app.put('./nodes/:nodeID',nodes.update);

    // Delete a Note with noteId
    app.delete('./nodes/:nodeId',nodes.delete);
}