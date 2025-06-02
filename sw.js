self.addEventListener('push', function (event) {
    if (!event.data) {
        console.error('Push event but no data');
        return;
    }

    let data = {};
    try {
        data = event.data.json();
    } catch (err) {
        console.error('Error parsing push event data:', err);
    }

    const title = data.title || 'Notification';
    const options = {
        body: data.body || 'You have a new message',
        icon: data.icon || 'https://cdn-icons-png.flaticon.com/512/1827/1827301.png',
        badge: data.badge || 'https://cdn-icons-png.flaticon.com/512/1827/1827301.png',
        data: data.url || '/'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Optional: Handle notification click (navigate to a URL)
self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    const urlToOpen = event.notification.data || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});


// Public Key:
// BC-tc5UZXuVPNBjeGD81fGcKewpYB3-q6SGJW-MzZCslkhEpQ6NEkEyNu7GyiaQMltE7AuzGyiZ1XCsQvhJRfZY

// Private Key:
// UznaxeaHyVPIfak1QimIj_RpqFVZTkLIU7t0PGwnIio
