let ipc = require('electron').ipcRenderer;
let fs = require('fs');
let path = require('path');

window.onload = Init;

function Init() {
    let exepath = "";
    let inipath = "";

    let btnClose = document.getElementById('close');
    if (btnClose === null) {
        console.log("id: close isn't exist");
        return;
    }
    btnClose.onclick = () => {
        ipc.send('window_event_close');
    }

    let exeholder = document.getElementById('exe')
    if (exeholder === null) {
        console.log("id: exe isn't exist");
        return;
    }

    exeholder.ondragover = (e) => {
        e.preventDefault()
    }

    exeholder.ondrop = (e) => {
        e.preventDefault()
        let filepath = [];
        for (let f of e.dataTransfer.files) {
            filepath.push(f.path);
        }

        if (filepath.length === 0) {
            return;
        }

        if (filepath.length > 1) {
            alert("请放入一个文件");
            return;
        }

        if (fs.statSync(filepath[0]).isDirectory()) {
            alert("请放入exe文件");
            return;
        }

        if (path.extname(filepath[0]) !== ".exe") {
            alert("请放入exe文件");
            return;
        }

        let showPath = filepath[0];
        if (showPath.length > 30) {
            showPath = filepath[0].slice(0, 13);
            showPath += "......";
            showPath += filepath[0].slice(-13);
        }

        exepath = filepath[0];
        exeholder.innerHTML = showPath;
    }

    let iniholder = document.getElementById('ini')
    if (iniholder === null) {
        console.log("id: ini isn't exist");
        return;
    }

    iniholder.ondragover = (e) => {
        e.preventDefault()
    }

    iniholder.ondrop = (e) => {
        e.preventDefault()
        let filepath = [];
        for (let f of e.dataTransfer.files) {
            filepath.push(f.path);
        }

        if (filepath.length === 0) {
            return;
        }

        if (filepath.length > 1) {
            alert("请放入一个文件");
            return;
        }

        if (fs.statSync(filepath[0]).isDirectory()) {
            alert("请放入ini文件");
            return;
        }

        if (path.extname(filepath[0]) !== ".ini") {
            alert("请放入ini文件");
            return;
        }


        let showPath = filepath[0];
        if (showPath.length > 30) {
            showPath = filepath[0].slice(0, 13);
            showPath += "......";
            showPath += filepath[0].slice(-13);
        }

        inipath = filepath[0];
        iniholder.innerHTML = showPath;
    }

    let create = document.getElementById('create');
    if (create === null) {
        console.log("id: create isn't exist");
        return;
    }
    create.onclick = () => {
        if (exepath === "") {
            alert("请放入exe文件");
            return;
        }

        ipc.send('create', exepath, inipath);
    }
}