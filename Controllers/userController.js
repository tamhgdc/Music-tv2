//process homepage

localStorage.clear()

setPageNone();
noneHTML("header");
noneHTML("footer");

//set display homepage to block

function processClickHomePage(loginState) {
    let homePageID = document.getElementById("logo");
    homePageID.remove();
    let iconMenu = document.getElementById("iconMenu");
    iconMenu.insertAdjacentHTML(`afterend`, `<a id="logo" class="viewLogo"><i class="fas fa-headphones-alt"></i> THƯ VIỆN ÂM NHẠC</a>`);
    homePageID = document.getElementById("logo");
    homePageID.addEventListener('click', clickHomePage);
    function clickHomePage() {
        getResetHomePage(loginState);
        localStorage.setItem("namePage", "homePage");
    }
}

//processClickHomePage(-1);

//process icon menu

function showMenu() {
    let listMenuID = document.getElementById("listMenuID");
    if (listMenuID.className = "listMenu") {
        listMenuID.className += "Responsive";
        let win = document.getElementById("body");
        win.addEventListener('click', setViewMenu);
    }
    else {
        listMenuID.className = "listMenu";
    }
}

let listTheLoai = document.getElementsByClassName("theLoai");
let listAccount = document.getElementsByClassName("account");

function setViewMenu(e) {
    let listMenuID = document.getElementById("listMenuID");
    let iconMenu = document.getElementById("iconMenu");
    let iconTheLoai = document.querySelector(".theLoaiID p");
    let marginTheLoai = document.querySelector(".theLoaiID");
    let iconAccount = document.querySelector(".accountID p");
    let marginAccount = document.querySelector(".accountID");
    console.log(e.target);
    if (e.target != iconMenu && e.target != iconTheLoai && e.target != marginTheLoai && e.target != iconAccount && e.target != marginAccount) {
        listMenuID.className = "listMenu";
        listTheLoai[0].className = "theLoai viewTL";
        listAccount[0].className = "account viewAccount";
    }
}

//process hover the loai

let theLoai = document.getElementsByClassName("theLoaiID");

theLoai[0].addEventListener('click', () => {
    if (listTheLoai[0].className == "theLoai viewTL") {
        listTheLoai[0].className += "Responsive";
        listAccount[0].className = "account viewAccount";
    }
    else {
        listTheLoai[0].className = "theLoai viewTL";
    }
})

theLoai[1].addEventListener('mouseover', () => {
    listTheLoai[1].style.display = "flex";
})

theLoai[1].addEventListener('mouseout', () => {
    listTheLoai[1].style.display = "none";
})

//process hover username
let accountID = document.getElementsByClassName("accountID");

accountID[1].addEventListener('mouseover', () => {
    listAccount[1].style.display = "flex";
})

accountID[1].addEventListener('mouseout', () => {
    listAccount[1].style.display = "none";
})

accountID[0].addEventListener('click', () => {
    if (listAccount[0].className == "account viewAccount") {
        listAccount[0].className += "Responsive";
        listTheLoai[0].className = "theLoai viewTL";
    }
    else {
        listAccount[0].className = "account viewAccount";
    }
})



//process icon search

function viewSearchHeader() {
    let viewSearchID = document.getElementById("viewSearchID");
    let viewLogo = document.getElementById("logo");
    let viewIconSearch = document.getElementById("iconSearch");
    if (viewSearchID.className == "viewSearch") {
        viewIconSearch.className = "iconHeader fa fa-search";
        viewSearchID.className += "Responsive";
        viewLogo.className += "Responsive";
        let win = document.getElementById("body");
        win.addEventListener('click', setViewSearch);
    }
}

function setViewSearch(e) {
    let viewIconsearch = document.getElementById("iconSearch");
    let searchID = document.getElementById("searchHomePage");
    let viewSearchID = document.getElementById("viewSearchID");
    let viewLogo = document.getElementById("logo");
    if (e.target != searchID && e.target != viewIconsearch) {
        if (viewSearchID.className == "viewSearchResponsive") {
            viewSearchID.className = "viewSearch";
            viewLogo.className = "viewLogo";
            viewIconsearch.className = "viewIconSearch " + viewIconsearch.className;
        }
        document.getElementById("searchMusic").style.height = "0px";
        removeListHTML("#searchMusic li");
        document.getElementById("searchHomePage").value = "";
    }
}

