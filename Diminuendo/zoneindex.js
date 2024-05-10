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
	
	console.table(Ary);

    let fragment = document.createDocumentFragment();

    Ary.forEach
    (
        (Q) =>
        {
            let card = document.createElement("div");
			card.className = 'JSfind';

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
const mpscan = document.getElementById("mpscan");
const dialog = document.getElementById('dialog');

dialog.addEventListener('click', ({target}) =>
{
    if (target.id === 'dialog')
	{
	dialog.close();
	}
	else
	{
	mpscan.play();
	navigator.vibrate(300);
	dialog.classList.add('glidings');
	}
});
dialog.addEventListener('transitionend', () =>
{
	dialog.close();
	dialog.classList.remove('glidings');
});
dialog.addEventListener('close', () => { dialog.innerHTML = ""; });

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