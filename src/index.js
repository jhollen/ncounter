import App from './ncounter/App.svelte';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
    const registration = runtime.register();
}

new App({ target: document.body });