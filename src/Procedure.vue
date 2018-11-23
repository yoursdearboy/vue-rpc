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
        const procedure = async params => {
            this.loading = true
            try {
                this.result = await this.$rpc(this.method, params)
                this.error = null
                this.loading = false
                return this.result
            } catch(err) {
                this.error = null
                this.loading = false
            }
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
    async beforeMount() {
        this.loading = false
        try {
            this.result = await this.$rpc(this.method, this.params)
            this.error = null
        } catch(err) {
            this.error = err
        }
        this.loading = false
    }
}

export default {
    Procedure,
    ProcedureCall
}
</script>