async function getHomePage(loginState) {
    setPageNone();
    flexHTML("homepage");
    blockHTML("logoHomePage");
    // if(loginState == -1){
    //     blockHTML("logoHomePage");
    // }
    // else {
    //     blockHTML("yeuThichContent");
    // }

    // Print list music hay nhat
    let response = await fetch(musicUrl);
    let listMusics = await response.json();
    let listMusicsSortCountSeen = listMusics.sort((a, b) => { return b.countSeen - a.countSeen });
    getMusicsDB(listMusicsSortCountSeen, "musicHayNhat", 1, loginState);

    //print list music yeu thich
    // if(loginState != -1){
    //     let listMusicYeuThich = [];
    //     for (let x of listMusics){
    //         if(x.listUserYT.includes(`songYT${loginState}`)){
    //             listMusicYeuThich.push(x);
    //         }
    //     }
    //     if(listMusicYeuThich.length == 0){
    //         document.getElementById("countMusicYT").style.display = "block";
    //         document.getElementById("countmusicYeuThich").style.display = "none";
    //     }
    //     else{
    //         document.getElementById("countMusicYT").style.display = "none";
    //         let listMusicYeuThichSort = listMusicYeuThich.sort((a,b) => {return b.countSeen - a.countSeen});
    //         getMusicsDB(listMusicYeuThichSort, "musicYeuThich", 1, loginState);
    //     }
    // }

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
    getGenreHomePage(listMusicsGenre, loginState);

    //process search
    let keyWord = document.getElementById("searchHomePage");
    keyWord.addEventListener('input', (e) => {
        removeListHTML("#searchMusic li")
        let keyWords = e.target.value;
        if (keyWords == "") {
            noneHTML("searchMusic");
        }
        else {
            document.getElementById("searchMusic").style.display = "flex";
            let count = 0;
            for (let x of listMusics) {
                if (xoa_dau(x.name).toLowerCase().search(keyWords.toLowerCase()) != -1 || xoa_dau(x.singer).toLowerCase().search(keyWords.toLowerCase()) != -1) {
                    document.getElementById("searchMusic").insertAdjacentHTML('beforeend', `
                    <li>
                        <p class="nameSearch" onclick="getPageMusic(${x.id}, ${loginState})">${x.name}</p>
                        <p class="singerSearch">${x.singer}</p>
                    </li>`);
                    count++;
                }
            }
            if (count > 6) {
                document.getElementById("searchMusic").style.height = "280px";
                document.getElementById("searchMusic").style.overflowY = "scroll";
            }
            else {
                document.getElementById("searchMusic").style.height = "auto";
                document.getElementById("searchMusic").style.overflowY = "hidden";
            }
        }
    })
}




// get music from database
// function getMusicsDB(listMusics = [], contentHTMLID, xemThemID) {
//     let listMusicsID = document.getElementById(contentHTMLID);
//     let xemThem = document.querySelector(`#${xemThemID} p`);
//     let indexPrint = 0;
//     for (let i = indexPrint; i < indexPrint + 8; ++i) {
//         listMusicsID.insertAdjacentHTML('beforeend', `<li></li>`);
//         if (i == 99 || i == listMusics.length - 1) {
//             noneHTML(xemThemID);
//             break;
//         }
//     }
//     let listLi = document.querySelectorAll(`#${contentHTMLID} li`);
//     for (let i = indexPrint; nodeLi = listLi[i]; ++i) {
//         nodeLi.insertAdjacentHTML('beforeend', `
//         <p class="name" onclick="getPageMusic(${listMusics[i].id})">${listMusics[i].name}</p>
//         <p id="${listMusics[i].id}" class="${listMusics[i].listUserYT}"> <i class="far fa-heart"></i> </p><br>
//         <p class="singer">${listMusics[i].singer}</p>
//         <p class="countSeen"><i class="fas fa-headphones-alt"></i>${listMusics[i].countSeen}</p>`);
//         nodeLi.insertAdjacentHTML('beforeend', '<hr>');
//     }
//     indexPrint += 8;
//     xemThem.addEventListener('click', () => {
//         for (let i = indexPrint; i < indexPrint + 8; ++i) {
//             listMusicsID.insertAdjacentHTML('beforeend', `<li></li>`);
//             if (i == 99 || i == listMusics.length - 1) {
//                 noneHTML(xemThemID);
//                 break;
//             }
//         }
//         let listLi = document.querySelectorAll(`#${contentHTMLID} li`);
//         for (let i = indexPrint; nodeLi = listLi[i]; ++i) {
//             nodeLi.insertAdjacentHTML('beforeend', `
//             <p class="name" onclick="getPageMusic(${listMusics[i].id})">${listMusics[i].name}</p>
//             <p id="${listMusics[i].id}" class="${listMusics[i].listUserYT}"> <i class="far fa-heart"></i></p><br>
//             <p class="singer">${listMusics[i].singer}</p>
//             <p class="countSeen"><i class="fas fa-headphones-alt"></i>${listMusics[i].countSeen}</p>`);
//             nodeLi.insertAdjacentHTML('beforeend', '<hr>');
//             if (i == 99 || i == listMusics.length - 1) {
//                 break;
//             }
//         }
//         indexPrint += 8;
//     })
// }

