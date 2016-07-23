//import http from 'http';
//import zlib from 'zlib';
//import fs from 'fs';
//import saxpath from 'saxpath';
//import sax from 'sax';
//
//const today = new Date();
//const year = today.getFullYear();
//const month = today.getMonth() + 1;
//const monthStr = month > 9 ? `${month}` : `0${month}`;
//const date = `${year}${monthStr}01`;
//
//const types = {
//    releaseXml: fs.createWriteStream(`discogs_${date}_releases.xml`),
//    releaseGZ: fs.createWriteStream(`discogs_${date}_releases.gz`)
//};
//
//export default function downloadLastReleases() {
//    return new Promise((resolve) => {
//        resolve({ type: `releases_${date}` });
//    });
//}
