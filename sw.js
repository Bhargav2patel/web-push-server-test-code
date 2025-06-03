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
        data: {
            url: data.url || '/'  // Embed URL inside `data` object
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    const targetUrl = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            for (const client of clientList) {
                // Check if the client is already open at the target URL or root
                if (client.url.includes(self.origin) && 'focus' in client) {
                    return client.focus();
                }
            }

            // Otherwise open a new window
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});



// Public Key:
// BC-tc5UZXuVPNBjeGD81fGcKewpYB3-q6SGJW-MzZCslkhEpQ6NEkEyNu7GyiaQMltE7AuzGyiZ1XCsQvhJRfZY

// Private Key:
// UznaxeaHyVPIfak1QimIj_RpqFVZTkLIU7t0PGwnIio