function getYears(decade) {
    const result = [];
    if (!!decade) {
        const startingYear = parseInt(decade, 10);
        let year = parseInt(decade, 10);

        while (year < (startingYear + 10)) {
            result.push({
                year: `${year}`
            });
            year += 1;
        }
        result.reverse();
    } else {
        const now = new Date();
        const startingYear = now.getFullYear();
        let year = startingYear;

        while (year > 1950) {
            result.push({
                year: `${year}`
            });
            year -= 1;
        }
    }
    return result;
}

export default {
    getYears
};
