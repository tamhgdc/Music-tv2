//set to block choose page

function getChoose(choosePage) {
    let choose = document.getElementById(`${choosePage}ID`);
    choose.addEventListener('click', () => {
        if (choosePage == "musicsAdmin") {
            localStorage.setItem("namePage", "musicsAdmin");
            resetMusicAdmin();
        }
        else if (choosePage == "uploadAdmin") {
            localStorage.setItem("namePage", "uploadAdmin");
            resetUploadAdmin();
        }
        else if (choosePage == "requestAdmin") {
            localStorage.setItem("namePage", "requestAdmin");
            resetRequestAdmin();
        }
        else if (choosePage == "suggestionAdmin") {
            localStorage.setItem("namePage", "suggestionAdmin");
            resetSuggestionAdmin();
        }
        document.getElementById(choosePage).style.display = "block";
        setChooseAdmin();
        document.getElementById(choosePage).style.display = "block";
        setStyleChoose();
        choose.style.background = "#c1d0d0";
        choose.style.color = "#094c72";
    })
}

//print list to page

function printList(list = [], countPage, namePage) {
    document.getElementById(`changePage${namePage}`).insertAdjacentHTML('afterbegin', `<button id="prePage${namePage}" class="changePage">&#8249;</button>`);
    document.getElementById(`changePage${namePage}`).insertAdjacentHTML('beforeend', `<button id="nextPage${namePage}" class="changePage">&#8250;</button>`);
    let tableID = document.querySelector(`#${namePage}Content table`);
    let i = (countPage - 1) * 10;
    let lastInPage = (countPage - 1) * 10 + 10;
    if (list.length <= 10) {
        document.getElementById(`changePage${namePage}`).style.display = "none";
    }
    else {
        document.getElementById(`changePage${namePage}`).style.display = "flex";
    }
    if ((countPage - 1) == 0) {
        document.getElementById(`countPage${namePage}`).textContent = countPage;
        document.getElementById(`prePage${namePage}`).style.visibility = "hidden";
    }
    else {
        document.getElementById(`prePage${namePage}`).style.visibility = "visible";
    }
    if (namePage == "Music") {
        while (i < lastInPage) {
            tableID.insertAdjacentHTML('beforeend',
                `<tr>
                <td>
                    <p>${list[i].name} - ${list[i].singer}</p>
                </td>
                <td>
                    <button onclick ="update${namePage}Admin(${list[i].id})">Update</button>
                    <button onclick="deleteAdmin('${namePage}',${list[i].id})">Delete</button>
                </td>
            </tr>`)
            if (i == list.length - 1) {
                document.getElementById(`nextPage${namePage}`).style.visibility = "hidden";
                break;
            }
            i++;
        }
        if (i < list.length - 1) {
            document.getElementById(`nextPage${namePage}`).style.visibility = "visible";
        }
    }
    else if (namePage == "Upload") {
        while (i < lastInPage) {
            tableID.insertAdjacentHTML('beforeend',
                `<tr>
                <td>
                    <p>${list[i].name} - ${list[i].singer} - <span>${list[i].checkSeen}</span></p>
                </td>
                <td>
                    <button onclick ="add${namePage}Admin(${list[i].id})">Add</button>
                    <button onclick="deleteAdmin('${namePage}',${list[i].id})">Delete</button>
                </td>
            </tr>`)
            if (i == list.length - 1) {
                document.getElementById(`nextPage${namePage}`).style.visibility = "hidden";
                break;
            }
            i++;
        }
        if (i < list.length - 1) {
            document.getElementById(`nextPage${namePage}`).style.visibility = "visible"
        }
    }
    else if (namePage == "Request") {
        while (i < lastInPage) {
            tableID.insertAdjacentHTML('beforeend',
                `<tr>
                <td>
                    <p>${list[i].name} - ${list[i].singerAuthor}</p>
                </td>
                <td>
                    <button onclick="deleteAdmin('${namePage}',${list[i].id})">Delete</button>
                </td>
            </tr>`)
            if (i == list.length - 1) {
                document.getElementById(`nextPage${namePage}`).style.visibility = "hidden";
                break;
            }
            i++;
        }
        if (i < list.length - 1) {
            document.getElementById(`nextPage${namePage}`).style.visibility = "visible"
        }
    }
    else if (namePage == "Suggestion") {
        while (i < lastInPage) {
            tableID.insertAdjacentHTML('beforeend',
                `<tr>
                <td class="suggest" onclick="viewSuggestion(${list[i].id})">
                    <p>${list[i].subject} - <span>${list[i].checkSeen}</span></p>
                </td>
                <td>
                    <button onclick="deleteAdmin('${namePage}',${list[i].id})">Delete</button>
                </td>
            </tr>`)
            if (i == list.length - 1) {
                document.getElementById(`nextPage${namePage}`).style.visibility = "hidden";
                break;
            }
            i++;
        }
        if (i < list.length - 1) {
            document.getElementById(`nextPage${namePage}`).style.visibility = "visible";
        }
    }


    document.getElementById(`prePage${namePage}`).addEventListener('click', () => {
        removeChange(namePage);
        let countPageID = document.getElementById(`countPage${namePage}`);
        let listTr = document.querySelectorAll(`#${namePage}Content tr`);
        for (let i = 1; nodeTr = listTr[i]; ++i) {
            nodeTr.remove();
        }
        countPage = Number(countPageID.textContent) - 1;
        countPageID.textContent = countPage;
        printList(list, countPage, namePage);
    })

    document.getElementById(`nextPage${namePage}`).addEventListener('click', () => {
        removeChange(namePage);
        let countPageID = document.getElementById(`countPage${namePage}`);
        let listTr = document.querySelectorAll(`#${namePage}Content tr`);
        for (let i = 1; nodeTr = listTr[i]; ++i) {
            nodeTr.remove();
        }
        countPage = Number(countPageID.textContent) + 1;
        countPageID.textContent = countPage;
        printList(list, countPage, namePage);
    })
}

