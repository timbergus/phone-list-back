module.exports.delay = (item, time) => new Promise((resolve) => setTimeout(() => resolve(item), time));
