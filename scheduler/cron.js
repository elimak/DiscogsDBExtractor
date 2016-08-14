import { CronJob } from 'cron';
import loadResources from './loadResources';
import discogsFileList from './discogsFileList';
import emailer from './emailer';

function loadResource(file) {
    const type = file.split('_')[2].split('.xml.gz')[0];
    loadResources(type, file)
        .then((resolved, rejected) => {
            if (resolved) {
                emailer.success(`loading of ${resolved.fileName} completed <br>${resolved.resolvedMsg}}`);
                console.log();
                console.log(resolved.resolvedMsg);
            } else if (rejected) {
                emailer.error(`loading of ${resolved.fileName} failed <br>${resolved.rejectedMsg}}`);
                console.log(`loading of ${resolved.fileName} failed`);
                console.log(resolved.rejectedMsg);
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
    cronTime: '50 * * * *', // 15 seconds after every minute
    //cronTime: '1 */6 * * *', // 2 times a day
    //onTick: processRelease,
    //onTick: loadResource,
    onTick: _process,
    start: true,
    timeZone: 'America/Los_Angeles'
});
