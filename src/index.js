const { activateCommentColor } = require('./comment-color');

module.exports = {
  activate: activateCommentColor,
  deactivate: () => {},
};
