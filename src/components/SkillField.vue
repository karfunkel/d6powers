<template>
    <DiceField
            :value="skillValue"
            v-bind="$attrs"
            v-on="$listeners"
            class="skill-field"
            @input="handleInput"
            :list="diceValues"
            dense
    ></DiceField>
</template>

<style scoped>
</style>

<script>
    import DiceField from "./DiceField"
    import { Dice2Pip } from '../mixins/DiceUtil.js'

    export default {
        mixins: [Dice2Pip],
        name: 'SkillField',
        components: {
            DiceField,
        },
        props: {
            "attribute": String,
            "skill": String,
            "items": Array,
        },
        methods: {
            handleInput(event) {
                this.$store.commit('setSkillValue', {attribute: this.attribute, skill: this.skill, value: event})
            },
            diceValues() {
                let values = this.$store.getters.diceValues
                let attr = this.$store.getters.attribute(this.attribute)
                if (_.isNull(attr) || _.isUndefined(attr))
                    return values
                let min = this.toPips(attr.value)
                return _.filter(values, el => this.toPips(el) > min)
            }
        },
        data: () => ({}),
        computed: {
        },
        asyncComputed: {
            async skillValue() {
                return await this.$store.dispatch('getLazySkill', {attribute: this.attribute, name: this.skill}).value
            }
        }
    }
</script>
