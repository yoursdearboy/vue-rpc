import jayson from 'jayson/lib/client/browser'

export default (callServer, options) => {
    if (typeof callServer !== 'function') {
        const url = callServer
        callServer = (request, cb) => {
            const options = {
                method: 'POST',
                body: request,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch(url, options)
                .then(res => res.text())
                .then(text => cb(null, text))
                .catch(err => cb(err))
        }
    }

    const client = jayson(callServer, options)

    return (...args) => {
        return new Promise((resolve, reject) => {
            client.request(...args, (err1, err2, res) => {
                if (err1) return reject(err1)
                if (err2) return reject(err2)
                resolve(res)
            })
        })
    }
}
