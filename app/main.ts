import Vue from "nativescript-vue";
import login from "./components/login.vue";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import VueDevtools from "nativescript-vue-devtools";
import { setContext } from 'apollo-link-context'
////////////////////////////////////////////////////////////////////////////////////////////////////

import {ApolloClient ,InMemoryCache, HttpLink } from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)
const httpLink = new HttpLink({
  uri: `http://sebapi.com/graphql`
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from ApplicationSettings if it exists
  const token = ApplicationSettings.getString("token");

  // return the headers to the context so HTTP link can read them
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : null
      }
  }
})
// update apollo client as below
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
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
