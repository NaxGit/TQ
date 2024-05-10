document.addEventListener("DOMContentLoaded", (e) => {

document.getElementById("sheleves").addEventListener('click', function(e)
{
    document.getElementById("HOLDER").remove();
    let UPLOAD = e.target.id;
    
    let script = document.createElement("script");
    script.id = "HOLDER";
    script.src = "./library/" + UPLOAD;

    script.onload = function () {
        document.getElementById("iJava").innerHTML = "";
        let length = Shelf.length;
        console.log(length);
        generator(Shelf);
    };

    document.getElementById("library").append(script);
});

});

function generator(shelve) {
    shelve.forEach
        (
            (i) => {
                let card = document.createElement('div');
                card.id = i.SKU;
                card.className = 'JSfind';
                card.onclick = function(){ Select(this,i) };
                card.innerHTML =
                    `
                    <img src="${"./files/" + moi + "/" + i.iIcon}" onerror="this.src='./files/zero.png'">
                    <h1>${i.iName.split(" ")[0]}</h1>
                    <h2>${i.iName}</h2>
                    <small>${"./files/" + moi + "/" + i.iIcon}</small>
                    `;
                document.getElementById("iJava").append(card);
            }
        );
};


let idata;

(
    async () =>
    {
        idata = await new Dexie(dBase).open();
    }
)();

const product = { Show: 1 };

let formerdiv = 0;

function Select(e,i) {

    if (formerdiv !== 0) {formerdiv.classList.remove("catalogueHigh");}

    e.classList.add("catalogueHigh"); formerdiv = e;

    document.getElementById("costInput").value = "";
    document.getElementById("sellInput").value = "";
    document.getElementById("qtysInput").value = "";

    document.getElementById(e.id).insertAdjacentElement('afterend', document.getElementById("CATinput"));

    product.SKU = i.SKU;
    product.iIcon = "./files/" + moi + "/" + i.iIcon;
    product.iName = i.iName;
    product.Group = moi;
}

function cat6Punch() {
    let cost = document.getElementById("costInput").value;
    let sell = document.getElementById("sellInput").value;
    let qtys = document.getElementById("qtysInput").value;

    if (cost !== '' && sell !== '' && qtys !== '')
    {punch(cost,sell,qtys)}
    else
    {alert("Please fill in all fields");}
}
function punch(c,s,q) {
    product.Cost = Number(c);
    product.Sell = Number(s);
    product.Qtys = Number(q);
    stockItem(product)
}
async function stockItem(product) {
    try {
        await idata.table("stock").put(product);
        groupData(product.Group, product.iIcon);
    } catch (error) {
        console.error("Error in stockItem:", error);
    }
}
async function groupData(G, I) {
    try {
        await idata.table("group").put({ Group: G, iName: G, iIcon: I });
        document.getElementById("cloak").append(document.getElementById("CATinput"));
    } catch (error) {
        console.error("Error in groupData:", error);
    }
}