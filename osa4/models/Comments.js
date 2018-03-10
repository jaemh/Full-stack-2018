const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  blogs: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
});

commentSchema.statics.format = (comment) => {
  return {
    text: comment.text,
    id: comment._id,
    blogs: comment.blogs
  };
};

const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;