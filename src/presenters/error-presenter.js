function present(error) {
  return {
    status: error.status || 500,
    response: { error: error.message || error },
  };
}

module.exports = {
  present,
};
