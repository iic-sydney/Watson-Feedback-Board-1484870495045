Vue.component('counter', {
    data: function() {
        return {
            counter: 0
        }
    },
    template: "<span>{{ counter }}</span>",
    methods: {
        increment: function() {
            this.counter += 1
            this.$emit('increment')
        }
    },
    mounted: function() {
        window.setInterval(() => {
            this.increment()
        }, 1000)
    }
})
