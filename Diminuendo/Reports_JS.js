(
	async () =>
	{
		let idata = await new Dexie(dBase).open(); await idata.table('sales').toArray().then((data) => {r_sales(data)});
	}
)();

let Total = 0;

function r_sales(data) {

	document.getElementById("iJava").innerHTML = "";
	
	console.table(data);

	let fragment = document.createDocumentFragment();

	data.forEach
	(
		(i) =>
			{
				Total = Total + i.Sell;

				let row = document.createElement("div");
				row.className = 'JSfind';

				let time = document.createElement("div"); time.textContent = new Date(i.Stamp).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'});
				let name = document.createElement("div"); name.textContent = i.iName;
				let sell = document.createElement("div"); sell.textContent = i.Sell;

				row.append(time, name, sell);
				fragment.append(row);

			}
	);
	document.getElementById("iJava").append(fragment);
	document.getElementById("totsl").textContent = Total;
}

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