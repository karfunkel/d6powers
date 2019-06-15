<template>
    <VCombo :items="diceValues"
            v-bind="$attrs"
            v-on="$listeners"
            class="dice-field"
            dense
    ></VCombo>
</template>

<style scoped>
</style>

<script>
    import VCombo from './VCombo'

    export default {
        name: 'DiceField',
        components: {
            VCombo
        },
        data: () => ({}),
        computed: {
            diceValues() {
                let valueList = this.$store.getters.diceValues
                if (_.isNull(this.list) || _.isUndefined(this.list)) {
                    return valueList
                }
                let arr = this.list
                if (_.isString(arr)) {
                    arr = eval(arr)
                }

                if (_.isFunction(arr)) {
                    arr = arr()
                }

                if (_.isArray(arr)) {
                    if (_.isEmpty(arr))
                        return valueList
                    else
                        return arr
                } else {
                    return valueList
                }
            }
        },
        props: {
            "list": {
                type: [String, Array, Function],
                default: () => []
            }
        }
    }
</script>
