import ReleaseVO from './ReleaseVo.js';
import { error, success } from './dbResponse';

function all() {
    return new Promise((resolve) => {
        ReleaseVO.find({}, (err, data) => {
            if (err) {
                resolve(error(err, data.id));
            } else {
                resolve(success(data, data.id));
            }
        });
    });
}

function get_id(data) {
    console.log('get_id', `${data.id}`);
    return new Promise((resolve) => {
        ReleaseVO.findOne({ id: data.id }, (err, newData) => {
            if (newData && newData._id) {
                console.log('requested', data.id, 'and found ', newData._id);
                resolve(newData._id);
            } else {
                console.log(`${data.id}`, ' was not found, returning -1');
                resolve(-1);
            }
        });
    });
}

function update(_id, data) {
    return new Promise((resolve) => {
        ReleaseVO.findByIdAndUpdate(_id, data, (err, newData) => {
            if (err) {
                resolve(error(err, data.id));
            } else {
                resolve(success(newData, data.id));
            }
        });
    });
}

function save(data) {
    return new Promise((resolve) => {
        const release = new ReleaseVO(data);
        console.log('attempting to save', data.id);
        release.save((err, newData) => {
            if (err) {
                console.log('saving failed?', data.id);
                resolve(error(err, data.id));
            } else {
                console.log('saving succeed?', data.id);
                resolve(success(newData, data.id));
            }
        });
    });
}

function finalize(resolve, result) {
    if (result.success) {
        resolve({
            success: result.id,
            successMsg: result.success
        });
    }

    if (result.error) {
        resolve({
            error: result.id,
            errorMsg: result.error
        });
    }
}

module.exports = {
    // type = 'release';
    addReleaseToDB: (releaseData) => {
        return new Promise((resolve) => {
            get_id(releaseData).then((_id, getIdErr) => {
                if (getIdErr) {
                    resolve({
                        error: releaseData.id,
                        errorMsg: getIdErr
                    });
                }

                if (_id === -1) {
                    // save
                    save(releaseData)
                        .then((result, err) => {
                            if (result) {
                                finalize(resolve, result);
                            } else if (err) {
                                resolve({
                                    error: releaseData.id,
                                    errorMsg: err
                                });
                            }
                        });
                } else {
                    // update
                    update(_id, releaseData)
                        .then((result, err) => {
                            if (result) {
                                finalize(resolve, result);
                            } else if (err) {
                                resolve({
                                    error: releaseData.id,
                                    errorMsg: err
                                });
                            }
                        });
                }
            });
        });
    },

    resetLogs: function() {
    },

    logAll: function() {
        all().then(function(result) {
            console.log(JSON.stringify(result));
        });
    }
};
