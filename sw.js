self.addEventListener('push', function (event) {
    const data = event.data.json();
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827301.png'
        })
    );
});


// Public Key:
// BC-tc5UZXuVPNBjeGD81fGcKewpYB3-q6SGJW-MzZCslkhEpQ6NEkEyNu7GyiaQMltE7AuzGyiZ1XCsQvhJRfZY

// Private Key:
// UznaxeaHyVPIfak1QimIj_RpqFVZTkLIU7t0PGwnIio
