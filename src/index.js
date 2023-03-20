const { activateCommentColor } = require('./comment-color.js');

module.exports = {
  activate: activateCommentColor,
  deactivate: () => {},
};
