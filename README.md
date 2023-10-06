Create .env and add

API_KEY from https://ipgeolocation.io/

GOOGLE_API_KEY from https://console.cloud.google.com/apis/dashboard?hl=ru&project=place-398610

format

API_KEY = keykeykeykeykeykeykeykeykeykey

GOOGLE_API_KEY = keykeykeykeykeykeykeykeykeykey


npm install react-native-dotenv --save



babel.config.js


module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
