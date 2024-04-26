const Kartier = 'Stat-V2';
const Dynamic = 'Flow-V2';

const ToKache =
[

'./index.html',

'./Crescendo/alphaicon.ico',
'./Crescendo/mainstyle.css',
'./Crescendo/manifest.json',
'./Crescendo/Ubuntu-UI.ttf',

'./Diminuendo/Alphadexie.js',
'./Diminuendo/Initialize.js',
'./Diminuendo/Kythirapin.js',

'./Diminuendo/zoneindex.js',
'./Diminuendo/zonelogue.js'



];

// Stuff...

self.addEventListener
(
	'install', (event) =>
{
	console.log('Service worker installing...');

	event.waitUntil
	(
	Promise.resolve()
	.then(() => caches.open(Kartier))
	.then((cache) => cache.addAll(ToKache))
  .then(() => caches.open(Dynamic))
	.then(() => self.skipWaiting())
	);
}
);

self.addEventListener
(
  'activate', (event) =>
{

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== Kartier && cacheName !== Dynamic) {
            console.log(cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(
      // Take control of all clients (pages) immediately
      self.clients.claim(),       console.log('pipe claimed')
    )
  );
});



self.addEventListener
(
	'fetch', async (event) =>
{
	let itemName = event.request.url;
	let pageName = event.request.referrer;

	let TryKartier = await caches.open(Kartier).then(c => c.match(event.request)); if (TryKartier) {console.log('Stat',itemName); return TryKartier;}
	let TryDynamic = await caches.open(Dynamic).then(c => c.match(event.request)); if (TryDynamic) {console.log('Dymo',itemName); return TryDynamic;}

	let networkResponse = await fetch(event.request);
	let clonedResponse = networkResponse.clone();
	
	if (networkResponse.ok)
	{
		if (itemName.includes('svga')) {
			let cloneSVGA = await caches.open(Kartier);
			await cloneSVGA.put(event.request, clonedResponse); return networkResponse;
			
		}

		if (itemName.includes('files') && !pageName.includes('logue')) {
			let Dynamiccache = await caches.open(Dynamic);
			await Dynamiccache.put(event.request, clonedResponse);
		}

		if (pageName.includes('logue')) {console.log('From Cat',itemName); return networkResponse;}


	}

	return networkResponse;
});