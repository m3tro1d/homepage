module.exports.index = (req, res, next) => {
  res.end('Blog index page.');
}

module.exports.post = (req, res, next) => {
  res.end('Post page.');
}