//remove button changepage

function removeChange(namePage) {
    if (document.getElementById(`prePage${namePage}`) != null) document.getElementById(`prePage${namePage}`).remove();
    if (document.getElementById(`nextPage${namePage}`) != null) document.getElementById(`nextPage${namePage}`).remove();
}

//delete admin
async function deleteAdmin(namePage, musicID) {
    if (namePage == "Music") {
        deleteData(musicUrl, musicID);
    }
    else if (namePage == "Upload") {
        deleteData(uploadUrl, musicID);
    }
    else if (namePage == "Request") {
        deleteData(requestUrl, musicID);
    }
    else if (namePage == "Suggestion") {
        deleteData(suggestionUrl, musicID);
    }
    document.getElementById(`result${namePage}Admin`).style.color = "green";
    document.getElementById(`result${namePage}Admin`).textContent = "Xóa thành công!";
    setTimeout(() => {
        if (namePage == "Music") {
            resetMusicAdmin();
        }
        else if (namePage == "Upload") {
            resetUploadAdmin();
        }
        else if (namePage == "Request") {
            resetRequestAdmin();
        }
        else if (namePage == "Suggestion") {
            resetSuggestionAdmin();
        }
    }, 1500);
}

//process musics admin

getChoose("musicsAdmin");

async function getMucsicsAdmin(countPage) {
    let response = await fetch(musicUrl);
    let listMusics = await response.json();
    if (listMusics.length == 0) {
        blockHTML("noDataMusic");
        noneHTML("changePageMusic");
    }
    else {
        noneHTML("noDataMusic");
        document.getElementById("changePageMusic").style.display = "flex";
        //print list music
        printList(listMusics, countPage, "Music");
    }

    //search music
    function searchMusicAdmin() {
        removeChange("Music");
        let keyWords = document.getElementById("searchID").value;
        let listTr = document.querySelectorAll("#MusicContent table tr");
        for (let i = 1; nodeTr = listTr[i]; ++i) {
            nodeTr.remove();
        }
        let listMusicKeyword = [];
        for (let x of listMusics) {
            if (xoa_dau(x.name).toLowerCase().search(keyWords.toLowerCase()) != -1 || xoa_dau(x.singer).toLowerCase().search(keyWords.toLowerCase()) != -1) {
                listMusicKeyword.push(x);
            }
        }
        if (listMusicKeyword.length == 0) {
            blockHTML("noDataMusic");
            noneHTML("changePageMusic");
        }
        else {
            noneHTML("noDataMusic");
            document.getElementById("changePageMusic").style.display = "flex";
            printList(listMusicKeyword, 1, "Music");
        }
    }
    document.getElementById("searchID").removeEventListener('keyup', searchMusicAdmin);
    document.getElementById("searchID").addEventListener('keyup', searchMusicAdmin);

    //get filter
    let listMusicsGenre = {};
    for (let x of listMusics) {
        if (listMusicsGenre[x.genre.toUpperCase()] == undefined) {
            listMusicsGenre[x.genre.toUpperCase()] = [];
            listMusicsGenre[x.genre.toUpperCase()].push(x);
        }
        else {
            listMusicsGenre[x.genre.toUpperCase()].push(x);
        }
    }
    let filterMusic = document.getElementById("filterAdminMusic");
    for (let i in listMusicsGenre) {
        filterMusic.insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
    }
    function filterAdmin() {
        let listTr = document.querySelectorAll(`#MusicContent table tr`);
        for (let i = 1; nodeTr = listTr[i]; ++i) {
            nodeTr.remove();
        }
        let keyFilter = filterMusic.value;
        removeChange("Music");
        if (keyFilter == "all") printList(listMusics, 1, "Music");
        else {
            printList(listMusicsGenre[keyFilter], 1, "Music");
        }
    }
    filterMusic.removeEventListener('change', filterAdmin);
    filterMusic.addEventListener('change', filterAdmin);
}

