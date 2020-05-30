function present(message) {
  return { status: 201, response: { message } };
}

module.exports = {
  present,
};
