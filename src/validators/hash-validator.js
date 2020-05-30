const VALIDATION_REGEXP = /^00.*/;

function validate(hash) {
  return VALIDATION_REGEXP.test(hash);
}

module.exports = {
  validate,
};
