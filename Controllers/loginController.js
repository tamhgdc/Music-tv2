//  process login

let loginID = document.getElementsByClassName("loginID");
let imageDangNhap = document.getElementById("imageDangNhap");

function resetLogin() {
    setPageNone();
    blockHTML("dangnhap");
    imageDangNhap.style.display = "block";
}

for (let i = 0; i < 3; ++i) {
    loginID[i].addEventListener('click', () => {
        resetLogin();
        localStorage.setItem("namePage", "login");
    })
}

let addLoginID = document.getElementById("addLogin");
addLoginID.addEventListener('click', processLogin);

function resetAdminHome() {
    setPageNone();
    blockHTML("adminHomePage");
    noneHTML("header");
    noneHTML("footer");
}

async function processLogin() {
    let response = await fetch(accountUrl);
    let listAccounts = await response.json();
    let userNameLogin = document.getElementById("userName");
    let passWordLogin = document.getElementById("passWord");
    let resultLogin = document.getElementById("loginResult");
    let accountID = document.getElementsByClassName("accountID");
    let nameDisplay = document.getElementsByClassName("nameDisplay");
    if (userNameLogin.value == "" || passWordLogin.value == "") {
        resultLogin.style.color = "red";
        resultLogin.textContent = "Cần nhập đủ các trường!";
    }
    else {
        let role = "";
        let nameUser = "";
        let loginState = -1;
        for (let x of listAccounts) {
            if (userNameLogin.value == x.userName && passWordLogin.value == x.passWord) {
                nameUser = x.userName;
                role = x.role;
                if (role == "user") {
                    loginState = x.id;
                }
                break;
            }
        }
        if (role == "admin") {
            resetAdminHome();
            document.querySelector("#login form").reset();
            localStorage.setItem("loginState", 0);
            localStorage.setItem("namePage", "adminHome");
        }
        else if (role == "user") {
            for (let i = 0; i < 2; ++i) {
                loginID[i].style.display = "none";
                accountID[i].style.display = "block";
                nameDisplay[i].innerText = `${nameUser}`;
            }
            setPageNone();
            blockHTML("homepage");
            document.querySelector("#accountHPContent h1").style.display = "none";
            noneHTML("accountHP");
            processClickYT(loginState);
            processClickHomePage(loginState);
            getResetHomePage(loginState);
            document.querySelector("#login form").reset();
            localStorage.setItem("namePage", `homePage`);
            localStorage.setItem("loginState", `${loginState}`);
            localStorage.setItem("nameUser", `${nameUser}`);
        }
        else {
            resultLogin.style.color = "red";
            resultLogin.textContent = "Thông tin đăng nhập sai!";
            document.querySelector("#login form").reset();
        }
    }
}


// process lick danh sach yeu thich

function processClickYT(loginState) {
    removeListHTML(".yeuThichID");
    let accountList = document.getElementsByClassName('account');
    for (let i = 0; i < 2; ++i) {
        accountList[i].insertAdjacentHTML("afterbegin", `<li class="yeuThichID">Danh sách yêu thích</li>`);
    }
    yeuThichClick = document.getElementsByClassName("yeuThichID");
    for (let i = 0; i < 2; ++i) {
        yeuThichClick[i].addEventListener('click', clickYT);
    }
    function clickYT() {
        getPageYT(loginState);
    }
}

async function getPageYT(loginState) {
    let response = await fetch(musicUrl);
    let listMusics = await response.json();
    setPageNone();
    flexHTML("YTMusic");
    noneHTML("logoYT");
    localStorage.setItem("namePage", "musicYTPage");
    removeListHTML("#musicYeuThich li");
    document.getElementById("pageYTRight").style.width = "50%";
    if (loginState != -1) {
        let listMusicYeuThich = [];
        for (let x of listMusics) {
            if (x.listUserYT.includes(`songYT${loginState}`)) {
                listMusicYeuThich.push(x);
            }
        }
        if (listMusicYeuThich.length == 0) {
            document.getElementById("countMusicYT").style.display = "block";
            document.getElementById("countmusicYeuThich").style.display = "none";
        }
        else {
            document.getElementById("countMusicYT").style.display = "none";
            let listMusicYeuThichSort = listMusicYeuThich.sort((a, b) => { return b.countSeen - a.countSeen });
            removeListHTML("#musicYeuThich li");
            removeChangeUser("musicYeuThich");
            getMusicsDB(listMusicYeuThichSort, "musicYeuThich", 1, loginState);
        }
    }
}

async function getMusicYT(musicID) {
    let response = await fetch(musicUrl);
    let listMusics = await response.json();
    blockHTML("pageYTLeft");
    blockHTML("logoYT");
    document.getElementById("pageYTRight").style.width = "35%";
    localStorage.setItem("namePage", "musicYPage");
    localStorage.setItem("musicID", `${musicID}`);
    let index = 0;
    for (let x of listMusics) {
        if (x.id == musicID) break;
        index++;
    }
    let musicUpdate = listMusics[index];
    musicUpdate.countSeen += 1;
    updateData(musicUrl, musicID, musicUpdate);
    document.getElementById("nameYT").textContent = `${listMusics[index].name}`;
    document.getElementById("singerYT").textContent = `${listMusics[index].singer}`;
    let iframeID = document.querySelector("#pageYT iframe");
    iframeID.src = listMusics[index].iframeUrl;
    document.getElementById("authorYT").textContent = `${listMusics[index].author}`;
    document.getElementById("lyricsYT").innerText = `${listMusics[index].lyrics}`;
}


async function processPageYT(musicID, loginState, indexLi) {
    let response = await fetch(musicUrl);
    let listMusics = await response.json();
    let index = 0;
    for (let x of listMusics) {
        if (x.id == musicID) {
            break;
        }
        index++;
    }
    let musicUpdate = listMusics[index];
    let listLiYT = document.querySelectorAll("#musicYeuThich li");
    let i;
    for (i = 0; nodeLiYT = listLiYT[i]; ++i) {
        if (nodeLiYT.id == indexLi) {
            nodeLiYT.remove();
            break;
        }
    }
    listLiYT = document.querySelectorAll("#musicYeuThich li");
    let listSttYT = document.querySelectorAll("#musicYeuThich .sttMusic");
    while (listLiYT[i] != undefined) {
        listSttYT[i].textContent = `${i + 1}.`;
        i++;
    }
    musicUpdate.listUserYT = musicUpdate.listUserYT.replace(` songYT${loginState}`, "");
    if (listLiYT[0] == undefined) {
        document.getElementById("countMusicYT").style.display = "block";
    }
    updateData(musicUrl, musicID, musicUpdate);
}


