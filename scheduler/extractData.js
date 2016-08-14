import emailer from './emailer';

import fs from 'fs';
import saxpath from 'saxpath';
import sax from 'sax';

const dataFolder = './scheduler/data/';
let schemas = [];

function processXml(fileName, type, savingFunction) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(`${dataFolder}${fileName}`);
        const saxParser = sax.createStream(true);
        const streamer = new saxpath.SaXPath(saxParser, `//${type}`);

        streamer.on('match', savingFunction);
        streamer.on('error', () => {
            reject('there was an error parsing the xml');
            console.log('there was an error parsing the xml');
        });

        fileStream.pipe(saxParser);
        fileStream.on('close', () => {
            console.log('----- XML parsed -----');
            resolve(schemas);
        });
    });
}

function cleanUpXML(xml) {
    const tags = ['tracklist', 'companies', 'notes', 'images', 'videos', 'identifiers'];
    let cleanedXML = `${xml}`;
    tags.forEach((tag) => {
        cleanedXML = `${cleanedXML.split(`<${tag}>`)[0]}${cleanedXML.split(`</${tag}>`)[1]}`;
    });
    return cleanedXML;
}

function getContent(cleanedXML, tag) {
    if (cleanedXML.split(`</${tag}>`).length) {
        return `${cleanedXML.split(`</${tag}>`)[0]}`.split(`<${tag}>`)[1];
    }
    return null;
}

function getID(cleanedXML) {
    return `${cleanedXML.split('id="')[1]}`.split('">')[0];
}

function getLabelNames(cleanedXML) {
    const labels = getContent(cleanedXML, 'labels');
    const nodes = labels.split('<label');
    const result = [];
    nodes.forEach((node) => {
        const name = node.split('name="')[1];
        if (name) result.push(name.split('"')[0]);
    });
    return result;
}

function getLabelCats(cleanedXML) {
    const labels = getContent(cleanedXML, 'labels');
    const nodes = labels.split('<label');
    const result = [];
    nodes.forEach((node) => {
        const catno = node.split('catno="')[1];
        if (catno) result.push(catno.split('"')[0]);
    });
    return result;
}

function getArtists(cleanedXML, tag) {
    const artists = getContent(cleanedXML, tag);
    const nodes = artists.split('</artist>');
    const result = [];
    nodes.forEach((node) => {
        const id = getContent(node, 'id');
        if (id) result.push(id);
    });
    return result;
}

function getStyles(cleanedXML) {
    const styles = getContent(cleanedXML, 'styles');
    const nodes = styles.split('</style>');
    const result = [];
    nodes.forEach((node) => {
        const style = getContent(`${node}</style>`, 'style');
        if (style) result.push(style);
    });
    return result;
}

function getGenres(cleanedXML) {
    const genres = getContent(cleanedXML, 'genres');
    const nodes = genres.split('</genre>');
    const result = [];
    nodes.forEach((node) => {
        const genre = getContent(`${node}</genre>`, 'genre');
        if (genre) result.push(genre);
    });
    return result;
}

function getFormats(cleanedXML) {
    const formats = getContent(cleanedXML, 'formats');
    const nodes = formats.split('</format>');
    const result = [];
    nodes.forEach((node) => {
        const format = node.split('name="')[1];
        if (format) result.push(format.split('" qty')[0]);
    });
    return result;
}

function saveRelease(xml) {
    const cleanedXML = cleanUpXML(xml);

    const schema = {
        country: getContent(cleanedXML, 'country'),
        master_id: (getContent(cleanedXML, 'master_id') || -1),
        title: getContent(cleanedXML, 'title'),
        released: getContent(cleanedXML, 'released'),
        id: getID(cleanedXML),
        artists: getArtists(cleanedXML, 'artists'),
        extra_artists: getArtists(cleanedXML, 'extraartists'),
        styles: getStyles(cleanedXML),
        genres: getGenres(cleanedXML),
        formats: getFormats(cleanedXML),
        label_names: getLabelNames(cleanedXML),
        label_cats: getLabelCats(cleanedXML)
    };
    console.log(schemas.length);
    schemas.push(schema);
}

export default {
    // type = 'release';
    releases: (fileName) => {
        schemas = [];
        return new Promise((resolve, reject) => {
            processXml(fileName, 'release', saveRelease)
                .then((resolved, rejected) => {
                    if (resolved) {
                        resolve({
                            fileName,
                            schemas
                        });
                    } else if (rejected) {
                        reject({
                            fileName,
                            rejectedMsg: rejected
                        });
                    }
                });
        });
    }
};
