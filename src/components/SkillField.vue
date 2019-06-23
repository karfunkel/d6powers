<template>
    <DiceField
            ref="field"
            :value="skillValue"
            v-bind="$attrs"
            v-on="$listeners"
            class="skill-field"
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
        name: 'SkillField',
        components: {
            DiceField,
        },
        props: {
            "attribute": String,
            "skill": String,
        },
        methods: {
            handleInput(event) {
                this.$store.commit('setSkillValue', {attribute: this.attribute, skill: this.skill, value: event})
            },
            diceValues(value) {
                let values = this.$store.getters.diceValues
                let min = this.toPips(value)
                return _.filter(values, el => this.toPips(el) > min)
            }
        },
        data() {
            return {
                items: this.$store.getters.diceValues
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
                }
            })
        },
        asyncComputed: {
            async skillValue() {
                return await this.$store.dispatch('getLazySkill', {attribute: this.attribute, name: this.skill}).value
            }
        }
    }
</script>
