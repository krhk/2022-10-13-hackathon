var map = L.map('map').setView([50.4441322,15.7358852], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors' }).addTo(map);
L.marker([50.19840000000004, 15.83370000000008]).addTo(map).bindPopup("Hlavní budova")