//reset page musics admin

function resetMusicAdmin() {
    removeChange("Music");
    document.querySelector("#musicsAdmin form").reset();
    document.getElementById("filterAdminMusic").value = "all";
    document.getElementById("resultMusicAdmin").textContent = "";
    let listButton = document.querySelectorAll("#buttonMusicAdmin button");
    if (listButton[2] != null) listButton[2].remove();
    let listTr = document.querySelectorAll("#MusicContent table tr");
    for (let i = 1; nodeTr = listTr[i]; ++i) {
        nodeTr.remove();
    }
    let listOption = document.querySelectorAll("#filterAdminMusic option");
    for (let i = 1; nodeOp = listOption[i]; ++i) {
        nodeOp.remove();
    }
    document.getElementById("addMusicAdmin").style.display = "flex";
    getMucsicsAdmin(1);
}

//add music

function addAdmin(namePage) {
    let nameUp = document.getElementById(`name${namePage}Admin`);
    let authorUp = document.getElementById(`author${namePage}Admin`);
    let singerUp = document.getElementById(`singer${namePage}Admin`);
    let genreUp = document.getElementById(`genre${namePage}Admin`);
    let lyricsUp = document.getElementById(`lyrics${namePage}Admin`);
    let iframeUp = document.getElementById(`iframe${namePage}Admin`);
    document.getElementById(`result${namePage}Admin`).textContent = "";
    if (nameUp.value == "" || authorUp.value == "" || singerUp.value == "" || genreUp.value == "" || lyricsUp.value == "" || iframeUp.value == "") {
        document.getElementById(`result${namePage}Admin`).style.color = "red";
        document.getElementById(`result${namePage}Admin`).textContent = "Cần nhập đủ các trường!";
    }
    else {
        let data = {
            name: nameUp.value,
            author: authorUp.value,
            singer: singerUp.value,
            genre: genreUp.value,
            lyrics: lyricsUp.value,
            iframeUrl: iframeUp.value,
            countSeen: Math.floor(Math.random() * 100),
            listUserYT: "yeuThich"
        }
        postData(musicUrl, data);
        document.getElementById(`result${namePage}Admin`).style.color = "green";
        document.getElementById(`result${namePage}Admin`).textContent = "Thêm thành công!";
        document.querySelector("#musicsAdmin form").reset();
        setTimeout(() => {
            resetMusicAdmin();
        }, 1500);
    }
}

