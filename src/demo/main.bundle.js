(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebPushServiceDemo = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const push_manager_1 = require("../helpers/push-manager");
function hasServiceWorkerFunctionality() {
    return 'serviceWorker' in navigator;
}
function hasPushManagerFunctionality() {
    return 'PushManager' in window;
}
function registerServiceWorker() {
    navigator.serviceWorker.register('service-worker.bundle.js');
}
function subscribe(channel, pushSubscription = null) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!pushSubscription) {
            pushSubscription = yield state.serviceWorkerRegistration.pushManager.getSubscription();
        }
        yield fetch(`${state.webPushServiceHost}/subscription/${channel}/${state.publicKey}`, {
            body: JSON.stringify(pushSubscription.toJSON()),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
    });
}
const state = {
    publicKey: '',
    webPushServiceHost: 'http://localhost:8080',
    serviceWorkerRegistration: null,
};
function initialize(publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        state.publicKey = publicKey;
        const x = hasPushManagerFunctionality();
        debugger;
        if (hasServiceWorkerFunctionality() && hasPushManagerFunctionality()) {
            registerServiceWorker();
            state.serviceWorkerRegistration = yield navigator.serviceWorker.ready;
            const pushSubscription = yield state.serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: push_manager_1.PushManagerHelper.publicKeyToApplicationServerKey(state.publicKey),
            });
            yield subscribe('default', pushSubscription);
        }
    });
}
exports.initialize = initialize;

},{"../helpers/push-manager":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PushManagerHelper {
    static publicKeyToApplicationServerKey(publicKey) {
        const publicKeyBase64 = PushManagerHelper.publicKeyToBase64(publicKey);
        const publicKeyBase64Decoded = PushManagerHelper.decodeBase64(publicKeyBase64);
        const array = new Uint8Array(publicKeyBase64Decoded.length);
        for (let i = 0; i < publicKeyBase64Decoded.length; ++i) {
            array[i] = publicKeyBase64Decoded.charCodeAt(i);
        }
        return array;
    }
    static decodeBase64(base64String) {
        return window.atob(base64String);
    }
    static publicKeyToBase64(publicKey) {
        const padding = '='.repeat((4 - (publicKey.length % 4)) % 4);
        const result = `${publicKey}${padding}`.replace(/\-/g, '+').replace(/_/g, '/');
        return result;
    }
}
exports.PushManagerHelper = PushManagerHelper;

},{}]},{},[1])(1)
});
