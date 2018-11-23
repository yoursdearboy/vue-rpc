<script>
import makeRPC from './rpc'
import { Procedure, ProcedureCall } from './Procedure'

export default {
    install(Vue, options) {
        const callServer = options.callServer
        delete options.callServer

        Vue.component('Procedure', Procedure)
        Vue.component('ProcedureCall', ProcedureCall)
        Vue.prototype.$rpc = makeRPC(callServer, options)
    }
}
</script>
