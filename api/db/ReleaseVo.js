import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const masterVOSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    master_id: { type: Number, required: true },
    master_url: { type: String },
    genres: { type: Array, default: [] },
    styles: { type: Array, default: [] },
    labels: { type: Array, default: [] },
    artists: { type: Array, default: [] },
    extra_artists: { type: Array, default: [] },
    country: { type: String },
    formats: { type: Array, default: [] },
    url: { type: String },
    year: { type: Number }
});

module.exports = mongoose.model('ReleaseVO', masterVOSchema);
