// RSS Feeds
const newsFeedUrls = [
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fengland%2Frss.xml&api_key=frcdkoauhcfhcizk9nozldx9ntiuzm911wikoifg',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml&api_key=frcdkoauhcfhcizk9nozldx9ntiuzm911wikoifg',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dailymail.co.uk%2Fhome%2Findex.rss&api_key=frcdkoauhcfhcizk9nozldx9ntiuzm911wikoifg'
];

const weatherFeedUrls = [
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fweather-broker-cdn.api.bbci.co.uk%2Fen%2Fforecast%2Frss%2F3day%2F2637433&api_key=frcdkoauhcfhcizk9nozldx9ntiuzm911wikoifg',
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.metoffice.gov.uk%2Fpublic%2Fdata%2FPWSCache%2FWarningsRSS%2FRegion%2FUK&api_key=frcdkoauhcfhcizk9nozldx9ntiuzm911wikoifg'
];

// Updated travel feed URL for unplanned events
const travelFeedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fm.highwaysengland.co.uk%2Ffeeds%2Frss%2FUnplannedEvents.xml&api_key=frcdkoauhcfhcizk9nozldx9ntiuzm911wikoifg';

// Function to fetch news
function fetchNews() {
    const newsSection = document.getElementById('news');
    newsSection.innerHTML = '';

    newsFeedUrls.forEach(feedUrl => {
        fetch(feedUrl)
            .then(response => response.json())
            .then(data => {
                data.items.slice(0, 2).forEach(item => {
                    const article = document.createElement('article');
                    article.innerHTML = `<h2>${item.title}</h2><p>${item.pubDate.split(' ')[0]}</p><p>${item.description}</p>`;
                    newsSection.appendChild(article);
                });
            })
            .catch(error => console.error('Error fetching news:', error));
    });
}

// Function to fetch weather
function fetchWeather() {
    const weatherSection = document.getElementById('weather');
    weatherSection.innerHTML = '';

    weatherFeedUrls.forEach(feedUrl => {
        fetch(feedUrl)
            .then(response => response.json())
            .then(data => {
                data.items.slice(0, 2).forEach(item => {
                    const weatherReport = document.createElement('article');
                    weatherReport.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p>`;
                    weatherSection.appendChild(weatherReport);
                });
            })
            .catch(error => console.error('Error fetching weather:', error));
    });
}

// Function to fetch travel updates
function fetchTravel() {
    const travelSection = document.getElementById('travel');
    travelSection.innerHTML = 'Loading travel updates...';

    fetch(travelFeedUrl)
        .then(response => response.json())
        .then(data => {
            travelSection.innerHTML = ''; // Clear loading message
            data.items.slice(0, 5).forEach(item => { // Display the latest 5 traffic updates
                const travelReport = document.createElement('article');
                travelReport.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p>`;
                travelSection.appendChild(travelReport);
            });
        })
        .catch(error => {
            console.error('Error fetching travel:', error);
            travelSection.innerHTML = `Failed to load travel updates: ${error.message}. Please try again later.`;
        });
}

// Fetch news and travel updates initially
if (document.getElementById('news')) {
    fetchNews();
    // Set interval to fetch news every 45 minutes (2700000 milliseconds)
    setInterval(fetchNews, 2700000);
}

if (document.getElementById('weather')) {
    fetchWeather();
    // Set interval to fetch weather every 24 hours (86400000 milliseconds)
    setInterval(fetchWeather, 86400000);
}

if (document.getElementById('travel')) {
    fetchTravel();
    // Set interval to fetch travel every 10 minutes (600000 milliseconds)
    setInterval(fetchTravel, 600000);
}