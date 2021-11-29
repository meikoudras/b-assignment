var countries = {
    0: 'et',
    1: 'fi',
    2: 'es',
    3: 'de',
    4: 'en',
};
var purposes = {
    0: 'car',
    1: 'health',
    2: 'business',
    3: 'realestate',
    4: 'debtconsolidation',
    5: 'vehicle',
    6: 'other',
    7: 'travel',
    8: 'realestaterepair',
};

function loadData() {
    return axios.get('investments.json').then(function(res) {
        return res.data.payload;
    })
}

function createHeader(table, columns) {
    var head = document.createElement('thead');
    var row = document.createElement('tr');
    head.appendChild(row);
    columns.forEach(function(column) {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(column));
        row.appendChild(th);
    })

    table.appendChild(head);

    return head;
}


function createBody(table) {
    var body = document.createElement('tbody')
    table.appendChild(body);
    return body;
}

function renderRow(body, rowData) {
    var row = document.createElement('tr');
    for (var property in rowData) {
        var value = rowData[property];
        if(property === 'country') {
            value = countries[value];
        }
        if(property === 'purpose') {
            value = purposes[value]
        }
        if(property === 'bondora_rating') {
            value = Array(value).join("*")
        }
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(value));
        row.appendChild(cell)
    }
    body.appendChild(row);

    return row;
}

function renderRows(body, data, index, step) {
    for(var i=index;i<index+step;i++) {
        if(data[i]) {
            renderRow(body, data[i]);
        } else {
            break;
        }
    }
} 

document.addEventListener("DOMContentLoaded", function() {
    var table = document.querySelector('#loans');
    var showMore = document.querySelector('#show-more')
    var showMoreBottom = document.querySelector('#show-more-bottom')
    var index = 0;
    var step = 100;

    loadData().then(function(rows) {
        var headerColumns = Object.keys(rows[0]);
        var head = createHeader(table, headerColumns);
        var body = createBody(table);
        renderRows(body, rows, index, step);
        function show(e){
            index += 100;
            renderRows(body, rows, index, step);
        }
        showMore.onclick = show;
        showMoreBottom.onclick = show;
    });

    var elements = document.querySelectorAll('thead');
    Stickyfill.add(elements);
  });