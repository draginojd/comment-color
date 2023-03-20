//This is index.js file
const { activateCommentColor } = require('./comment-color.js');

module.exports = {
  activate: activateCommentColor,
  deactivate: () => {},
};