function addMusicAdmin() {
    addAdmin("Music");
}

document.getElementById("addMusicAdmin").addEventListener("click", addMusicAdmin);

//update music

let nameUp = document.getElementById(`nameMusicAdmin`);
let authorUp = document.getElementById(`authorMusicAdmin`);
let singerUp = document.getElementById(`singerMusicAdmin`);
let genreUp = document.getElementById(`genreMusicAdmin`);
let lyricsUp = document.getElementById(`lyricsMusicAdmin`);
let iframeUp = document.getElementById(`iframeMusicAdmin`);
async function updateMusicAdmin(musicID) {
    let response = await fetch(musicUrl);
    let listMusics = await response.json();
    if (document.getElementById("updateMusicAdmin") != null) {
        document.getElementById("updateMusicAdmin").remove();
    }
    document.getElementById("buttonMusicAdmin").insertAdjacentHTML('beforeend', `<button id="updateMusicAdmin">Update</button>`);
    document.getElementById("resultMusicAdmin").textContent = "";
    document.getElementById("addMusicAdmin").style.display = "none";
    for (let x of listMusics) {
        if (x.id == musicID) {
            nameUp.value = x.name;
            authorUp.value = x.author;
            singerUp.value = x.singer;
            genreUp.value = x.genre;
            lyricsUp.value = x.lyrics;
            iframeUp.value = x.iframeUrl;
            document.getElementById("updateMusicAdmin").addEventListener('click', () => {
                if (nameUp.value == x.name && authorUp.value == x.author && singerUp.value == x.singer && genreUp.value == x.genre && lyricsUp.value == x.lyrics && iframeUp.value == x.iframeUrl) {
                    document.getElementById("resultMusicAdmin").style.color = "red";
                    document.getElementById("resultMusicAdmin").textContent = "Bạn chưa thay đổi gì cả!";
                }
                else if (nameUp.value == "" || authorUp.value == "" || singerUp.value == "" || genreUp.value == "" || lyricsUp.value == "" || iframeUp.value == "") {
                    document.getElementById("resultMusicAdmin").style.color = "red";
                    document.getElementById("resultMusicAdmin").textContent = "Cần nhập đủ các trường!";
                }
                else {
                    let data = {
                        name: nameUp.value,
                        author: authorUp.value,
                        singer: singerUp.value,
                        genre: genreUp.value,
                        lyrics: lyricsUp.value,
                        iframeUrl: iframeUp.value,
                        countSeen: x.countSeen
                    }
                    updateData(musicUrl, musicID, data);
                    document.getElementById("resultMusicAdmin").style.color = "green";
                    document.getElementById("resultMusicAdmin").textContent = "Cập nhật thành công!";
                    document.querySelector("#MusicContent form").reset();
                    setTimeout(() => {
                        resetMusicAdmin();
                    }, 1500);
                }
            })
        }
    }
}

//clear form music admin

document.getElementById("clearMusicAdmin").addEventListener('click', () => {
    document.querySelector("#musicsAdmin form").reset();
    if (document.getElementById("updateMusicAdmin") != null) {
        document.getElementById("updateMusicAdmin").remove();
    }
    document.getElementById("addMusicAdmin").style.display = "flex";
})

//process upload admin

getChoose("uploadAdmin");

async function getUploadAdmin(countPage) {
    let response = await fetch(uploadUrl);
    let listUpload = await response.json();
    if (listUpload.length == 0) {
        blockHTML("noDataUpload");
        noneHTML("changePageUpload");
    }
    else {
        noneHTML("noDataUpload");
        document.getElementById("changePageUpload").style.display = "flex";
        //print list Upload
        printList(listUpload, countPage, "Upload");
    }

    //filter seen Upload
    let listSeenUpload = {};
    for (let x of listUpload) {
        if (listSeenUpload[x.checkSeen] == undefined) {
            listSeenUpload[x.checkSeen] = [];
            listSeenUpload[x.checkSeen].push(x);
        }
        else {
            listSeenUpload[x.checkSeen].push(x);
        }
    }
    function filterUploadAdmin() {
        filter(listUpload, listSeenUpload, "Upload");
    }
    document.getElementById("filterAdminUpload").removeEventListener('change', filterUploadAdmin);
    document.getElementById("filterAdminUpload").addEventListener('change', filterUploadAdmin);
}

