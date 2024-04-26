document.addEventListener
(
    "DOMContentLoaded", (e) =>
{

document.getElementById("deltaHome").addEventListener('click', async function(e)
{
    location.href = "./index.html";
});

document.getElementById("deltaMenu").addEventListener('click', async function(e)
{
    document.getElementById("slideMenu").classList.toggle('expanded');
});

document.getElementById("searchbar").addEventListener('input', async function(e)
{
    const searchBar = document.getElementById("searchbar");
    const divFilter = document.getElementsByClassName('JSfind');
    const findInput = searchBar.value.toLowerCase();

	for (let i = 0; i < divFilter.length; i++)
	{
		if (!divFilter[i].innerHTML.toLowerCase().includes(findInput))
		{divFilter[i].style.display = "none";}
		else
		{divFilter[i].style.display = "grid";}
	}
});

document.getElementById("cometsbtn").addEventListener('click', async function(e)
{
    document.getElementById("cometFlow").classList.toggle('expanded');

    const idata = await new Dexie(dBase).open();
    const Sales = await idata.table("sales").toArray();

    let totalSell = 0;
    Sales.forEach(item => totalSell += item.Sell);
    let totalCost = 0;
    Sales.forEach(item => totalCost += item.Cost);
    let profit = totalSell - totalCost;

    document.getElementById("cometSales").textContent = totalSell;
    document.getElementById("cometFaida").textContent = profit;
    document.getElementById("cometShift").textContent = lsShift;
});

document.getElementById("sm-a").onclick = function () {
    location.href = "./index.html";
};

document.getElementById("sm-e").onclick = function () {
    location.href = "./logue.html";
};

document.getElementById("sm-g").addEventListener('click', function(e)
{
    let current = parseInt(localStorage.getItem('Views'));
    let affirm = confirm(`Do you want to change icon view?`);
    if (affirm) {
        let change = current === 0 ? 1 : 0;
        localStorage.setItem('Views', change);
        alert(`Icon view has been changed.`);
        location.reload();
    }
});

document.getElementById("sm-h").addEventListener('click', function(e)
{
    let current = parseInt(localStorage.getItem('Shift'));
    let affirm = confirm(`The current shift is ${current}. Do you want to change it?`);
    if (affirm) {
        current++;
        localStorage.setItem('Shift', current);
        alert(`Shift has been changed to ${current}`);
        location.reload();
    }
});

}
);