<template>
    <v-app id="d6powers">
        <v-navigation-drawer
                fixed
                v-model="$store.state.sidebar"
                app
        >
            <v-list dense>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Contact</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="grey" fixed app>
            <v-toolbar-side-icon @click="$store.commit('toggleSidebar')"></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title>D6 Powers Tools</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid grid-list-xs text-xs-center> <!-- fill-height -->
                <v-layout id="generalSection" row wrap>
                    <v-flex xs12>
                        <General/>
                    </v-flex>

                    <v-flex v-for="attribute in $store.state.character.attributes" xs4>
                        <Attribute :attribute="attribute"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer color="grey" app>
            <v-spacer></v-spacer>
            <span class="white--text">&copy; Alexander Klein - 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    import General from './components/General'
    import Attribute from './components/Attribute'

    fetch("/levels.json")
        .then(r => r.json())
        .then(json => {
                this.levels = json;
            },
            response => {
                console.log('Error loading json:', response)
            });

    export default {
        name: 'App',
        components: {
            General,
            Attribute
        },
        data: () => ({})
    }
</script>

<style>
    .v-card .dice-field .v-text-field {
        padding-top: 0;
    }
    .v-card .skillRow.specBtn {
        padding: 0 !important;
        transform: scale(0.75)
    }
    .v-card .specBtn button {
        margin: 0;
    }
    .v-tooltip__content span table td {
        vertical-align: top;
    }
    .v-tooltip__content span table td:first-child {
        font-weight: bold;
    }
</style>
