import request from 'request';

let count = 0;

function _getDate() {
    const da = new Date();
    da.setDate(da.getDate() - count);
    const year = da.getFullYear();
    const month = da.getMonth() + 1;
    const monthStr = month > 9 ? `${month}` : `0${month}`;
    const day = da.getDate();
    const dayStr = day > 9 ? `${day}` : `0${day}`;
    return `${year}${monthStr}${dayStr}`;
}

function _getChecksum(dateTag) {
    return new Promise((res) => {
        console.log('loadingDiscogs', `http://${process.env.DISCOGS_DATA_HOST}/data/discogs_${dateTag}_CHECKSUM.txt`);
        request({
            uri: `http://${process.env.DISCOGS_DATA_HOST}/data/discogs_${dateTag}_CHECKSUM.txt`
        }, (error, response, body) => {
            if (body.split('<Error>').length > 1) {
                res(false);
            } else {
                res(body);
            }
        });
    });
}

// find out the latest release / master / artists dumps
// http://data.discogs.com.s3-us-west-2.amazonaws.com/data/discogs_20160809_CHECKSUM.txt

export default function getMostRecentDump() {
    return new Promise((res, rej) => {
        const finalize = (result) => {
            if (result) {
                const dumpList = [];
                result.split('*').forEach((section) => {
                    const fileArr = section.split('.xml.gz');
                    // at this point, only keep the releases tag
                    if (fileArr[1] && fileArr[0].split('releases').length > 1) {
                        dumpList.push(`${fileArr[0]}.xml.gz`);
                    }
                });
                res(dumpList);
            } else {
                count ++;
                _getChecksum(_getDate()).then(finalize);
            }

            if (count > 45) {
                rej('checksum not found');
            }
        };

        _getChecksum(_getDate()).then(finalize);
    });
}