function getMusicsDB(listMusics = [], contentHTMLID, countPage, loginState) {
    document.getElementById(`change${contentHTMLID}`).insertAdjacentHTML('afterbegin', `<button id="pre${contentHTMLID}" class="changeListUser">&#8249;</button>`);
    document.getElementById(`change${contentHTMLID}`).insertAdjacentHTML('beforeend', `<button id="next${contentHTMLID}" class="changeListUser">&#8250;</button>`);
    let listMusicsID = document.getElementById(contentHTMLID);
    let i = (countPage - 1) * 10;
    let lastInPage = (countPage - 1) * 10 + 10;
    if (listMusics.length <= 10) {
        document.getElementById(`count${contentHTMLID}`).style.display = "none";
    }
    else {
        document.getElementById(`count${contentHTMLID}`).style.display = "block";
    }
    if ((countPage - 1) == 0) {
        document.getElementById(`count${contentHTMLID}`).textContent = countPage;
        document.getElementById(`pre${contentHTMLID}`).style.visibility = "hidden";
    }
    else {
        document.getElementById(`pre${contentHTMLID}`).style.visibility = "visible";
    }
    if (contentHTMLID != "musicYeuThich") {
        while (i < lastInPage) {
            listMusicsID.insertAdjacentHTML('beforeend', `<li>
            <p class="sttMusic">${i + 1}.</p>
            <p class="name" onclick="getPageMusic(${listMusics[i].id}, ${loginState})">${listMusics[i].name}</p>
            <p class="${listMusics[i].id} ${listMusics[i].listUserYT}"> <i class="icon${listMusics[i].id} far fa-heart" onclick="processYT(${listMusics[i].id}, ${loginState})"></i> </p><br>
            <p class="singer">${listMusics[i].singer}</p>
            <p class="countSeen"><i class="fas fa-headphones-alt"></i>${listMusics[i].countSeen}</p>
            <hr></li>`);
            if (i == listMusics.length - 1) {
                document.getElementById(`next${contentHTMLID}`).style.visibility = "hidden";
                break;
            }
            i++;
        }
    }
    else {
        while (i < lastInPage) {
            listMusicsID.insertAdjacentHTML('beforeend', `<li id="${i+1}">
            <p class="sttMusic">${i + 1}.</p>
            <p class="name" onclick="getMusicYT(${listMusics[i].id})">${listMusics[i].name}</p>
            <p class="${listMusics[i].id} ${listMusics[i].listUserYT}" style="font-size: 25px !important;"> <i class="icon${listMusics[i].id} fa fa-close" onclick="processPageYT(${listMusics[i].id}, ${loginState},${i+1})"></i> </p><br>
            <p class="singer">${listMusics[i].singer}</p>
            <hr></li>`);
            if (i == listMusics.length - 1) {
                document.getElementById(`next${contentHTMLID}`).style.visibility = "hidden";
                break;
            }
            i++;
        }
    }

    if (i < listMusics.length - 1) {
        document.getElementById(`next${contentHTMLID}`).style.visibility = "visible";
    }

    if (loginState != -1) {
        let musicYTID = document.getElementsByClassName("yeuThich");
        let iconYTID = document.getElementsByClassName(`fa-heart`);
        for (let i = 0; nodeID = musicYTID[i], nodeIcon = iconYTID[i]; ++i) {
            if (nodeID.className.includes(` songYT${loginState}`)) {
                nodeIcon.className = nodeIcon.className.replace(`far`, "fas");
            }
        }
    }

    document.getElementById(`pre${contentHTMLID}`).addEventListener('click', () => {
        removeChangeUser(contentHTMLID);
        let countPageID = document.getElementById(`count${contentHTMLID}`);
        removeListHTML(`#${contentHTMLID} li`);
        countPage = Number(countPageID.textContent) - 1;
        countPageID.textContent = countPage;
        getMusicsDB(listMusics, contentHTMLID, countPage, loginState);
    })

    document.getElementById(`next${contentHTMLID}`).addEventListener('click', () => {
        removeChangeUser(contentHTMLID);
        let countPageID = document.getElementById(`count${contentHTMLID}`);
        removeListHTML(`#${contentHTMLID} li`);
        countPage = Number(countPageID.textContent) + 1;
        countPageID.textContent = countPage;
        getMusicsDB(listMusics, contentHTMLID, countPage, loginState);
    })

}