function filter(listData = [], listFilter = {}, namePage) {
    let filter = document.getElementById(`filterAdmin${namePage}`);
    let listTr = document.querySelectorAll(`#${namePage}Content table tr`);
    for (let i = 1; nodeTr = listTr[i]; ++i) {
        nodeTr.remove();
    }
    removeChange(namePage);
    let keyFilter = filter.value;
    if (keyFilter == "all") {
        if (listData.length == 0) {
            blockHTML(`noData${namePage}`);
            noneHTML(`changePage${namePage}`);
        }
        else {
            noneHTML(`noData${namePage}`);
            document.getElementById(`changePage${namePage}`).style.display = "flex";
            printList(listData, 1, namePage);
        }
    }
    else {
        if (listFilter[keyFilter] == null) {
            blockHTML(`noData${namePage}`);
            noneHTML(`changePage${namePage}`);
        }
        else {
            noneHTML(`noData${namePage}`);
            document.getElementById(`changePage${namePage}`).style.display = "flex";
            printList(listFilter[keyFilter], 1, namePage);
        }
    }
}
//reset upload admin
function resetUploadAdmin() {
    removeChange("Upload");
    document.querySelector("#uploadAdmin form").reset();
    document.getElementById("filterAdminUpload").value = "all";
    document.getElementById("resultUploadAdmin").textContent = "";
    if (document.getElementById("addUploadAdmin") != null) document.getElementById("addUploadAdmin").remove();
    let listTr = document.querySelectorAll("#UploadContent table tr");
    for (let i = 1; nodeTr = listTr[i]; ++i) {
        nodeTr.remove();
    }
    getUploadAdmin(1);
}

//add upload
let nameUpload = document.getElementById("nameUploadAdmin");
let authorUpload = document.getElementById("authorUploadAdmin");
let singerUpload = document.getElementById("singerUploadAdmin");
let genreUpload = document.getElementById("genreUploadAdmin");
let lyricsUpload = document.getElementById("lyricsUploadAdmin");
let iframeUpload = document.getElementById("iframeUploadAdmin");
async function addUploadAdmin(musicID) {
    let response = await fetch(uploadUrl);
    let listUpload = await response.json();
    document.getElementById("resultUploadAdmin").textContent = "";
    if (document.getElementById("addUploadAdmin") != null) {
        document.getElementById("addUploadAdmin").remove();
    }
    document.getElementById("buttonUploadAdmin").insertAdjacentHTML('beforeend', `<button id="addUploadAdmin">Add</button>`);
    for (let x of listUpload) {
        if (x.id == musicID) {
            nameUpload.value = x.name;
            authorUpload.value = x.author;
            singerUpload.value = x.singer;
            genreUpload.value = x.genre;
            lyricsUpload.value = x.lyrics;
            iframeUpload.value = x.iframeUrl;
            x.checkSeen = "Đã xem";
            updateData(uploadUrl, x.id, x);
            document.getElementById("addUploadAdmin").addEventListener('click', () => {
                if (nameUpload.value == "" || authorUpload.value == "" || singerUpload.value == "" || genreUpload.value == "" || lyricsUpload.value == "" || iframeUpload.value == "") {
                    document.getElementById("resultUploadAdmin").style.color = "red";
                    document.getElementById("resultUploadAdmin").textContent = "Cần nhập đủ các trường!";
                }
                else {
                    let data = {
                        name: nameUpload.value,
                        author: authorUpload.value,
                        singer: singerUpload.value,
                        genre: genreUpload.value,
                        lyrics: lyricsUpload.value,
                        iframeUrl: iframeUpload.value,
                        countSeen: Math.floor(Math.random() * 100)
                    }
                    postData(musicUrl, data);
                    deleteData(uploadUrl, x.id);
                    document.getElementById("resultUploadAdmin").style.color = "green";
                    document.getElementById("resultUploadAdmin").textContent = "Thêm thành công!";
                    document.querySelector("#uploadAdmin form").reset();
                    setTimeout(() => {
                        resetUploadAdmin();
                        document.getElementById("addUploadAdmin").remove();
                    }, 1500);
                }
            })
        }
    }
}

