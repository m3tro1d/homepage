const axios = require('axios');

const apiOptions = {
  server: `http://localhost:${process.env.PORT}`
}

module.exports.index = (req, res, next) => {
  let path = '/api/blog';

  axios.get(apiOptions.server + path)
    .then(response => {
      // Make post pretty
      let data = response.data.map(post => {
        post.text = truncateText(post.text);
        post.date = formatDate(post.date);
        return post;
      });

      // Render the page
      res.render('blog_index', {
        title: 'Blog index',
        page_name: 'Blog index.',
        posts: response.data
      });
    })
    .catch(error => {
      // Pass error to the error handler
      next(error);
    });
}

module.exports.post = (req, res, next) => {
  let path = '/api/blog/post/' + req.params.posturl;

  axios.get(apiOptions.server + path)
    .then(response => {
      // Get and format the post
      let post = response.data;
      post.date = formatDate(post.date);

      // Render the view
      res.render('post', {
        title: post.heading + ' | m3tro1d',
        page_name: 'Post',
        post: post
      });
    })
    .catch(error => {
      // Pass error to the error handler
      next(error);
    });
}

module.exports.createPost = (req, res, next) => {
  res.render('blog_create_post', {
    title: 'Create post | m3tro1d',
    page_name: 'Create post.'
  });
}


// Useful functions
// Formats a date in a pretty string
function formatDate(dateString) {
  let monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ];

  let date = new Date(dateString);

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}

function truncateText(text) {
  if (text.length > 50) {
    return text.substring(0, 50) + '...';
  }
  return text;
}