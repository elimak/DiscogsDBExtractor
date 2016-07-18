import ReleaseVO from '../db/ReleaseVo';
import { error, success } from '../utils/dbResponse';

export default function addReleaseToDB() {
    const releaseData = {
        id: 3,
        master_id: 1,
        master_url: 'url/master/1',
        genres: ['electronic'],
        styles: ['IDM'],
        labels: ['Ghostly'],
        artists: ['Plaid'],
        extra_artists: [],
        country: 'UK',
        formats: ['CD'],
        url: 'url/release/1',
        year: 2014
    };

    // function all() {
    //    return new Promise((resolve) => {
    //        ReleaseVO.find({}, (err, data) => {
    //            if (err) {
    //                resolve(error(err));
    //            } else {
    //                resolve(success(data));
    //            }
    //        });
    //    });
    // }

    function get_id(data) {
        return new Promise((resolve) => {
            ReleaseVO.findOne({ id: data.id }, (err, newData) => {
                console.log('get_id?? ', err, newData);
                if (newData && newData._id) {
                    resolve(newData._id);
                } else {
                    resolve(-1);
                }
            });
        });
    }

    function update(_id, data) {
        return new Promise((resolve) => {
            ReleaseVO.findByIdAndUpdate(_id, data, (err, newData) => {
                if (err) {
                    resolve(error(err));
                } else {
                    resolve(success(newData));
                }
            });
        });
    }

    function save(data) {
        return new Promise((resolve) => {
            const release = new ReleaseVO(data);
            release.save((err, newData) => {
                if (err) {
                    resolve(error(err));
                } else {
                    resolve(success(newData));
                }
            });
        });
    }

    return new Promise((resolve) => {
        get_id(releaseData).then((_id) => {
            console.log('_id? ', _id);
            if (_id === -1) {
                // save
                console.log('did not exist?');
                resolve(save(releaseData));
            } else {
                // update
                console.log('existed?', _id, releaseData);
                resolve(update(_id, releaseData));
            }
        });
    });
}
