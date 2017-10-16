const http = require('http')
const https = require('https')
const URL = require('url')

function fetch({url, method="GET", headers, postData=null}){
    let _url = url.match(/^http/) ? url : 'https://'+url
    let u = URL.parse(_url)
    let opts = Object.assign({}, u, {method, headers});
    let c = u.protocol === 'https:' ? https : http
    return new Promise((ok, fail) => r(opts, c, postData,ok, fail))
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
