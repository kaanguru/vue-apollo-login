import Vue from "nativescript-vue";
import login from "./components/login.vue";

import VueDevtools from "nativescript-vue-devtools";
////////////////////////////////////////////////////////////////////////////////////////////////////

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  uri: 'http://sebapi.com/graphql',

// HEADERS WORK FINE IF TOKEN WAS IN MAIN
//   headers: {
//     authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg2MzU2NzM2LCJleHAiOjE1ODg5NDg3MzZ9.wpyhPTWuqxrDgezDXJqIOaAIaocpM8Ehd3BhQUWKK5Q`,
// }

})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";
// Prints Colored logs when --env.production is *NOT* set while building
// @ts-ignore
Vue.config.debug = TNS_ENV !== "production";

new Vue({
  apolloProvider,
  render: (h) => h("frame", [h(login)]),
}).$start();
