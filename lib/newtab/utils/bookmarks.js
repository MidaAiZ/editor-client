"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBookmarksSub = exports.getBookmarks = void 0;

var _localSave = _interopRequireDefault(require("./localSave.js"));

var getBookmarks = function getBookmarks(callback) {
  chrome.bookmarks.getTree(function (markstree) {
    return renderMarks(markstree, 0, callback);
  });
};

exports.getBookmarks = getBookmarks;

var getBookmarksSub = function getBookmarksSub(id, callback) {
  chrome.bookmarks.getSubTree("".concat(id), function (marks) {
    return renderMarks(marks, id, callback);
  });
};

exports.getBookmarksSub = getBookmarksSub;

var renderMarks = function renderMarks(marks, id, callback) {
  console.log('default marks', id, marks);
  var marksTree = marks[0];
  callback(marksTree.title, marksTree.children, marksTree.dateAdded); // markstree[0].children.map((folder, index) => {
  // //     console.log('folder', folder)
  // })
}; // const _storageMarks = (title, id, createdAt, updateAt, url, favicon) => {
//     let storage
//     localSave('bookMarks', {})
// }