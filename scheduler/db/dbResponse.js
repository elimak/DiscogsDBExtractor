module.exports = {
    error: (msg, id) => { return { error: msg, id }; },
    success: (msg, id) => { return { success: msg, id }; }
};
