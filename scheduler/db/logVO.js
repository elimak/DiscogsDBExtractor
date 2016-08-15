import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const LogSchema = new Schema({
    release_count: { type: Number, required: true },
    release_tag: { type: String, required: true }
});

module.exports = mongoose.model('ReleaseVO', LogSchema);
