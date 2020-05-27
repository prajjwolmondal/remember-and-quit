function isEqual(str1, str2){
    return str1.toUpperCase() === str2.toUpperCase()
}

function getAllTabsInWindow() {
    let tabQuery = browser.tabs.query({currentWindow: true})
    let tabUrlList = []
    tabQuery.then(tabs => {
        for (let tab of tabs){
            console.log(tab.url)
            if (! isEqual(tab.url, "about:newtab")){
                tabUrlList.push({
                    title: tab.title,
                    url: tab.url
                })
            }
        }
    });
    return tabUrlList
}

function createBookmarkFolder(tabs){
    const todayDate = new Date()
    var bookmarkFolderID

    let createFolder = browser.bookmarks.create({
        title: todayDate.toDateString()
    })

    createFolder.then(function(bookmarkTreeNode){
        console.log("Made bookmark folder")
        console.log(bookmarkTreeNode.id)
        addBookmarksToFolder(bookmarkTreeNode.id, tabs)
    })
}

function addBookmarksToFolder(parentId, tabs){
    for (let tab of tabs){
        browser.bookmarks.create({
            title: tab.title,
            url: tab.url,
            parentId: parentId
        })
    }
}

function bookmarkAllOpenTabs() {
    tabs = getAllTabsInWindow()
    createBookmarkFolder(tabs)
}

document.getElementById('bookmark').addEventListener("click", bookmarkAllOpenTabs, false)