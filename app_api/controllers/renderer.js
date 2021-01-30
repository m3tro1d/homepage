const mathjax = require('mathjax');

module.exports.render = (req, res, next) => {
  mathjax.init({
    loader: {load: ['input/tex', 'output/svg']}
  }).then((MathJax) => {
    const svg = MathJax.tex2svg(req.body.input, {display: true});
    sendJsonResponse(res, 201, {output: MathJax.startup.adaptor.outerHTML(svg)})
  }).catch((err) => {
    sendJsonResponse(res, 400, err);
  });
}


// Useful functions
// Ends res with given status and json content
function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}
