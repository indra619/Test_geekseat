<template>
  <v-app-bar app color="blue darken-3" dark>
    <v-app-bar-nav-icon v-show="this.Role"  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Self Assessment Covid-19</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title class="body-2">{{ user.NikKaryawan + " - " + user.NamaKaryawan}}</v-toolbar-title>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,  
      Role: "",
    };

    
  },

  mounted(){
    this.Role = this.user.RoleSACovid
    // console.log(this.Role);
  },

  
  

  computed: {
    ...mapGetters({
      getDrawer: "drawer",
      user: "user",
      hasAllAccess: "hasAllAccess",
    }),
    drawer: {
      get() {
        return this.getDrawer;
      },
      set(value) {
        this.setDrawer(value);
      },
    },
  },

  methods: {
    ...mapActions({
      setDrawer: "setDrawer",
      removeToken: "removeToken",
      removeUser: "removeUser"
    }),

    logout() {
      this.removeToken();
      this.removeUser()

      this.$router.push({ name: "Login" });
      setTimeout(()=>
        window.location.reload(),
        
      )
    },
  },
};
</script>