const http = require('http')
const https = require('https')
const {URL} = require('url')

function fetch({url, method="GET", headers, postData=null, port}){
    const _url = url.match(/$http/) ? url : 'https://'+url
    const u = new URL(_url)
    const c = u.protocol === 'https:' ? https : http
    const p = !!port ? port : u.protocol === 'https:' ? 443 : 80
    this.opts = {
      method, headers, port:p,
      protocol: u.protocol,
      hostname: u.hostname,
      path: u.pathname+u.search+u.hash,
    }

    return new Promise((ok, fail) => r(this.opts, c, postData,ok, fail))

}

fetch.pipe = () => {
  console.log(fetch.pipe.caller())
}

const r = (opts, c, postData, ok, fail) => {
  const req = c.request(opts, res => {
    const b = [];
    res.on('data', d=>b.push(d.toString()))
    res.on('end', ()=>{ok(b.join(''))})
  })
  req.on('error', fail)
  !!postData && opts.method.match(/(post|put)/i) && req.write(postData)
  req.end()
}

module.exports = fetch
