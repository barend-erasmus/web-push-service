(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebPushServiceDemo = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const publicKey = 'BH7ycnb_eKT4RvqRkbTSMVzCHJHXufNqHqhfuclK_m2OSgec7Uo7gJuryQA6tyxC0kjEVdTShh6i3w1HSRhBj3I';
const endpoint = 'http://localhost:8080/subscription/web-push-service-demo';
const key = 'd276ae86-ade3-4423-968b-a23a70fc7aa2';
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
        .register('service-worker.bundle.js');
    navigator.serviceWorker.ready.then((registration) => {
        return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(publicKey),
        });
    })
        .then((pushSubscription) => {
        return fetch(endpoint, {
            body: JSON.stringify(pushSubscription.toJSON()),
            headers: {
                Authorization: key,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
    })
        .catch((error) => {
        console.error(error);
    });
}
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

},{}]},{},[1])(1)
});
