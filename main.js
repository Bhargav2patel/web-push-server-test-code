const publicVapidKey = 'BC-tc5UZXuVPNBjeGD81fGcKewpYB3-q6SGJW-MzZCslkhEpQ6NEkEyNu7GyiaQMltE7AuzGyiZ1XCsQvhJRfZY'; // Replace this

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        const reg = await navigator.serviceWorker.register('sw.js');

        document.getElementById('subscribe').onclick = async () => {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert('Notification permission is required!');
                return;
            }

            const subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });

            await fetch('https://web-push-server-1.onrender.com/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Subscription successful:', subscription);

            alert('Subscribed to push notifications!');
        };
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    return new Uint8Array([...raw].map((char) => char.charCodeAt(0)));
}
