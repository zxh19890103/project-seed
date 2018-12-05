import * as request from 'superagent'

const HOST = 'http://localhost:3000'

const fetch = (url: string) => {
  request
    .get(`${HOST}${url}`)
    .end((error, res) => {
      console.log(res.body)
    })
}

export {
  fetch,
}