function removeChangeUser(nameList) {
    if (document.getElementById(`pre${nameList}`) != null) document.getElementById(`pre${nameList}`).remove();
    if (document.getElementById(`next${nameList}`) != null) document.getElementById(`next${nameList}`).remove();
}

function getGenreHomePage(listMusicsGenre = {}, loginState) {
    let listGenreID = document.getElementsByClassName("theLoai");
    for (let j = 0; j < 2; ++j) {
        for (let i in listMusicsGenre) {
            listGenreID[j].insertAdjacentHTML('beforeend', `<li onclick = "getMusicsGenre('${listMusicsGenre[i][0].genre.toUpperCase()}', ${loginState})"> ${i.toLowerCase()}</li>`);
        }
    }
}

async function getMusicsGenre(gen, loginState) {
    let response = await fetch(musicUrl);
    let listMusics = await response.json();
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
    document.querySelector("#theLoaiContent h1").textContent = gen;
    noneHTML("logoHomePage");
    setPageNone();
    blockHTML("theLoaiContent");
    blockHTML("homepage");
    // removeListHTML("#xemThemMusicsTheLoai p");
    removeChangeUser("musicTheLoai");
    let listLi = document.querySelectorAll("#musicTheLoai li");
    for (let i = 0; nodeLi = listLi[i]; ++i) {
        nodeLi.remove();
    }
    // document.getElementById("xemThemMusicsTheLoai").insertAdjacentHTML('beforeend', `<p>Xem thêm</p>`);
    // blockHTML("xemThemMusicsTheLoai");
    let listMusicsGenreSort = listMusicsGenre[gen].sort((a, b) => { return b.countSeen - a.countSeen });
    getMusicsDB(listMusicsGenreSort, "musicTheLoai", 1, loginState);
}

function getResetHomePage(loginState) {
    removeListHTML("#musicHayNhat li");
    removeListHTML(".theLoai li");
    removeListHTML("#musicTheLoai li");
    removeChangeUser("musicHayNhat");
    removeChangeUser("musicTheLoai");
    // removeListHTML("#xemThemMusicsTheLoai p");
    // removeListHTML("#xemThemHayNhat p");
    // document.getElementById("xemThemHayNhat").insertAdjacentHTML('beforeend', `<p>Xem thêm</p>`);
    // document.getElementById("xemThemMusicsTheLoai").insertAdjacentHTML('beforeend', `<p>Xem thêm</p>`);
    // blockHTML("xemThemHayNhat");
    // blockHTML("xemThemMusicsTheLoai");
    getHomePage(loginState);
}



//getHomePage(-1);



//process page music

