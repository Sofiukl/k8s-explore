const mongoose = require('mongoose');
const { Schema } = mongoose;

const VisitorsSchema = Schema({
    name: { type: String, required: true}
});

const Visitors = mongoose.model("v1_visitors", VisitorsSchema);
module.exports = Visitors