//clear Upload Admin
document.getElementById("clearUploadAdmin").addEventListener('click', () => {
    document.querySelector("#UploadContent form").reset();
    if (document.getElementById("addUploadAdmin") != null) {
        document.getElementById("addUploadAdmin").remove();
    }
})

//process request admin
getChoose("requestAdmin");
async function getRequestAdmin(countPage) {
    let response = await fetch(requestUrl);
    let listRequest = await response.json();
    if (listRequest.length == 0) {
        blockHTML("noDataRequest");
        noneHTML("changePageRequest");
    }
    else {
        noneHTML("noDataRequest");
        document.getElementById("changePageRequest").style.display = "flex";
        //print list Request
        printList(listRequest, countPage, "Request");
    }
}

//reset request admin

function resetRequestAdmin() {
    removeChange("Request");
    document.getElementById("resultRequestAdmin").textContent = "";
    let listTr = document.querySelectorAll("#RequestContent table tr");
    for (let i = 1; nodeTr = listTr[i]; ++i) {
        nodeTr.remove();
    }
    getRequestAdmin(1);
}

//process suggest admin
getChoose("suggestionAdmin");
async function getSuggestionAdmin(countPage) {
    let response = await fetch(suggestionUrl);
    let listSuggestion = await response.json();
    if (listSuggestion.length == 0) {
        blockHTML("noDataSuggestion");
        noneHTML("changePageSuggestion");
    }
    else {
        noneHTML("noDataSuggestion");
        document.getElementById("changePageSuggestion").style.display = "flex";
        //print list Suggestion
        printList(listSuggestion, countPage, "Suggestion");
    }

    //filter seen suggestion
    let listSeenSuggestion = {};
    for (let x of listSuggestion) {
        if (listSeenSuggestion[x.checkSeen] == undefined) {
            listSeenSuggestion[x.checkSeen] = [];
            listSeenSuggestion[x.checkSeen].push(x);
        }
        else {
            listSeenSuggestion[x.checkSeen].push(x);
        }
    }
    function filterSuggestionAdmin() {
        filter(listSuggestion, listSeenSuggestion, "Suggestion");
    }
    document.getElementById("filterAdminSuggestion").removeEventListener('change', filterSuggestionAdmin);
    document.getElementById("filterAdminSuggestion").addEventListener('change', filterSuggestionAdmin);
}

async function viewSuggestion(dataID) {
    let response = await fetch(suggestionUrl);
    let listSuggestion = await response.json();
    removeListHTML("#viewSuggestion p");
    for (let x of listSuggestion) {
        if (x.id == dataID) {
            x.checkSeen = "Đã xem";
            updateData(suggestionUrl, dataID, x);
            document.getElementById("viewSuggestion").insertAdjacentHTML(`beforeend`, `
            <p>Tên chủ đề: ${x.subject}</p>
            <p>Email: ${x.email}</p>
            <p>Nội dung:</p>
            <p>${x.content}</p>`);
            break;
        }
    }
}

//reset Suggestion admin

function resetSuggestionAdmin() {
    removeChange("Suggestion");
    removeListHTML("#viewSuggestion p");
    document.getElementById("filterAdminSuggestion").value = "all";
    document.getElementById("resultSuggestionAdmin").textContent = "";
    let listTr = document.querySelectorAll("#SuggestionContent table tr");
    for (let i = 1; nodeTr = listTr[i]; ++i) {
        nodeTr.remove();
    }
    getSuggestionAdmin(1);
}

//process logout admin 

let logOut = document.getElementById("logOutAdminID");
logOut.addEventListener('click', () => {
    setPageNone();
    setStyleChoose();
    getResetHomePage(-1);
    blockHTML("homepage");
    flexHTML("header");
    flexHTML("footer");
    localStorage.setItem("loginState", -1);
    localStorage.setItem("namePage", "homePage");
})

