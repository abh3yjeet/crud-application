const mongoose =  require('mongoose');

const NodeSchema = mongoose.Schema({
    title: String,
    Content: String
},{
    timestamps: true
});

module.exports = mongoose.model('Node',NodeSchema);