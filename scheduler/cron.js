import { CronJob } from 'cron';
import loadResources from './loadResources';
import discogsFileList from './discogsFileList';
import emailer from './emailer';
import extractData from './extractData';
import releasesAPI from './db/releasesAPI';
import connectDB from './connectDB';

let dataToSave;
let savedCount;

function saveReleases() {
    if (dataToSave.length) {
        const record = dataToSave.pop();
        releasesAPI.addReleaseToDB(record)
            .then((resolved, rejected) => {
                if (resolved) {
                    savedCount ++;
                    saveReleases();
                    if (savedCount % 50 === 0) {
                        console.log(`So far ${savedCount} records were saved`);
                    }
                } else if (rejected) {
                    console.log(`${record.id} failed to enter the DB`);
                    saveReleases();
                }
            });
    } else {
        console.log('Releases all processed');
    }
}

function loadResource(file) {
    const type = file.split('_')[2].split('.xml.gz')[0];
    loadResources(type, file)
        .then((resolved, rejected) => {
            if (resolved) {
                dataToSave = [];
                emailer.success(resolved.resolvedMsg);
                const fileXml = `${file.split('.gz').join('')}.xml`;
                extractData.releases(fileXml, dataToSave)
                    .then((resolved2, rejected2) => {
                        if (resolved2) {
                            emailer.success(`Successfully extracted ${resolved2.releaseCount} releases from ${resolved2.fileName}`);
                            console.log(`Successfully extracted ${resolved2.releaseCount} releases from ${resolved2.fileName}`);
                        } else if (rejected2) {
                            emailer.error(rejected2.rejectedMsg);
                            console.log(rejected2.rejectedMsg);
                        }
                    });
                console.log(resolved.resolvedMsg);
                setTimeout(() => {
                    savedCount = 0;
                    console.log(`starting to save the records with ${dataToSave.length} stored schema`);
                    saveReleases();
                }, 5000);
            } else if (rejected) {
                emailer.error(rejected.rejectedMsg);
                console.log(rejected.rejectedMsg);
            }
        });
}

function _queueLoading(listOfDumps) {
    const file = listOfDumps.pop();
    console.log('_queueLoading', listOfDumps, file);
    loadResource(file)
        .then(() => {
            _queueLoading(listOfDumps);
        });
}

function _process() {
    console.log('_process');
    connectDB.connectMongo();
    discogsFileList()
        .then((listOfDumps) => {
            _queueLoading(listOfDumps);
        });
}


new CronJob({
    cronTime: '42 * * * *', // 15 seconds after every minute
    //cronTime: '1 */6 * * *', // 2 times a day
    //onTick: processRelease,
    //onTick: loadResource,
    onTick: _process,
    start: true,
    timeZone: 'America/Los_Angeles'
});
