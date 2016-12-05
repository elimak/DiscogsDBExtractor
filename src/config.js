require('babel-polyfill');

const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true
    }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
    redirect: process.env.REDIRECT || 'http://localhost:3000',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
        title: 'Music Discovery',
        description: 'A website and API to query Discogs resources and build meaningful playlists on Spotify',
        head: {
            titleTemplate: 'Music Discovery: %s',
            meta: [
                {name: 'description', content: 'A website and API to query Discogs resources and build meaningful playlists on Spotify.'},
                {charset: 'utf-8'},
                {property: 'og:site_name', content: 'Music Discovery'},
                // {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
                {property: 'og:locale', content: 'en_US'},
                {property: 'og:title', content: 'Music Discovery'},
                {property: 'og:description', content: 'A website and API to query Discogs resources and build meaningful playlists on Spotify.'},
                {property: 'og:card', content: 'summary'},
                {property: 'og:site', content: '@elimak'},
                {property: 'og:creator', content: '@elimak'}
                // {property: 'og:image:width', content: '200'},
                // {property: 'og:image:height', content: '200'}
            ]
        }
    },
}, environment);
