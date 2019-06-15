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

    export default {
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
            getPips: (dicevalue) => {
                let parts = _.split(dicevalue, "D")
                if (parts.length === 1)
                    return _.toNumber(parts[0]) * 3
                else if (parts.length > 1)
                    return _.toNumber(parts[0]) * 3 + _.toNumber(_.trim(parts[1], '+'))
                else
                    return 0
            },
            diceValues() {
                let values = this.$store.getters.diceValues
                let attr = this.$store.getters.attribute(this.attribute)
                if (_.isNull(attr) || _.isUndefined(attr))
                    return values
                let min = this.getPips(attr.value)
                return _.filter(values, el => this.getPips(el) > min)
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
