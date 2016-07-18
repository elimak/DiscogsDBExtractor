import ReleaseVO from '../db/ReleaseVo';
import { error, success } from '../utils/dbResponse';

export default function clearAllRelease() {
    return new Promise((resolve) => {
        ReleaseVO.remove({}, function(err) {
            if (err) {
                resolve(error(err));
            } else {
                resolve(success('All releases were deleted'));
            }
        });
    });
}
