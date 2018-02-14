describe.skip('list helpers', () => {

  const dummy = (blogs) => {
    return 1;
  };

  const totalLikes = (blogs) => {
    let sum = 0;
    blogs.forEach(object => {
      sum += object.likes; });
    let total = sum;
    return total;
  };

  const favoriteBlog = (blogs) => {
    let favorite;
    blogs.forEach(blog => {
      if(favorite) {
        favorite = (blog.likes > favorite.likes) ? blog : favorite;
      }else{
        favorite = blog;
      }});
    return favorite;
  };

  /*const mostBlogs = (blogs) => {
    let popularAuthor = {};
    blogs.forEach(authors => {
    });
  };
  */

  const mostBlogs = (blogs) => {

    let popularAuthor = {
      author: null,
      blogs: 0
    };
    let authors = {};

    blogs.forEach(blog => {
      if(authors[blog.author] === undefined) {
        authors[blog.author] = 1;
      } else {
        authors[blog.author] =  authors[blog.author] + 1;
      }
    });

    for(let key in authors){
      if(popularAuthor.blogs < authors[key]) {
        popularAuthor.author = key;
        popularAuthor.blogs = authors[key];
      }
    }

    return popularAuthor;
  };


  module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
});

