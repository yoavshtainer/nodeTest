
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
    }
    // emulateJSON: true,
    // emulateHTTP: true
},
  methods: {
    submit: function() {
        this.$http.get('/api/actionName').then(function (response) {
                console.log('Success!:', response.message);
                this.message = response.message;
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
    message: ''
  },
  http: {
    root: '/root',
    headers: {
      // Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
    // emulateJSON: true,
    // emulateHTTP: true
},
  methods: {
    submit: function () {
      var myMessage = this.message;
      console.log("data: " + this.message);

      var data = this.message;

            // GET request
            this.$http.post('/',data).then(function (response) {
                console.log('Success!:', response.message);
                // this.loading = false;
            }, function (response) {
                console.log('Error!:', response.data);
                // this.loading = false;
            });

      this.message = this.message.split('').reverse().join('');
    }
  }
})
