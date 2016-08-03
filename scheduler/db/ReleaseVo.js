'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const masterVOSchema = new Schema({
    country: { type: String },
    master_id: { type: Number, default: -1 },
    title: { type: String, required: true },
    released: { type: String },
    id: { type: Number, required: true, unique: true },
    artists: { type: Array, default: [] },
    extra_artists: { type: Array, default: [] },
    styles: { type: Array, default: [] },
    genres: { type: Array, default: [] },
    formats: { type: Array, default: [] },
    label_names: { type: String },
    label_cats: { type: String }
});

module.exports = mongoose.model('ReleaseVO', masterVOSchema);
