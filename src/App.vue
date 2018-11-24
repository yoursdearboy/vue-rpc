<script>
import makeRPC from './rpc'
import { Procedure, ProcedureCall } from './Procedure'

const call = (...args) => {
    return args
}

export default {
    install(Vue, options) {
        const callServer = options.callServer
        delete options.callServer

        Vue.component('Procedure', Procedure)
        Vue.component('ProcedureCall', ProcedureCall)
        Vue.prototype.$call = call
        Vue.prototype.$rpc = makeRPC(callServer, options)
    }
}
</script>
