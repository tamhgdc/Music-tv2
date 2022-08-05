function setPageNone() {
    let listIdPage = ["homepage", "pageMusic", "dangbaihat", "yeucaubaihat", "lienhegopy", "dangnhap","dangky", "YTMusic", "pageYTLeft", "adminHomePage", "theLoaiContent", "logoHomePage", "searchMusic"];
    for (let x of listIdPage) {
        noneHTML(x);
    }
    document.getElementById("searchHomePage").value = "";
    let iframeID = document.querySelector("#pageMusic iframe");
    if (iframeID != null) {
        iframeID.src = "";
    }
    iframeID = document.querySelector("#pageYT iframe");
    if (iframeID != null) {
        iframeID.src = "";
    }
    setInputNone();
    setChooseAdmin();
}

function setInputNone() {
    let listIdInput = ["upload", "request", "suggestion", "login", "signup"];
    for (let x of listIdInput) {
        document.querySelector(`#${x} form`).reset();
        document.getElementById(`${x}Result`).textContent = "";
    }
}


function setChooseAdmin() {
    let listChoose = ["musicsAdmin", "uploadAdmin", "requestAdmin", "suggestionAdmin"];
    for (let x of listChoose) {
        noneHTML(x);
    }
}

function setStyleChoose() {
    let listChoose = ["musicsAdminID", "uploadAdminID", "requestAdminID", "suggestionAdminID"];
    for (let x of listChoose) {
        document.getElementById(x).style.background = "#094c72";
        document.getElementById(x).style.color = "white";
    }
}

function removeListHTML(domHTML){
    let listHTML = document.querySelectorAll(domHTML);
    for(let i=0; nodeHTML = listHTML[i]; ++i){
        nodeHTML.remove();
    }
}

function blockHTML(domHTML){
    document.getElementById(domHTML).style.display = "block";
}

function flexHTML(domHTML){
    document.getElementById(domHTML).style.display = "flex";
}

function noneHTML(domHTML){
    document.getElementById(domHTML).style.display = "none";
}