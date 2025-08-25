// Fetch and display trips from Google Sheets using Tabletop.js (JSON API)
// 1. Make sure your sheet is published to the web (File > Share > Publish to web)
// 2. Sheet must be set to 'Anyone with the link can view'
// 3. Use the Sheet's public sharing link

const SHEET_ID = '2PACX-1vSuOMHKOvtVeC2CJEKtHNWRa-CigeEdN5ke8tYCLS2jyT1Y8WBagIv6rDj80UIz-5elylI77vS9IUsT';
const tripsList = document.getElementById('trips-list');

// Load Tabletop.js dynamically
function loadTabletop(callback) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.4/tabletop.min.js';
  script.onload = callback;
  document.head.appendChild(script);
}

function displayTrips(data) {
  tripsList.innerHTML = '';
  data.forEach(row => {
    if (!row.Date || !row.Title) return;
    const li = document.createElement('li');
    li.innerHTML = `<strong>${row.Date}:</strong> ${row.Title}${row.Description ? ' - ' + row.Description : ''}`;
    tripsList.appendChild(li);
  });
}

function initTrips() {
  Tabletop.init({
    key: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/pubhtml`,
    simpleSheet: true,
    callback: function(data, tabletop) {
      if (!data || !data.length) {
        tripsList.innerHTML = '<li>No trips found.</li>';
        return;
      }
      displayTrips(data);
    },
    error: function(err) {
      tripsList.innerHTML = '<li>Unable to load trips at this time.</li>';
      console.error('Error loading trips:', err);
    }
  });
}

if (tripsList) {
  loadTabletop(initTrips);
}
