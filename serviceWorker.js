const Kartier = 'Stat-V1';
const Dynamic = 'Flow-V1';

const ToKache =
[
'./',
'./index.html',

'./Crescendo/alphaicon.ico',
'./Crescendo/mainstyle.css',
'./Crescendo/manifest.json',
'./Crescendo/Ubuntu-UI.ttf',

'./Diminuendo/Alphadexie.js',
'./Diminuendo/Initialize.js',
'./Diminuendo/Kythirapin.js',

'./Diminuendo/zoneindex.js',
'./Diminuendo/zonelogue.js',

'./svga/a_store.png',
'./svga/b_coins.png',
'./svga/c_stock.png',
'./svga/d_repos.png',
'./svga/e_catal.png',
'./svga/f_newit.png',
'./svga/g_views.png',
'./svga/h_shift.png',

'./svga/1_comet.png',
'./svga/2_comet.png',
'./svga/3_comet.png',
'./svga/4_comet.png'

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
	const itemName = event.request.url;
	const pageName = event.request.referrer;

	const cachedResponse = await caches.match(event.request);

	if (cachedResponse)
	{
		console.log('From cache : ',itemName); return cachedResponse;
	}
	else
	{
		const networkResponse = await fetch(event.request);
		const clonedResponse = networkResponse.clone();

		if (networkResponse.ok)
		{
			if (itemName.includes('files') && !pageName.includes('logue'))
			{
				const Dynamiccache = await caches.open(Dynamic);
				await Dynamiccache.put(event.request, clonedResponse);
			}
		}
		return networkResponse;
	}
});
