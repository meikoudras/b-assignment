const countries = {
    0: 'et',
    1: 'fi',
    2: 'es',
    3: 'de',
    4: 'en',
};
const purposes = {
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
    const head = document.createElement('thead');
    const row = document.createElement('tr');
    head.appendChild(row);
    columns.forEach(function(column) {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(column));
        row.appendChild(th);
    })

    table.appendChild(head);

    return head;
}


function createBody(table) {
    const body = document.createElement('tbody')
    table.appendChild(body);
    return body;
}

function renderRow(body, rowData) {
    const row = document.createElement('tr');
    for (const property in rowData) {
        let value = rowData[property];
        if(property === 'country') {
            value = countries[value];
        }
        if(property === 'purpose') {
            value = purposes[value]
        }
        if(property === 'bondora_rating') {
            value = Array(value).join("*")
        }
        const cell = document.createElement('td');
        cell.appendChild(document.createTextNode(value));
        row.appendChild(cell)
    }
    body.appendChild(row);

    return row;
}

function renderRows(body, data, index, step) {
    for(let i=index;i<index+step;i++) {
        if(data[i]) {
            renderRow(body, data[i]);
        } else {
            break;
        }
    }
} 

document.addEventListener("DOMContentLoaded", function() {
    const table = document.querySelector('#loans');
    const showMore = document.querySelector('#show-more')
    const showMoreBottom = document.querySelector('#show-more-bottom')
    let index = 0;
    let step = 100;

    loadData().then(function(rows) {
        const headerColumns = Object.keys(rows[0]);
        const head = createHeader(table, headerColumns);
        const body = createBody(table);
        renderRows(body, rows, index, step);
        function show(e){
            index += 100;
            renderRows(body, rows, index, step);
        }
        showMore.onclick = show;
        showMoreBottom.onclick = show;
    });

    const elements = document.querySelectorAll('thead th');
    Stickyfill.add(elements);
  });