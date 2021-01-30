const mathjax = require('mathjax');

module.exports.render = (req, res, next) => {
  mathjax.init({
    loader: {load: ['input/tex', 'output/svg']}
  }).then((MathJax) => {
      const svg = MathJax.tex2svg('\\frac{1}{2}', {display: true});
      console.log(MathJax.startup.adaptor.outerHTML(svg));
  }).catch((err) => console.log(err.message));
  sendJsonResponse(res, 200, {message: 'Success'})
}


// Useful functions
// Ends res with given status and json content
function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}
