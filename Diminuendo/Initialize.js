// let mil = 1704785163784; const today = new Date(mil).toLocaleTimeString();

const dBase = 'CrownQ';

(
    function()
{
    const request = indexedDB.open(dBase, 1);
    request.onerror = function () { console.log('onerror'); };
    request.onsuccess = function () { console.log('onsuccess'); };
    request.onupgradeneeded = function (event)
    {

    const link = event.target.result;

    const stock = link.createObjectStore("stock", { keyPath: "SKU" });
    stock.createIndex("Show", "Show", { unique: false });
    stock.createIndex("Group", "Group", { unique: false });

    const group = link.createObjectStore("group", { keyPath: "Group" });

    const sales = link.createObjectStore("sales", { keyPath: "Stamp" });
    sales.createIndex("Shift", "Shift", { unique: false });

    console.log('onupgrade');
    };
}
)
();

//  localStorage.removeItem('Pload');
let preLoad = localStorage.getItem('Pload') !== null;
if (preLoad) {} else {
    localStorage.setItem('Pload', 1);
    localStorage.setItem('Views', 1);
    localStorage.setItem('Shift', 1);
    location.reload();
}
const lsViews = parseInt(localStorage.getItem('Views'));
const lsShift = parseInt(localStorage.getItem('Shift'));

if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('./serviceWorker.js', { scope: '/' })
    .then(registration =>
    {console.log('Service Worker registered');})
    .catch(error =>
    {console.error('Service Worker registration failed:', error);});
}

window.addEventListener('online', () => {
    // Code to be executed when the browser is online
    console.log('Online now! Matte Peter');
});
window.addEventListener('offline', () => {
    // Code to be executed when the browser is online
    console.log('offline now! Matte Peter');

    document.getElementById("sm-e").onclick = function () {
        location.href = "./offlin.html";
    };
});