importScripts('/serviceworker-cache-polyfill.js');

var CACHE_NAME='jsparagatos';
var CACHE_VERSION='0.0.1';

var urlsToCache=['/','/stylesheets/style.css','/stylesheets/rainbow.github.css','/images/yarnify.png','/images/substack-cats.png','/images/console.gif','/images/console-strings.gif','/images/console-variables.gif','/images/console-replace.gif','/images/underscore.gif','/images/custom-function-manually.gif','/images/custom-function-call.gif','/images/custom-function-call-variable.gif','/images/custom-function-no-return.gif','/images/custom-function-console-log.gif','/images/array-access.png','/images/times-loop.png','/images/array-push-length.png','/images/array-lookup.png','/images/object-lookup.png','/images/bash-sleep.png','/images/customers1.png','/images/customers2.png','/images/customers3.png','/images/customers4.png','/images/customers5.jpg','/images/awesome.jpg','/images/translator.jpg'];

this.addEventListener('install',function(eve){
  var urls= urlsToCache.map(function(url){
    return new Request(url,{credentials:'include'});
  });
    
  eve
    .waitUntil(caches.open(CACHE_NAME+'-v'+ CACHE_VERSION)
    .then(function(cache){
      return cache.addAll(urls);
     }));
});

this.addEventListener('activate', function(eve){
  var currentCacheName=CACHE_NAME+'-v'+ CACHE_VERSION;
  caches.keys().then(function(cacheNames){
    return Promise.all(cacheNames.map(function(cacheName){
      if(cacheName!=currentCacheName){return caches.delete(cacheName);}
    }));
  });
});

this.addEventListener('fetch', function(eve){
  var request=eve.request;
  var url=new URL(request.url);
  eve.respondWith(caches.match(request).then(function(response){
    return response||fetch(request);
  }));
 });
