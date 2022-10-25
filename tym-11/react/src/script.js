
let data = [
    {
        name: "usek1",
        date: "4.5.2032",
        state: "havarijní",
        link: null,
    },
    {
        name: "usek2",
        date: "4.4.2032",
        state: "špatný",
        link: null,
    },
    {
        name: "usek3",
        date: "24.5.2032",
        state: "havarijní",
        link: null,
    },
];

function addCell(text, row){
    let newCell = row.insertCell();
    let newText = document.createTextNode(text);
    newCell.appendChild(newText);
}

function addLinkCell(row){
    let newCell = row.insertCell();
    let newText = document.createElement("a");
    newText.classList.add("blue-link");
    newText.appendChild(document.createTextNode("zobrazit na mapě >"))
    newCell.appendChild(newText);
}

function drawTable(count){
    for (let i = 0; i < count; i++) {
        const usek = data[i];
        
        let newRow = table.insertRow();
        addCell(usek.name, newRow);
        addCell(usek.date, newRow);
        addCell(usek.state, newRow);
        addLinkCell(newRow);
    }
}  


// -----------------------------
// -----------------------------
// -----------------------------


let table = document.querySelector("#repairs-table");
console.log(table);

const MAX_SHOWN = 5;


fetch("https://google.com").then(
    (r) => {
        console.log(r);
        data = r.json();

        // let count = data.length();
        drawTable(data.lenght());
    }
).catch(
    (e) => console.log(e)
)


