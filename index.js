const http = require('http')
const https = require('https')
const {URL} = require('url')

function fetch({url, method="GET", headers, postData=null}){
    let _url = url.match(/^http/) ? url : 'https://'+url
    let u = new URL(_url)
    let c = u.protocol === 'https:' ? https : http
    let opts = {
      method, headers,
      port: u.port,
      protocol: u.protocol,
      hostname: u.hostname,
      path: u.pathname+u.search+u.hash,
    }

    return new Promise((ok, fail) => r(opts, c, postData,ok, fail))
}

fetch.pipe = () => {
  console.log(fetch.pipe.caller())
}

const r = (opts, c, postData, ok, fail) => {
  const req = c.request(opts, res => {
    let b = [];
    res.on('data', d=>b.push(d.toString()))
    res.on('end', ()=>{ok(b.join(''))})
  })
  req.on('error', fail)
  !!postData && opts.method.match(/(post|put)/i) && req.write(postData)
  req.end()
}

module.exports = fetch
