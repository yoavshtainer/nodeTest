
// alert("Hello world!");
// var Vue = require('vue');
// var VueResource = require('vue-resource');

Vue.use(VueResource);

console.log('hello world!');

// Vue.http.options.root = '/root';
// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
// Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content');
// Vue.http.headers.common['Content-Type'] = "text/html";

new Vue({
  el: '#app',
  data: {
    message: 'app app Vue.js!'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: ''
  },
  http: {
    root: '/root',
    headers: {
      // Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    },
    
    emulateJSON: true,
    emulateHTTP: true
},
  methods: {
    submit: function() {
      var that = this;
        this.$http.get('/api/actionName').then(function (response) {
            debugger;
                that.message = response.body.message;
                // this.loading = false;
            }, function (response) {
                this.message = 'there is no data';
                console.log('Error!:', response.data);
                // this.loading = false;
            });
    }
  }
})

// var app2 = new Vue({
//   el: '#app-2',
//   data: {
//     message: 'You loaded this page on ' + new Date()
//   }
// })


// var app3 = new Vue({
//   el: '#app-3',
//   data: {
//     seen: true
//   }
// })

// var app4 = new Vue({
//   el: '#app-4',
//   data: {
//     todos: [
//       { text: 'Learn JavaScript' },
//       { text: 'Learn Vue' },
//       { text: 'Build something awesome' }
//     ]
//   }
// })

// var app6 = new Vue({
//   el: '#app-6',
//   data: {
//     message: 'Hello Vue!'
//   }
// })

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'plaese enter id and name:',
    id: '',
    name: ''
        
  },
  http: {
    root: '/root',
    headers: {
      // Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    },
    emulateJSON: true,
    emulateHTTP: true
},
  methods: {
    submit: function () {
      var myMessage = {
        id: this.id,
        name : this.name
      }
      console.log("data: " + myMessage);

            // GET request
            var that = this;
            this.$http.post('/',{message: myMessage}).then(function (response) {
              debugger;
                console.log('Success!:', response.body);
                // this.loading = false;
            }, function (response) {
                console.log('Error!:', response.data);
                // this.loading = false;
            });

      // this.message = this.message.split('').reverse().join('');
    }
  }
})
