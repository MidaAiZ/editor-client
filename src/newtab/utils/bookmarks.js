import localSave from './localSave.js';

const getBookmarks = (callback) => {
    chrome.bookmarks.getTree((markstree) => renderMarks(markstree, callback))
}

const getBookmarksSub = (id, callback) => {
    chrome.bookmarks.getSubTree(`${id}`, (marks) => renderMarks(marks, id, callback))
}

const renderMarks = (marks, id, callback) => {
    console.log('default marks', id, marks);
    let marksTree = marks[0];
    callback(marksTree.title, marksTree.children, marksTree.dateAdded)
    // markstree[0].children.map((folder, index) => {
    // //     console.log('folder', folder)
    // })
}

// const _storageMarks = (title, id, createdAt, updateAt, url, favicon) => {
//     let storage
//     localSave('bookMarks', {})
// }

export {
    getBookmarks,
    getBookmarksSub
}