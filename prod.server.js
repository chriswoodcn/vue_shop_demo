/*eslint-disable*/
const express = require('express')
const axios = require('axios')
const app = express()
const URL = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=zb18k7Sn55uUauHn9xqqFp0mjI5AntYx&output=json&coordtype=wgs84ll&location='

app.get('/getlocation', function(req, res) {
  let location = req.query.location
  axios
    .get(URL + location)
    .then((response) => {
      // console.log(response.data)
      res.send(response.data)
    })
    .catch((e) => {
      console.log(e)
    })
})

app.use(express.static('./dist'))
const port = process.env.PORT || 9002
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
  }
  console.log('服务器启动成功')
})
