window.onload = function () {
    flexHTML("header");
    flexHTML("footer");
    if (typeof (Storage) != undefined) {
        let loginState = localStorage.getItem("loginState");
        let namePage = localStorage.getItem("namePage");
        if (loginState > 0) {
            let nameUser = localStorage.getItem("nameUser");
            let loginID = document.getElementsByClassName("loginID");
            let accountID = document.getElementsByClassName("accountID");
            let nameDisplay = document.getElementsByClassName("nameDisplay");
            for (let i = 0; i < 2; ++i) {
                loginID[i].style.display = "none";
                accountID[i].style.display = "block";
                nameDisplay[i].innerText = `${nameUser}`;
            }
            document.querySelector("#accountHPContent h1").style.display = "none";
            noneHTML("accountHP");
            processClickYT(loginState);
            if (namePage == "musicYTPage") {
                getPageYT(loginState);
            }
            else if (namePage == "musicYPage") {
                getPageYT(loginState);
                getMusicYT(localStorage.getItem("musicID"));
            }
            else {
                getResetHomePage(loginState);
            }
        }
        else if (loginState == 0) {
            resetAdminHome();
            if (namePage == "musicsAdmin") {
                resetMusicAdmin();
            }
            else if (namePage == "uploadAdmin") {
                resetUploadAdmin
            }
            else if (namePage == "requestAdmin") {
                resetRequestAdmin();
            }
            else if (namePage == "suggestionAdmin") {
                resetSuggestionAdmin();
            }
            let choose = document.getElementById(`${namePage}ID`);
            document.getElementById(namePage).style.display = "block";
            setChooseAdmin();
            document.getElementById(namePage).style.display = "block";
            setStyleChoose();
            choose.style.background = "#c1d0d0";
            choose.style.color = "#094c72";
        }
        else {
            localStorage.setItem("loginState", -1);
            loginState = localStorage.getItem("loginState");
            getResetHomePage(loginState);
            localStorage.setItem("namePage", "homePage");
        }
        if (namePage == "musicPage") {
            getPageMusic(localStorage.getItem("musicID"), loginState);
        }
        else if (namePage == "upload") {
            resetUpload();
        }
        else if (namePage == "request") {
            resetRequest();
        }
        else if (namePage == "suggest") {
            resetSuggest();
        }
        else if (namePage == "login") {
            resetLogin();
        }
        else if (namePage == "signUp") {
            resetSignUp();
        }
        processClickHomePage(loginState);
    }
}


