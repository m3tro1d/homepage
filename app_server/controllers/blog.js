const axios = require('axios');

const apiOptions = {
  server: `http://localhost:${process.env.PORT}`
};

module.exports.index = (req, res, next) => {
  let path = '/api/blog';

  axios.get(apiOptions.server + path)
    .then(response => {
      // Make post pretty
      let data = response.data.map(post => {
        post.text = formatText(post.text);
        post.date = formatDate(post.date);
        return post;
      });

      // Render the page
      res.render('blog_index', {
        title: 'Blog index',
        page_name: 'Blog index.',
        posts: data
      });
    })
    .catch(error => {
      // Pass error to the error handler
      next(error);
    });
};

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
      if (error.response.status == 404) {
        // Pass the control to the not found controller
        next();
      } else {
        // In case of other type error, pass error to the error handler
        next(error);
      }
    });
};

module.exports.createPost = (req, res, next) => {
  res.render('blog_create_post', {
    title: 'Create post | m3tro1d',
    page_name: 'Create post.'
  });
};


// Useful functions
// Formats a date in a pretty string
function formatDate(dateString) {
  let monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
  ];

  let date = new Date(dateString);

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}

// Formats post's text
function formatText(text) {
  // Strip html
  text = text.replace(/(<([^>]+)>)/gi, '');
  // Make it smaller
  if (text.length > 100) {
    text = text.substring(0, 99);
    text = text.substring(0, text.lastIndexOf(' ')) + '...';
  }
  // Include the last word boundary
  return text;
}
