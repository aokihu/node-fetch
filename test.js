const fetch = require('./index.js')

fetch({url:'http://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=DAZTeCYAkuAQwtPvWDcBb9Ih&client_secret=adb28deb5103bde96bd9633dd437ff2d'}).then(console.log)
