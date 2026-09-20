/* Hlídač pošty — service worker: push notifikace */
const DB="hp-push", STORE="kv";
function idbGet(key){
  return new Promise((res)=>{
    const rq=indexedDB.open(DB,1);
    rq.onupgradeneeded=()=>rq.result.createObjectStore(STORE);
    rq.onerror=()=>res(null);
    rq.onsuccess=()=>{
      try{
        const tx=rq.result.transaction(STORE,"readonly").objectStore(STORE).get(key);
        tx.onsuccess=()=>res(tx.result||null); tx.onerror=()=>res(null);
      }catch(e){ res(null); }
    };
  });
}
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{
  e.waitUntil((async()=>{
    let title="Hlídač pošty", body="Nové informace o zásilkách — otevřete aplikaci.";
    try{
      const cfg=await idbGet("cfg");
      if(cfg&&cfg.url){
        const r=await fetch(cfg.url.replace(/\/$/,"")+"/digest?k="+encodeURIComponent(cfg.key));
        if(r.ok){ const d=await r.json(); if(d.title) title=d.title; if(d.body) body=d.body; }
      }
    }catch(err){}
    await self.registration.showNotification(title,{body, icon:"icon-192.png", badge:"icon-192.png", data:{url:"./"}});
  })());
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  e.waitUntil((async()=>{
    const all=await clients.matchAll({type:"window", includeUncontrolled:true});
    for(const c of all){ if("focus" in c) return c.focus(); }
    return clients.openWindow("./");
  })());
});
