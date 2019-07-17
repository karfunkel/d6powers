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
            "attribute": String,
            "skill": String,
            "specialization": String,
        },
        methods: {
            handleInput(event) {
                this.$store.commit('setSpecializationValue', {
                    attribute: this.attribute,
                    skill: this.skill,
                    specialization: this.specialization,
                    value: event
                })
            },
            diceValues(value) {
                let values = this.$store.getters.diceValues
                let attribute = this.$store.getters.attribute(this.attribute)
                let skill = this.$store.getters.skill(this.attribute, this.skill)
                let min = _.max([this.toPips(value), this.toPips(attribute.value), this.toPips(skill.value)])
                return _.filter(values, el => this.toPips(el) > min)
            }
        },
        data() {
            return {
                items: this.$store.getters.diceValues,
            }
        },
        computed: {},
        mounted() {
            let _self = this
            this.$store.subscribe((mutation, state) => {
                switch (mutation.type) {
                    case 'setAttributeValue':
                        if (this.attribute === mutation.payload.attribute) {
                            Vue.set(_self, 'items', _self.diceValues(mutation.payload.value))
                        }
                        break
                    case 'setSkillValue':
                        if (this.skill === mutation.payload.skill) {
                            Vue.set(_self, 'items', _self.diceValues(mutation.payload.value))
                        }
                        break
                }
            })
        },
        asyncComputed: {
            async specializationValue() {
                return await this.$store.dispatch('getLazySpecialization', {
                    attribute: this.attribute,
                    skill: this.skill,
                    name: this.specialization
                }).value
            }
        }
    }
</script>
