import { CronJob } from 'cron';
import loadResources from './loadResources';
import discogsFileList from './discogsFileList';
import emailer from './emailer';
import extractData from './extractData';

function loadResource(file) {
    const type = file.split('_')[2].split('.xml.gz')[0];
    loadResources(type, file)
        .then((resolved, rejected) => {
            if (resolved) {
                emailer.success(resolved.resolvedMsg);
                extractData.releases(file)
                    .then((resolved2, rejected2) => {
                        if (resolved2) {
                            emailer.success(`Successfully extracted ${resolved2.schemas.length} releases from ${resolved2.fileName}`);
                            console.log(`Successfully extracted ${resolved2.schemas.length} releases from ${resolved2.fileName}`);
                        } else if (rejected2) {
                            emailer.error(rejected2.rejectedMsg);
                            console.log(rejected2.rejectedMsg);
                        }
                    });
                console.log(resolved.resolvedMsg);
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
    discogsFileList()
        .then((listOfDumps) => {
            _queueLoading(listOfDumps);
        });
}


new CronJob({
    cronTime: '44 * * * *', // 15 seconds after every minute
    //cronTime: '1 */6 * * *', // 2 times a day
    //onTick: processRelease,
    //onTick: loadResource,
    onTick: _process,
    start: true,
    timeZone: 'America/Los_Angeles'
});
