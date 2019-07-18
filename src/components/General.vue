<template>
    <v-container fluid grid-list-xs text-xs-center>
        <v-layout id="generalSection" row wrap>
            <v-flex xs5>
                <VSelectbox label="Powerlevel" v-model="powerlevel" name="mode" :items="powerlevels" item-text="name" item-value="name"
                            :hint="powerlevel.description" persistent-hint return-object height="1em" dense></VSelectbox>
            </v-flex>
            <v-flex xs4>
                <span>&nbsp;</span>
            </v-flex>
            <v-flex xs3>
                <VSelectbox label="Mode" v-model="mode" name="mode" :items="modes" item-text="text" item-value="value"
                            height="1em" dense></VSelectbox>
            </v-flex>

            <v-flex xs12>
                <span>&nbsp;</span>
            </v-flex>

            <v-flex xs3>
                <VText label="Name" v-model="name" name="name" height="1em"></VText>
            </v-flex>
            <v-flex xs2>
                <VSelectbox label="Archetype" :items="archetypes" v-model="archetype" name="archetype" dense
                            height="1em"></VSelectbox>
            </v-flex>
            <v-flex xs3>
                <VText label="Player" v-model="player" name="player" height="1em"></VText>
            </v-flex>
            <v-flex xs1>
                <VText label="Move" v-model="move" name="move" rules="min_value:0" height="1em"></VText>
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
            <v-flex xs2>
                <VText label="Gender" v-model="gender" name="gender" height="1em"></VText>
            </v-flex>
            <v-flex xs3>
                <VText label="Occupation" v-model="occupation" name="occupation" height="1em"></VText>
            </v-flex>
            <v-flex xs1>
                <VText label="Funds" v-model="funds" name="funds" height="1em" disabled></VText>
            </v-flex>
            <v-flex xs1>
                <span>&nbsp;</span>
            </v-flex>
            <v-flex xs1>
                <VText label="Free CrP" v-model="freecrp" name="freeCrp" rules="min_value:0" height="1em"
                       disabled></VText>
            </v-flex>
            <v-flex xs1>
                <VText label="Total CrP" v-model="crp" name="crp" rules="min_value:0" height="1em"></VText>
            </v-flex>

            <v-flex xs5>
                <VText label="A quote" v-model="quote" name="quote" height="1em"></VText>
            </v-flex>
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
                <VText label="Physical Dmg" v-model="physicaldmg" name="physicalDmg" height="1em" disabled></VText>
            </v-flex>
            <v-flex xs1>
                <VText label="Used CP" v-model="usedcp" name="usedCp" rules="min_value:0" height="1em"
                       :disabled="mode === 'C'"></VText>
            </v-flex>
            <v-flex xs1>
                <VText label="Free CP" v-model="freecp" name="freeCp" rules="min_value:0" height="1em" disabled></VText>
            </v-flex>
            <v-flex xs1>
                <VText label="Total CP" v-model="cp" name="cp" rules="min_value:0" height="1em"
                       :disabled="mode === 'C'"></VText>
            </v-flex>

            <v-flex xs12>
                <v-btn @click="debug">Debug</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style scoped>

</style>

<script>
    import VText from './VText'
    import VSelectbox from './VSelectbox'
    //import {mapState} from 'vuex'
    import {mapFields} from 'vuex-map-fields'
    import {DiceCompare} from '../mixins/DiceUtil.js'

    export default {
        mixins: [DiceCompare],
        name: 'General',
        components: {
            VText,
            VSelectbox
        },
        computed: {
            freecrp: {
                get() {
                    if (!this.inChange && this.$store.state.mode === 'A') {
                        return this.$store.state.character.freecrp
                    }

                    let free = this.$store.state.character.crp
                    let crp = this.$store.state.rules.crp
                    let _self = this
                    _.each(
                        _self.$store.state.character.attributes,
                        function (attribute) {
                            let costs = _self.toPips(attribute.value)
                            if (costs > 0)
                                costs += 2
                            free -= (costs * (crp.attributeCost / 3))

                            _.each(attribute.skills, function (skill) {
                                let costs = _self.pipDiff(attribute.value, skill.value)
                                if (costs > 0)
                                    free -= (costs * (crp.skillCost / 3))

                                _.each(skill.specializations, function (specialization) {
                                    let costs = _self.pipDiff(skill.value, specialization.value)
                                    if (costs > 0)
                                        free -= (costs * (crp.specializationCost / 3))
                                })
                            })
                        }
                    )
                    return free
                },
                set(value) {
                }
            },
            freecp: {
                get() {
                    if (!this.inChange && this.$store.state.mode === 'C') {
                        return this.$store.state.character.freecp
                    }
                    let cp = this.$store.state.character.cp - this.$store.state.character.usedcp
                    return cp
                },
                set(value) {
                    this.$store.state.character.freecp = value
                }
            },
            ...mapFields([
                'character',
                'archetypes',
                'powerlevels',
                'modes',
                'mode',
                'character.powerlevel',
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
                'character.crp',
                'character.quote',
                'character.age',
                'character.height',
                'character.weight',
                'character.physicaldmg',
                'character.funds',
                'character.cp',
                'character.usedcp',
            ]),
        },
        data: () => ({
            inChange: false
        }),
        methods: {
            debug() {
                console.log(this.$store.state.character)
            }
        },
        watch: {
            mode(newVal, oldVal) {
                this.inChange = true
                if (newVal === 'C') {
                    this.$store.commit('storeCp', this.freecp)
                } else if (newVal === 'A') {
                    this.$store.commit('storeCrp', this.freecrp)
                }
                this.inChange = false
            },
            powerlevel(newVal, oldVal) {
                this.$store.state.character.crp = newVal.crp
            }
        }
    }
</script>
