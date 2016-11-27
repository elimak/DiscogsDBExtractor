function getDecades() {
    const date = new Date();
    const year = date.getFullYear();
    let startingDecade = 2010;
    if (year >= 2020) {
        startingDecade = 2020;
    }

    const result = [];
    while (startingDecade >= 1900) {
        result.push({
            decade: `${startingDecade}`
        });
        startingDecade -= 10;
    }

    return result;
}

export default getDecades();