async function getPageMusic(musicID, loginState) {
    let response = await fetch(musicUrl);
    let listMusics = await response.json();

    let index = 0;
    for (let x of listMusics) {
        if (x.id == musicID) break;
        index++;
    }
    let musicUpdate = listMusics[index];
    musicUpdate.countSeen += 1;
    updateData(musicUrl, musicID, musicUpdate);
    localStorage.setItem("namePage", "musicPage");
    localStorage.setItem("musicID", `${musicID}`);

    // set page music display to block
    setPageNone();
    flexHTML("pageMusic");
    document.querySelector(".nameMusic").textContent = `${listMusics[index].name}`;
    document.querySelector(".singerTitleMusic").textContent = `${listMusics[index].singer}`;
    let iframeID = document.querySelector("#pageMusic iframe");
    iframeID.src = listMusics[index].iframeUrl;
    document.querySelector(".authorMusic").textContent = `${listMusics[index].author}`;
    document.querySelector(".lyricsMusic").innerText = `${listMusics[index].lyrics}`;
    let gen = listMusics[index].genre.toUpperCase();
    document.querySelector("#musicSameGenre h1").textContent = gen;
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
    removeListHTML("#musicSame li");
    removeChangeUser("musicSame");
    // removeListHTML("#xemThemMusicsSame p");
    // document.getElementById("xemThemMusicsSame").insertAdjacentHTML('beforeend', `<p>Xem thêm</p>`);
    getMusicsDB(listMusicsGenre[gen], "musicSame", 1, loginState);
}

// process get page yêu thích



//process upload music

function resetUpload(){
    setPageNone();
    blockHTML("dangbaihat");
}

let uploadID = document.getElementsByClassName("uploadID");
for (let i = 0; i < 2; ++i) {
    uploadID[i].addEventListener('click', () => {
        resetUpload();
        localStorage.setItem("namePage", "upload");
    })
    let addUploadID = document.getElementById("addUpload");
    if(addUploadID != undefined) addUploadID.remove();
    let addUploadUser = document.getElementById("addUploadUser");
    addUploadUser.insertAdjacentHTML('beforeend', `<button id="addUpload" class="button1">Đăng bài hát</button>`);
    addUploadID = document.getElementById("addUpload");
    addUploadID.addEventListener('click', () => {
        let nameUpload = document.getElementById("nameUpload");
        let authorUpload = document.getElementById("authorUpload");
        let singerUpload = document.getElementById("singerUpload");
        let genreUpload = document.getElementById("genreUpload");
        let lyricsUpload = document.getElementById("lyricsUpload");
        let iframeUrlUpload = document.getElementById("linkUpload");
        let resultUpLoad = document.getElementById("uploadResult");
        if (nameUpload.value == "" || iframeUrlUpload.value == "") {
            resultUpLoad.style.color = "red";
            resultUpLoad.textContent = "Bắt buộc phải điền trường có dấu (*)";
        }
        else {
            resultUpLoad.style.color = "green";
            resultUpLoad.textContent = "Thành công! Đang chờ admin xét duyệt!";
            let musicUpLoad = {
                name: nameUpload.value,
                author: authorUpload.value,
                singer: singerUpload.value,
                genre: genreUpload.value,
                lyrics: lyricsUpload.value,
                iframeUrl: iframeUrlUpload.value,
                checkSeen: "Chưa xem"
            }
            postData(uploadUrl, musicUpLoad);
            document.querySelector("#upload form").reset();
            setTimeout(() => {
                resultUpLoad.textContent = "";
            }, 500)
        }
    })
}


//process request music
function resetRequest(){
    setPageNone();
    blockHTML("yeucaubaihat");
}

let requestID = document.getElementsByClassName("requestID");
for (let i = 0; i < 2; ++i) {
    requestID[i].addEventListener('click', () => {
        resetRequest();
        localStorage.setItem("namePage", "request");
    })
    let addRequestID = document.getElementById("addRequest");
    if(addRequestID != undefined) addRequestID.remove();
    let addRequestUser = document.getElementById("addRequestUser");
    addRequestUser.insertAdjacentHTML(`beforeend`, `<button id="addRequest" class="button1">Yêu cầu bài hát</button>`);
    addRequestID = document.getElementById("addRequest");
    addRequestID.addEventListener('click', () => {
        let nameRequest = document.getElementById("nameRequest");
        let singerAuthorRequest = document.getElementById("singerAuthorRequest");
        let resultRequest = document.getElementById("requestResult");
        if (nameRequest.value == "" || singerAuthorRequest.value == "") {
            resultRequest.style.color = "red";
            resultRequest.textContent = "Bắt buộc phải điền trường có dấu (*)";
        }
        else {
            resultRequest.style.color = "green";
            resultRequest.textContent = "Thành công! Đang chờ admin xử lý!"
            postData(requestUrl, { name: nameRequest.value, singerAuthor: singerAuthorRequest.value, checkSeen: "Not seen" });
            document.querySelector("#request form").reset();
            setTimeout(() => {
                resultRequest.textContent = "";
            }, 500)
        }
    })
}

