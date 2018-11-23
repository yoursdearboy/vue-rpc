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

    return jayson(callServer, options)
}
