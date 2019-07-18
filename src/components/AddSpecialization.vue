<template>
    <v-btn
            flat
            icon
            color="rgba(0,0,0,0.54)"
            @click="dialog = !dialog"
            v-bind="$attrs"
            v-on="$listeners"
            class="add-specialization"
    >
        <v-icon>add_circle_outline</v-icon>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-text>
                    <v-text-field label="Name" v-model="name"></v-text-field>
                    <small class="grey--text">* This specialization will be added to <strong>{{attribute.name}}/{{skill.name}}</strong>.</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="addSpecialization()">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
    export default {
        name: 'AddSpecialization',
        data() {
            return {
                dialog: false,
                name: ''
            }
        },
        props: {
            "attribute": Object,
            "skill": Object,
        },
        methods: {
            async addSpecialization() {
                this.$store.commit('newSpecialization', {attribute: this.attribute.name, skill: this.skill.name, name: this.name})
                this.dialog = false
            }
        },
    }
</script>

<style>

</style>
