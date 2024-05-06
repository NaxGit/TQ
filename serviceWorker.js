const Kartier = 'Stat-On';
const Dynamic = 'Flow-On';

const ToKache =
[

'./',
'./index.html',

'./serviceDeploy.js',

'./Crescendo/alphaicon.ico',
'./Crescendo/mainstyle.css',
'./Crescendo/manifest.json',
'./Crescendo/Ubuntu-UI.ttf',

'./Diminuendo/Alphadexie.js',
'./Diminuendo/Initialize.js',
'./Diminuendo/Kythirapin.js',

'./Diminuendo/zoneindex.js',
'./Diminuendo/zonelogue.js',

'./files/zero.png',

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
	'fetch', (event) =>
{
	const itemName = event.request.url;
	const pageName = event.request.referrer;

	event.respondWith
	(
		caches.match(event.request).then((response) => response || fetch(event.request))
	);
}
);  



// self.addEventListener
// (
// 	'fetch', async (event) =>
// {
// 	const itemName = event.request.url;
// 	const pageName = event.request.referrer;

// 	event.respondWith
// 	(
// 		await Promise.all
// 		([
// 			caches.open(Kartier).then((cache) => cache.match(event.request)),
// 			caches.open(Dynamic).then((cache) => cache.match(event.request))
// 		]).then(async (responses) =>
// 		{
// 			const cachedResponse = responses.find(response => response);
// 			return cachedResponse || await fetch(event.request)
// 			.then(async (networkResponse) =>
// 			{
// 				if (networkResponse.ok)
// 				{
// 					if (itemName.includes('files') && !pageName.includes('logue'))
// 					{
// 						const Dynamiccache = await caches.open(Dynamic);
// 						await Dynamiccache.put(event.request, networkResponse.clone());
// 					}
// 				}

// 				return networkResponse;
// 			  });
// 		  })
// 		);
	  
// });