//process lien he gop y

function resetSuggest(){
    setPageNone();
    blockHTML("lienhegopy");
}

let suggestionID = document.getElementsByClassName("suggestionID");
for (let i = 0; i < 2; ++i) {
    suggestionID[i].addEventListener('click', () => {
        resetSuggest();
        localStorage.setItem("namePage", "suggest");
    })
    let addSuggestionID = document.getElementById("addSuggestion");
    if (addSuggestionID != undefined) addSuggestionID.remove();
    let addSuggestionUser = document.getElementById("addSuggestionUser");
    addSuggestionUser.insertAdjacentHTML(`beforeend`, `<button id="addSuggestion" class="button1">Gửi thư</button>`);
    addSuggestionID = document.getElementById("addSuggestion");
    addSuggestionID.addEventListener('click', () => {
        let emailSuggestion = document.getElementById("emailSuggestion");
        let subjectSuggestion = document.getElementById("subjectSuggestion");
        let contentSuggestion = document.getElementById("contentSuggestion");
        let resultSuggestion = document.getElementById("suggestionResult");
        if (emailSuggestion.value == "" || subjectSuggestion.value == "" || contentSuggestion.value == "") {
            resultSuggestion.style.color = "red";
            resultSuggestion.textContent = "Bắt buộc phải điền trường có dấu (*)";
        }
        else {
            resultSuggestion.style.color = "green";
            resultSuggestion.textContent = "Hệ thống đã ghi nhận! Cảm ơn bạn đã góp ý!"
            postData(suggestionUrl, { email: emailSuggestion.value, subject: subjectSuggestion.value, content: contentSuggestion.value, checkSeen: "Chưa xem" });
            document.querySelector("#suggestion form").reset();
            setTimeout(() => {
                resultSuggestion.textContent = "";
            }, 500)
        }
    })
}

//process login 

// let loginID = document.getElementsByClassName("loginID");
// for (let i = 0; i < 2; ++i) {
//     loginID[i].addEventListener('click', () => {
//         setPageNone();
//         flexHTML("dangnhap");
//     })
// }

// async function processLogin() {
//     let response = await fetch(adminUrl);
//     let listAdmin = await response.json();
//     let addLoginID = document.getElementById("addLogin");
//     let userNameLogin = document.getElementById("userName");
//     let passWordLogin = document.getElementById("passWord");
//     let resultLogin = document.getElementById("loginResult");
//     addLoginID.addEventListener('click', () => {
//         if (userNameLogin.value == "" || passWordLogin.value == "") {
//             resultLogin.style.color = "red";
//             resultLogin.textContent = "Cần nhập đủ các trường!";
//         }
//         else {
//             let check = false;
//             for (let x of listAdmin) {
//                 if (userNameLogin.value == x.userName && passWordLogin.value == x.passWord) {
//                     check = true;
//                     break;
//                 }
//             }
//             if (check) {
//                 setPageNone();
//                 blockHTML("adminHomePage");
//                 noneHTML("header");
//                 noneHTML("footer");
//                 document.querySelector("#login form").reset();
//             }
//             else {
//                 resultLogin.style.color = "red";
//                 resultLogin.textContent = "Thông tin đăng nhập sai!";
//                 document.querySelector("#login form").reset();
//             }
//         }
//     })
// }


// processLogin();

//process signup for user

let signupID = document.getElementsByClassName("signupID");

function resetSignUp(){
    setPageNone();
    blockHTML("dangky");
    imageDangNhap.style.display = "block";
}

for (let i = 0; i < signupID.length; ++i) {
    signupID[i].addEventListener('click', () => {
        resetSignUp();
        localStorage.setItem("namePage", "signUp");
    })
}

let addSignup = document.getElementById("addSignup");
addSignup.addEventListener('click', processSignup);

