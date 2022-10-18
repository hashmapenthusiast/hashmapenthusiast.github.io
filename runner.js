let content =
    `YPWAIETOAENRMHMGEN MIVWDMKDTCBANGBFKW
NQLLWQMIRLVFSDROTN VKIIAAKIRLHADHESVG
LINVADMCURYBOFEUAI DRULRHTDEESEBREPYE
VRBOOHHSDEWEAANANN EERATOLITEJEPEPZFN
ANHIITBICPATELTTMH FEKETCHPMSNAFEWNQM
SFTOAINWLXARKLANFE NEWEDSANENTEGQLHUA
OENIRSRONOFKGVEKAR TLBGONGUWHILPAFNAS
EHERESSOVEMDGJTCWS RDMCORRODAPJNLSAWY
TASEWNHEVGRANOKNOT SHTOELHTICUTMLHOIO
HRFRONLRATTATTIQAT ANEUOASGNHSFALEHND`


const MAX_WIDTH = 72
const MAX_HEIGHT = 40

const split = content.split('\n');
const left = { offsetX: 0, offsetY: 0, data: [] }
    , right = { offsetX: 0, offsetY: 36, data: [] };
while (split.length > 0) {
    [a, b] = split.shift().split(' ');
    left.data.push(a);
    right.data.push(b);
}


const grid = Array(MAX_HEIGHT).fill(null).map(() => Array(MAX_WIDTH).fill(0))
console.table(grid)

//creates table from array
const createTable = (arr) => {
    const table = document.createElement('table');
    for (let row = 0; row < arr.length; row++) {
        let tr = document.createElement('tr');
        for (let i = 0; i < arr[row].length; i++) {
            let cell = document.createElement('td');
            cell.innerHTML = arr[row][i];
            tr.appendChild(cell);
        };
        table.appendChild(tr)
    }
    return table;
}

//render the table with an id
const renderTable = (data, id) => {
    //clear
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = ''
        }
    }
    //left
    for (let i = 0; i < left.data.length; i++) {
        for (let j = 0; j < left.data[i].length; j++) {
            grid[i * 2 + left.offsetX][j * 2 + left.offsetY] += left.data[i][j]
        }
    }
    //right
    for (let i = 0; i < right.data.length; i++) {
        for (let j = 0; j < right.data[i].length; j++) {
            grid[i * 2 + right.offsetX][j * 2 + right.offsetY] += right.data[i][j]
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].length > 1) {
                console.log('c-c-c-c-c-combo breaker');
                let str = grid[i][j]
                let temp = 0;
                for (let k = 0; k < str.length; k++) {
                    temp += str.charCodeAt(k) - 65;
                }
                temp++;
                temp %= 26;
                grid[i][j] = String.fromCharCode(temp + 65);
            }
        }
    }
//abcdefghijklmnopqrstuvwxyz'
//0123456789x123456789x12345
    const letterHash = {};
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].length > 0) {
                let str = grid[i][j];
                if(!(str in letterHash)){letterHash[str]=0}
                letterHash[str]++;
            }
        }
    }
    console.log(letterHash)



    const post = createTable(data);
    post.id = id;
    let change = document.getElementById(id)
    change.replaceWith(post);
}


//shifts 1 letter
const asciiShift = (letter) => {
    letter = letter.charCodeAt(0);
    letter -= 65;
    letter += 1;
    letter %= 26;
    letter += 65;
    letter = String.fromCharCode(letter);
    return letter;
}
const asciiShiftTable = (data) => {
    for (let i = 0; i < data.length; i++) {
        let temp = ''
        for (let j = 0; j < data[i].length; j++) {
            temp += asciiShift(data[i][j]);
        }
        data[i] = temp;
    }
    console.log(data);
}
const rowReverse = (row) => {
    return row.split('').reverse().join('');
}
const tableReverse = (data) => {
    for (let i = 0; i < data.length; i++) {
        data[i] = rowReverse(data[i]);
    }
}
const changeData = (data, func) => {
    func(data)
    for (let i = 0; i < left.length; i++) {
        for (let j = 0; j < left[i].length; j++) {
            grid[i][j] = left[i][j];
        }
    }
}
const leftMenu = document.getElementById('leftMenu');
const rightMenu = document.getElementById('rightMenu');
const buttonLC = document.getElementById('leftCaeser');
const buttonLR = document.getElementById('leftReverse');
const buttonLMU = document.getElementById('leftMoveUp');
const buttonLML = document.getElementById('leftMoveLeft');
const buttonLMR = document.getElementById('leftMoveRight');
const buttonLMD = document.getElementById('leftMoveDown');
const buttonRC = document.getElementById('rightCaeser');
const buttonRR = document.getElementById('rightReverse');
const buttonRMU = document.getElementById('rightMoveUp');
const buttonRML = document.getElementById('rightMoveLeft');
const buttonRMR = document.getElementById('rightMoveRight');
const buttonRMD = document.getElementById('rightMoveDown');

buttonLC.addEventListener('click', function (e) {
    changeData(left.data, asciiShiftTable);
    renderTable(grid, 'gridTable');
});

buttonLR.addEventListener('click', function (e) {
    changeData(left.data, tableReverse);
    renderTable(grid, 'gridTable');
});
buttonLML.addEventListener('click', (e) => {
    if (left.offsetY > 0) {
        left.offsetY -= 1;
        renderTable(grid, 'gridTable');
    } else {
        console.error('can\'t move more left');
    }
});
buttonLMR.addEventListener('click', (e) => {
    if (left.offsetY < 36) {
        left.offsetY += 1;
        renderTable(grid, 'gridTable');
    } else {
        console.error('can\'t move more right');
    }
});
buttonLMU.addEventListener('click', (e) => {
    if (left.offsetX > 0) {
        left.offsetX -= 1;
        renderTable(grid, 'gridTable');
    } else {
        console.error('can\'t move more up');
    }
});
buttonLMD.addEventListener('click', (e) => {
    if (left.offsetX < 20) {
        left.offsetX += 1;
        renderTable(grid, 'gridTable');
    } else {
        console.error('can\'t move more down');
    }
});
buttonRML.addEventListener('click', (e) => {
    if (right.offsetY > 0) {
        right.offsetY -= 1;
        renderTable(grid, 'gridTable');
    } else {
        console.error('can\'t move more left');
    }
});
buttonRMR.addEventListener('click', (e) => {
    if (right.offsetY < 36) {
        right.offsetY += 1;
        renderTable(grid, 'gridTable');
    } else {
        console.error('can\'t move more right');
    }
});
buttonRMU.addEventListener('click', (e) => {
    if (right.offsetX > 0) {
        right.offsetX -= 1;
        renderTable(grid, 'gridTable');
    } else {
        console.error('can\'t move more up');
    }
});
buttonRMD.addEventListener('click', (e) => {
    if (right.offsetX < 20) {
        right.offsetX += 1;
        renderTable(grid, 'gridTable');
    } else {
        console.error('can\'t move more down');
    }
});
buttonRC.addEventListener('click', function (e) {
    asciiShiftTable(right.data);
    renderTable(grid, 'gridTable');
});
buttonRR.addEventListener('click', function (e) {
    tableReverse(right.data);
    renderTable(grid, 'gridTable');
});



renderTable(grid, 'gridTable');