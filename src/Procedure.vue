<script>
export const Procedure = {
    name: "Procedure",
    props: {
        method: {
            type: String,
            required: true
        }
    },
    data() {
        const procedure = async params => {
            this.loading = true
            try {
                this.result = await this.$rpc(this.method, params)
                this.error = null
                this.loading = false
                return this.result
            } catch(err) {
                this.error = err
                this.loading = false
                throw err
            }
        }
        return {
            procedure,
            loading: null,
            result: null,
            error: null
        }
    },
    render(createElement) {
        return createElement('div',[
            this.$scopedSlots.default({
                procedure: this.procedure,
                loading: this.loading,
                result: this.result,
                error: this.error
            })
        ])
    }
}

export const ProcedureCall = {
    name: "ProcedureCall",
    props: {
        def: {
            type: [Array, Object],
            required: true
        }
    },
    data() {
        return {
            loading: null,
            result: null,
            error: null
        }
    },
    async beforeMount() {
        this.loading = true
        try {
            if (Array.isArray(this.def)) {
                const [ method, params ] = this.def
                this.result = await this.$rpc(method, params)
            } else {
                this.result = {}
                const keys = Object.keys(this.def)
                let result = keys.map(async key => {
                    const [ method, params ] = this.def[key]
                    const value = await this.$rpc(method, params)
                    const res = {}
                    res[key]= value
                    return res
                })
                result = await Promise.all(result)
                result = Object.assign({}, ...result)
                this.result = result
            }
            this.error = null
        } catch(err) {
            this.error = err
            throw err
        }
        this.loading = false
    },
    render(createElement) {
        return createElement('div',[
            this.$scopedSlots.default({
                loading: this.loading,
                result: this.result,
                error: this.error
            })
        ])
    }
}

export default {
    Procedure,
    ProcedureCall
}
</script>