let signupResult = document.getElementById("signupResult");

async function processSignup() {
    let response = await fetch(accountUrl);
    let listAccounts = await response.json();
    let emailSignup = document.getElementById("emailSignup");
    let usernameSignup = document.getElementById("usernameSignup");
    let passwordSignup = document.getElementById("passwordSignup");
    let taken;
    signupResult.style.color = "red";
    for (let x of listAccounts) {
        if (usernameSignup.value == x.userName) {
            taken = "usernameTaken";
        }
        else if (emailSignup.value == x.email) {
            taken = "emailTaken";
        }
    }
    if (taken == "usernameTaken") {
        signupResult.textContent = "Username này đã có người sử dụng! Bạn vui lòng chọn username khác.";
    }
    else if (taken == "emailTaken") {
        signupResult.textContent = "Email này hiện đã có tài khoản liên kết!";
    }
    else if (usernameSignup.value == "" || emailSignup.value == "" || passwordSignup.value == "") {
        signupResult.textContent = "Cần nhập đủ các trường!";
    }
    else if (!emailSignup.value.includes("@gmail.com")){
        signupResult.textContent = "Email không hợp lệ!";
    }
    else if(usernameSignup.value.length < 7){
        signupResult.textContent = "Tài khoản tối thiểu 6 kí tự";
    }
    else if(passwordSignup.value.length < 6){
        signupResult.textContent = "Mật khẩu tối thiểu 6 kí tự";
    }
    else if (usernameSignup.value.includes(" ") || emailSignup.value.includes(" ") || passwordSignup.value.includes(" ")){
        signupResult.textContent = "Các trường không được chứa kí tự đặc biệt!";
    }
    else {
        let newUser = {
            userName: `${usernameSignup.value}`,
            passWord: `${passwordSignup.value}`,
            email: `${emailSignup.value}`,
            role: "user"
        };
        postData(accountUrl, newUser);
        signupResult.style.color = "green";
        signupResult.textContent = "Bạn đã đăng ký thành công! Vui lòng chờ ít phút để hệ thống cập nhật tài khoản mới.";
        document.querySelector("#signup form").reset();
        setTimeout(() => {
            noneHTML("dangky");
            blockHTML("dangnhap");
            signupResult.textContent = "";
        }, 1000)
    }
}



//process dang xuat 
let signoutList = document.getElementsByClassName("signoutID");
for (let i = 0; i < 2; ++i) {
    signoutList[i].addEventListener("click", () => {
        for (let i = 0; i < 2; ++i) {
            accountID[i].style.display = "none";
            loginID[i].style.display = "block";
        }
        // for (let i=0; i < iconHeart.length; i++) {
        //     iconHeart[i].className = "far fa-heart";    
        // }
        setPageNone();
        processClickHomePage(-1);
        getResetHomePage(-1);
        blockHTML("homepage");
        document.querySelector("#accountHPContent h1").style.display = "block";
        blockHTML("accountHP");
        localStorage.setItem("loginState", -1);
        localStorage.setItem("namePage", "homePage");
    })
}

async function processYT(idMusic, loginState) {
    let response = await fetch(musicUrl);
    let listMusics = await response.json();
    if (loginState == -1) {
        setPageNone();
        blockHTML("dangnhap");
    }
    else {
        let index = 0;
        for (let x of listMusics) {
            if (x.id == idMusic) {
                break;
            }
            index++;
        }
        let musicUpdate = listMusics[index];
        let musicYTID = document.getElementsByClassName(idMusic);
        let iconYTID = document.getElementsByClassName(`icon${idMusic}`);
        for (let i = 0; nodeID = musicYTID[i], nodeIcon = iconYTID[i]; ++i) {
            if (nodeID.className.includes(` songYT${loginState}`)) {
                nodeID.className = nodeID.className.replace(` songYT${loginState}`, "");
                nodeIcon.className = `icon${idMusic} far fa-heart`;
            }
            else {
                nodeID.className += ` songYT${loginState}`;
                nodeIcon.className = `icon${idMusic} fas fa-heart`;
            }
        }
        musicUpdate.listUserYT = musicYTID[0].className.replace(`${idMusic} `, "");
        updateData(musicUrl, idMusic, musicUpdate);
    }
}