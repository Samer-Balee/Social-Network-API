// Require dayjs library
const dayjs = require('dayjs');

const dateFormat = function(date) {
  
  return dayjs(date).format('DD/MM/YYYY [at] hh:mm a');
};

module.exports = dateFormat;

