<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label class="title" text="login!" col="1" />
      </GridLayout>
    </ActionBar>
    <GridLayout rows="*" columns="*">
      <Button text="Click to Login" @tap="handleLogin" class="m-10" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import {
  request,
  getFile,
  getImage,
  getJSON,
  getString,
} from "tns-core-modules/http";
import routes from "../routes";
import * as ApplicationSettings from "tns-core-modules/application-settings";

export default {
  data() {
    return {
      jwt: "",
      user: {
        identifier: "test",
        password: "123123",
      },
    };
  },

  methods: {
    handleLogin() {
      // first clean old token to start clean
      ApplicationSettings.setString("token", "");
      request({
        url: "http://sebapi.com/auth/local",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          identifier: this.user.identifier,
          password: this.user.password,
        }),
      })
        .then(
          (response) => {
            const result = response.content.toJSON();
            console.log("Result from Server: ", result);
            ApplicationSettings.setString("token", result.jwt);

            ////////////////////////  PLEASE HELP            ////////////////////////
            // HOW TO ADD HEADERS TO APOLLOCLIENT this.$apollo.provider.defaultClient

            // this.$apollo.provider.defaultClient({
            //   request: (operation) => {
            //     operation.setContext({
            //       headers: {
            //         authorization: `Bearer ${result.jwt}` ,
            //       },
            //     });
            //   },
            // });

            //////////////////////// ////////////////////////////////////////////////
          },
          (e) => {
            console.error(e);
            this.$navigateTo(routes.login);
          }
        )
        .then(() => {
          this.$navigateTo(routes.app);
        });
    },
  },
};
</script>

<style scoped></style>
