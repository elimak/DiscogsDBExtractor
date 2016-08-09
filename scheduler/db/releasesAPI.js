'use strict';
const ReleaseVO = require('./ReleaseVo.js');
const error = require('./dbResponse.js').error;
const success = require('./dbResponse.js').success;

let ids = {};
let failed = {};
let completeCallBack;

let logs = '';

function all() {
    return new Promise((resolve) => {
        ReleaseVO.find({}, (err, data) => {
            if (err) {
                resolve(error(err, data.id));
            } else {
                resolve(success(data));
            }
        });
    });
}

function get_id(data) {
    return new Promise(function(resolve) {
        ReleaseVO.findOne({ id: data.id }, function(err, newData) {
            if (newData && newData._id) {
                resolve(newData._id);
            } else {
                resolve(-1);
            }
        });
    });
}

function update(_id, data) {
    return new Promise(function(resolve) {
        ReleaseVO.findByIdAndUpdate(_id, data, function(err, newData) {
            if (err) {
                console.log('--- update error ?', data.id, err);
                logs += 'update error' + data.id + ': ' + err + '<br>';
                resolve(error(err, data.id));
            } else {
                resolve(success(newData));
            }
        });
    });
}

function save(data) {
    return new Promise(function(resolve) {
        const release = new ReleaseVO(data);
        release.save(function(err, newData) {
            if (err) {
                console.log('--- save error ?', data.id, err);
                logs += 'save error' + data.id + ': ' + err + '<br>';
                resolve(error(err, data.id));
            } else {
                resolve(success(newData));
            }
        });
    });
}

function finalize(result) {
    if (result.success) {
        console.log('saved', result.success.id);
        logs += 'saved' + result.id + '<br>';
        delete ids[result.success.id];
    }

    if (result.error) {
        console.log('error saving', result.id);
        logs += 'saved' + result.id + '<br>';
        delete ids[result.id];
        failed[result.id] = true;
    }
    if (!Object.keys(ids).length) {
        console.log('Completed?');
        completeCallBack();
    } else if (Object.keys(ids).length === 1 ) {
        console.log(JSON.stringify(Object.keys(ids)));
    }
}

module.exports = {
    // type = 'release';
    addReleaseToDB: function(releaseData, complete) {
        completeCallBack = complete;
        ids[releaseData.id] = true;
        console.log('addReleaseToDB? ', releaseData.id);
        get_id(releaseData).then(function(_id) {
            if (_id === -1) {
                // save
                save(releaseData)
                    .then(function(result) {
                        finalize(result);
                    });
            } else {
                // update
                update(_id, releaseData)
                    .then(function(result) {
                        finalize(result);
                    });
            }
        });
    },

    resetLogs: function() {
        failed = {};
        ids = {};
    },

    logAll: function() {
        all().then(function(result) {
            console.log(JSON.stringify(result));
        });
    }
};
