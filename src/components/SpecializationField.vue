<template>
    <DiceField
            ref="field"
            :value="specializationValue"
            v-bind="$attrs"
            v-on="$listeners"
            class="specialization-field"
            @input="handleInput"
            :list="items"
            dense
    ></DiceField>
</template>

<style scoped>
</style>

<script>
    import DiceField from "./DiceField"
    import {Dice2Pip} from '../mixins/DiceUtil.js'
    import Vue from 'vue'

    export default {
        mixins: [Dice2Pip],
        name: 'SpecializationField',
        components: {
            DiceField,
        },
        props: {
            "attribute": Object,
            "skill": Object,
            "specialization": Object,
        },
        methods: {
            handleInput(event) {
                this.$store.commit('specializationValue', {
                    attribute: this.attribute.name,
                    skill: this.skill.name,
                    specialization: this.specialization.name,
                    value: event
                })
            },
            diceValues(value) {
                let values = this.$store.getters.diceValues
                let min = _.max([this.toPips(value), this.toPips(this.attribute.value), this.toPips(this.skill.value)])
                return _.filter(values, el => this.toPips(el) > min)
            }
        },
        data() {
            return {
                items: this.diceValues(this.skill.value),
            }
        },
        computed: {
            specializationValue: {
                get() {
                    return this.$store.getters.specialization(this.attribute.name, this.skill.name, this.specialization.name).value
                },
                set(value) {
                    this.$store.commit('specializationValue', {attribute: this.attribute.name, skill: this.skill.name, specialization: this.specialization.name, value: value})
                }
            },
        },
        mounted() {
            let _self = this
            this.$store.subscribe((mutation, state) => {
                switch (mutation.type) {
                    case 'attributeValue':
                        if (_self.attribute.name === mutation.payload.attribute) {
                            Vue.set(_self, 'items', _self.diceValues(mutation.payload.value))
                        }
                        break
                    case 'skillValue':
                        if (_self.skill.name === mutation.payload.skill) {
                            Vue.set(_self, 'items', _self.diceValues(mutation.payload.value))
                        }
                        break
                }
            })
        },
    }
</script>
