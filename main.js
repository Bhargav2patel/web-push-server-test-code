const publicVapidKey = 'YOUR_PUBLIC_VAPID_KEY'; // We'll generate this in step 2

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        const reg = await navigator.serviceWorker.register('/sw.js');
        document.getElementById('subscribe').onclick = async () => {
            const subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });

            // Send subscription to Web Push Server
            await fetch('http://localhost:4000/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

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
