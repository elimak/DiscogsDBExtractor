'use strict';
const ReleaseVO = require('./ReleaseVo.js');
const error = require('./dbResponse.js').error;
const success = require('./dbResponse.js').success;

 function all() {
    return new Promise((resolve) => {
        ReleaseVO.find({}, (err, data) => {
            if (err) {
                resolve(error(err));
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
                resolve(error(err));
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
                resolve(error(err));
            } else {
                resolve(success(newData));
            }
        });
    });
}

module.exports = {
    // type = 'release';
    addReleaseToDB: function(releaseData) {
        console.log('addReleaseToDB? ', JSON.stringify(releaseData));
        get_id(releaseData).then(function(_id) {
            console.log('_id? ', _id);
            if (_id === -1) {
                // save
                console.log('did not exist?');
                save(releaseData)
                    .then(function(result) {
                        console.log(JSON.stringify(result));
                    });
            } else {
                // update
                console.log('existed?', _id, releaseData);
                update(_id, releaseData)
                    .then(function(result) {
                        console.log(JSON.stringify(result));
                    });
            }
        });
    },

    logAll: function() {
        all().then(function(result) {
            console.log(JSON.stringify(result));
        });
    }
};
