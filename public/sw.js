// Apenas ficheiros da demonstração. Nunca guardar respostas de autenticação/API.
const CACHE='familia-demo-v3';
const FILES=['/','/index.html','/app.js','/model.js','/tv.js','/style.css','/icon.svg','/icon-192.png','/icon-512.png','/manifest.webmanifest','/fonts/nunito.ttf'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('familia-demo-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 const pathname=url.pathname;
 if(!FILES.includes(pathname))return;
 // Rede primeiro: uma visita online recebe os ficheiros atuais; cache em falha.
 event.respondWith(fetch(event.request).then(response=>{
  if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(pathname,copy)));}
  return response;
 }).catch(()=>caches.match(pathname)));
});
