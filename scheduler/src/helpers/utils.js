module.exports.wait = timeout => new Promise((r) => {
    setTimeout(r, timeout);
});
