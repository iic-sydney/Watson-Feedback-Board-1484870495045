new Vue({
    el: '#app',
    data: {
        messages: [],
        newMessage: {}
    },
    computed: {
        sortedMessages: function() {
            return this.messages.sort((a, b) => {
                if (a.sentiment > b.sentiment) return 1
                if (b.sentiment > a.sentiment) return -1 
                return 0
            });
        }
    },
    mounted: function() {
        this.fetchData()
        window.setInterval(() => {
            this.fetchData()   
        }, 10000)
    },
    methods: {
        postComplaint: function() {
            if (this.newMessage.feedback == undefined || this.newMessage.feedback == "") {
                console.error("Error POSTing complaint: You haven't defined one.");
            }

            this.$http.post('http://vuejs-dashboard.syd.iic.ihost.com:1880/api/complaints', this.newMessage).then((response) => {
                this.newMessage = {}
                this.fetchData()
            }, (response) => {
                console.error("Error POSTing complaint: unspecified error")
            })
        },
        fetchData: function() {
            console.log("Fetching Data")
            this.$http.get('http://vuejs-dashboard.syd.iic.ihost.com:1880/api/complaints').then((response) => {
                this.messages = response.body 

                for (var key in this.messages) {
                    var msg = this.messages[key]
                    msg.css = "default"
                    var sentiment = parseInt(msg.sentiment)
                    
                    if (msg.tone == "Joy") {
                        if (sentiment > 5) {
                            msg.css = "success"
                        } else if (sentiment >= 0) {
                            msg.css = "info"
                        } 
                    } else if (msg.tone == "Sadness" || msg.tone == "Disgust" || msg.tone == "Anger") {
                        if (sentiment < -5) {
                            msg.css = "danger"
                        } else {
                            msg.css = "warning"
                        }
                    }
                }
            }, (response) => {
                console.error(response);
            });

            // Adds new messages
            for (var key in this.messages) {
                var msg = this.messages[key]

                if (!this.messageIsPresent(msg)) {
                    this.messages.push(msg)
                }
            }

            this.$emit("fetchData")
        },
        messageIsPresent: function(msg) {
            for (var i in this.messages) {
                var curr = this.messages[i]
                if (curr.feedback == msg.feedback) {
                    return true 
                }
            }
            return false
        }
    }
});
