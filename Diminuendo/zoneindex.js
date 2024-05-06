let idata;

(
    async () =>
    {
        idata = await new Dexie(dBase).open();

        if (lsViews === 1) {const stockAry = await idata.table("stock").toArray(); icons(stockAry, 1);}
        if (lsViews === 0) {const groupAry = await idata.table("group").toArray(); icons(groupAry, 0);}
    }
)();

function icons(Ary, n) {

    document.getElementById("iJava").innerHTML = "";

    let fragment = document.createDocumentFragment();

    Ary.forEach
    (
        (Q) =>
        {
            let card = document.createElement("div");

            let icon = document.createElement("img");
            icon.src = Q.iIcon;
            icon.onclick = function () {if (n === 1) {dialogFlash(Q);} else {getGroup(Q.iName);}};
            icon.onerror = function () {this.src = "./files/zero.png";};

            let name = document.createElement("div");
            name.textContent = Q.iName;

            card.append(icon, name);
            fragment.append(card);
        }
    );
    document.getElementById("iJava").append(fragment);
}

async function getGroup(gname) {
    const tapedAry = await idata.table("stock").where('Group').equals(gname).toArray();
    icons(tapedAry, 1);
}

document.addEventListener("DOMContentLoaded", (e) =>
{

const dialog = document.getElementById('dialog');

dialog.addEventListener('click', (event) =>
{
    if (event.target.id === 'dialog') {dialog.close();}
    else
    {
        let audio = document.getElementById("beep");
        audio.play();
        if ("vibrate" in navigator) {
            // Vibrate for 500 milliseconds
            navigator.vibrate(500);
          } else {
            alert("Vibration not supported in this browser.");
          }        
        dialog.classList.add('hide');
        dialog.addEventListener('webkitAnimationEnd', function anime()
        {
            dialog.classList.remove('hide');
            dialog.close();
        });
    }
});
dialog.addEventListener('close', (event) => { dialog.innerHTML = ""; });

});

function dialogFlash(e) {

    let dial = document.createElement('div'); dial.id = 'dial';

    let icon = document.createElement('img');
    icon.src = e.iIcon;
    icon.onerror = function () {this.src = "./files/zero.png";};

    let name = document.createElement('div');
    name.textContent = e.iName;
    let Sell = document.createElement('div');
    Sell.textContent = 'Ksh ' + e.Sell + '.oo';

    dial.onclick = function () { makeSale(e); };
    dial.append(icon, name, Sell);

    dialog.append(dial);
    dialog.showModal();
}

async function makeSale(P) {
    const ilink = await new Dexie(dBase).open();

    P.Qtys = 1;
    P.Stamp = Date.now();
    P.Shift = lsShift;

    P.Prof = P.Sell - P.Cost;

    
    await ilink.table("sales").add(P);

    const item = await ilink.table("stock").where('SKU').equals(P.SKU).first();

    if (item) {
        item.Qtys--;
        await ilink.table("stock").put(item);
        console.log('Zimmman bonanza');
    }
}