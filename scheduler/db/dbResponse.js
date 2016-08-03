module.exports = {
    error: function(msg, id) { return { error: msg, id: id } },
    success: function(msg) { return { success: msg } }
};
