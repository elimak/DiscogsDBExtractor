import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const metadataVOSchema = new Schema({
    genres: { type: Array, default: [] },
    styles: { type: Array, default: [] },
    years: { type: Array, default: [] },
    countries: { type: Array, default: [] }
});

module.exports = mongoose.model('MetadataVO', metadataVOSchema);
