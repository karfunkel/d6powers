<template>
    <!--ValidationObserver ref="obs"-->
        <v-container fluid grid-list-xs text-xs-center>
            <v-layout id="generalSection" row wrap>
                <v-flex xs3>
                    <VText label="Name" v-model="name" name="name" height="1em"></VText>
                </v-flex>
                <v-flex xs3>
                    <VSelectbox label="Archetype" :items="archetypes" v-model="archetype" name="archetype" dense height="1em"></VSelectbox>
                </v-flex>
                <v-flex xs3>
                    <VText label="Player" v-model="player" name="player" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="Ka" v-model="ka" rules="min_value:0" name="ka" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="Fate" v-model="fate" name="fate" rules="min_value:0" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="Body" v-model="body" name="body" rules="min_value:0" height="1em"></VText>
                </v-flex>

                <v-flex xs3>
                    <VText label="Species" v-model="species" name="species" height="1em"></VText>
                </v-flex>
                <v-flex xs3>
                    <VText label="Gender" v-model="gender" name="gender" height="1em"></VText>
                </v-flex>
                <v-flex xs3>
                    <VText label="Occupation" v-model="occupation" name="occupation" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="Move" v-model="move" name="move" rules="min_value:0" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="Free CrP" v-model="freecrp" name="freeCrp" rules="min_value:0" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="CrP" v-model="crp" name="crp" rules="min_value:0" height="1em"></VText></v-flex>

                <v-flex xs6>
                    <VText label="A quote" v-model="quote" name="quote" height="1em"></VText></v-flex>
                <v-flex xs1>
                    <VText label="Age" v-model="age" name="age" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="Weight" v-model="weight" name="weight" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="Height" v-model="height" name="height" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <DiceField label="Physical Dmg" v-model="physicaldmg" name="physicalDmg" height="1em"></DiceField>
                </v-flex>
                <v-flex xs1>
                    <VText label="Free CP" v-model="freecp" name="freeCp" rules="min_value:0" height="1em"></VText>
                </v-flex>
                <v-flex xs1>
                    <VText label="CP" v-model="cp" name="cp" rules="min_value:0" height="1em"></VText>
                </v-flex>

                <v-flex xs12>
                    <v-btn @click="debug">Debug</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    <!--/ValidationObserver-->
</template>

<style scoped>

</style>

<script>
    //import {ValidationObserver} from "vee-validate"
    import VText from './VText'
    import VSelectbox from './VSelectbox'
    import DiceField from "./DiceField"
    //import {mapState} from 'vuex'
    import {mapFields} from 'vuex-map-fields'

    export default {
        name: 'General',
        components: {
            //ValidationObserver,
            VText,
            VSelectbox,
            DiceField
        },
        computed: {
            ...mapFields([
                'character',
                'archetypes',
                'character.name',
                'character.archetype',
                'character.player',
                'character.ka',
                'character.fate',
                'character.body',
                'character.species',
                'character.gender',
                'character.occupation',
                'character.move',
                'character.freecrp',
                'character.crp',
                'character.quote',
                'character.age',
                'character.height',
                'character.weight',
                'character.physicaldmg',
                'character.freecp',
                'character.cp',
            ]),
        },
        data: () => ({}),
        methods: {
            debug() {
                console.log(this.$store.state.character)
            }
        }
    }
</script>
