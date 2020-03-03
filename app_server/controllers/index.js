// Index page
module.exports.index = (req, res, next) => {
  res.render('index', {
    title: 'm3tro1d\'s homepage',
    page_name: 'm3tro1d.'
  });
}

module.exports.software = (req, res, next) => {
  res.end('Software page.');
}