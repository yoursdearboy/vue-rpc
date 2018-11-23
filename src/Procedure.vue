<script>
export const Procedure = {
    name: "Procedure",
    props: {
        method: {
            type: String,
            required: true
        }
    },
    template: "<div><slot :procedure='procedure' :loading='loading' :result='result' :error='error'></slot></div>",
    data() {
        const procedure = params => {
            return new Promise((resolve, reject) => {
                this.loading = true
                this.$rpc.request(this.method, params, (err1, err2, res) => {
                    this.loading = false
                    if (err1) {
                        this.error = err1
                        return reject(err1)
                    }
                    if (err2) {
                        this.error = err2
                        return reject(err2)
                    }
                    this.error = null
                    this.result = res
                    resolve(res)
                })
            })
        }
        return {
            procedure,
            loading: null,
            result: null,
            error: null
        }
    }
}

export const ProcedureCall = {
    name: "ProcedureCall",
    props: {
        method: {
            type: String,
            required: true
        },
        params: {
            type: null
        }
    },
    template: "<div><slot :loading='loading' :result='result' :error='error'></slot></div>",
    data() {
        return {
            loading: null,
            result: null,
            error: null
        }
    },
    beforeMount() {
        new Promise((resolve, reject) => {
            this.loading = true
            this.$rpc.request(this.method, this.params, (err1, err2, res) => {
                this.loading = false
                if (err1) {
                    this.error = err1
                    return reject(err1)
                }
                if (err2) {
                    this.error = err2
                    return reject(err2)
                }
                this.error = null
                this.result = res
            })
        })
    }
}

export default {
    Procedure,
    ProcedureCall
}
</script>
