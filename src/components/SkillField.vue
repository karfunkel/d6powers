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
            "attribute": Object,
            "skill": Object,
        },
        methods: {
            handleInput(event) {
                this.$store.commit('skillValue', {attribute: this.attribute.name, skill: this.skill.name, value: event})
            },
            diceValues(value) {
                let values = this.$store.getters.diceValues
                let min = _.max([this.toPips(value), this.toPips(this.attribute.value)])
                return _.filter(values, el => this.toPips(el) > min)
            }
        },
        data() {
            return {
                items: this.diceValues(this.attribute.value)
            }
        },
        computed: {
            skillValue: {
                get() {
                    return this.$store.getters.skill(this.attribute.name, this.skill.name).value
                },
                set(value) {
                    this.$store.commit('skillValue', {attribute: this.attribute.name, skill:this.skill.name, value: value})
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
                }
            })
        }
    }
</script>
