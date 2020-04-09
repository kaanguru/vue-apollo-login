<template>
  <Page>
    <ActionBar>
      <Label class="title" text="birds" col="1" />
    </ActionBar>
    <GridLayout rows="*,*" columns="*">
      <ListView for="bird in birds" row="0" col="0" class="m-20">
        <v-template>
          <Label :text="bird.isim" :key="bird.bilezik"  class="font-weight-bold p-b-15 text-center"/>
        </v-template> 
      </ListView>
      <Label
        :text="'JWT in settings: ' + jwt"
        textWrap="true"
        row="1"
        col="0"
      />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import gql from "graphql-tag";
import * as ApplicationSettings from "tns-core-modules/application-settings";

export default {
  data() {
    return {
      jwt: "",
      birds: [],
    };
  },
  mounted() {
    this.jwt = ApplicationSettings.getString("token");
  },
  apollo: {
    birds: {
      query: gql`
        query birds {
          birds {
            isim
            bilezik
          }
        }
      `,
    },
  },
};
</script>

<style scoped></style>
