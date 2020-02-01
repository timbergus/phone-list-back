const phones = require('../mocks/phones.json');

const { delay } = require('../utils/time');

const getPhones = async () => await delay(phones, 2000);

module.exports = { getPhones };
