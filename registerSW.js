if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/tada/sw.js', { scope: '/tada/' })})}