import axios from 'axios';

function renewAccessToken() {
   return axios.request({
      url: `${process.env.CORE_API}/login`,
      method: 'POST',
      data: {
         username: process.env.API_USR,
         password: process.env.API_PASS
      }
   });
}
function addLocale(config, locale) {
   if (config.data) {
      config.data.locale = locale;
   } else {
      config.data = { locale: locale };
   }
   return config;
}

function call(endpoint, types, method, body, params, access_token, language) {
   let config = {
      url: endpoint,
      method: method,
      headers: {}
   };

   if (body && body !== null) {
      config.data = body;
   }

   if (params && params !== null) {
      config.params = params;
   }

   if (language && typeof language === 'string' && language !== '') {
      config.headers['Accept-Language'] = language;
      config = addLocale(config, language);
   }

   config.headers['Authorization'] = `Bearer ${access_token}`;
   return axios.request(config);
}

export default { renewAccessToken, call };
