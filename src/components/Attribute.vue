<template>
    <v-card color="light-grey" class="sheet">
        <div class='attributeHeader'>&nbsp;</div>
        <v-container fluid grid-list-xs>
            <v-layout :id="name" row wrap>
                <v-flex xs7 class="attributeRow">
                    <div class="attribute">{{$store.getters.templateAttribute(name).name}}</div>
                </v-flex>
                <v-flex xs4 class="attributeRow">
                    <DiceField label="" v-model="attributeValue" :name="name" height="0.75em"></DiceField>
                </v-flex>
                <v-flex xs1 class="attributeRow">&nbsp;</v-flex>

                <template v-for="skill in $store.getters.templateAttribute(name).skills">
                    <v-flex xs7 class="skillRow">
                        <div class="skill">{{skill.name}}</div>
                    </v-flex>
                    <v-flex xs4 class="skillRow">
                        <SkillField :attribute="name" :skill="skill.name" :name="name+'_'+skill.name" height="0.75em"></SkillField>
                    </v-flex>
                    <v-flex xs1 class="skillRow specBtn">
                        <AddSpecialization :attribute="name" :skill="skill.name"></AddSpecialization>
                    </v-flex>

                    <template v-for="specialization in skill.specializations">
                    <!-- TODO: add specializations -->
                        <v-flex xs1 class="specializationRow">&nbsp;</v-flex>
                        <v-flex xs7 class="specializationRow">
                            <div class="specialization">{{specialization.name}}</div>
                        </v-flex>
                        <v-flex xs4 class="specializationRow">
                            <SpecializationField :attribute="name" :skill="skill.name" :specialization="specialization.name" :name="name+'_'+skill.name+'_'+specialization.name" height="0.75em"></SpecializationField>
                        </v-flex>
                    </template>
                </template>
            </v-layout>
        </v-container>
    </v-card>
</template>

<style scoped>
    .sheet {
        height: 100%
    }

    .sheet .container {
        font: inherit;
        padding: 0.75em 1em;
    }

    .attribute {
        font: inherit;
        font-weight: bolder;
        text-align: start;
    }

    .skill {
        text-align: start;
    }

    .attributeRow {
        height: 3em;
        z-index: 2;
        color: white;
    }

    .attributeRow .dice-field, .skillRow .dice-field {
        padding: 0;
    }

    .skillRow {
        height: 2em;
    }

    .attributeHeader {
        position: absolute;
        height: 3em;
        background-color: slategrey;
        width: 100%;
    }

</style>

<script>
    import DiceField from "./DiceField"
    import SkillField from "./SkillField"
    import AddSpecialization from "./AddSpecialization"
    //import {mapState} from 'vuex'
    import {mapFields} from 'vuex-map-fields'

    export default {
        name: 'Attribute',
        components: {
            DiceField,
            SkillField,
            AddSpecialization
        },
        data: () => ({}),
        props: {
            name: String,
        },
        methods: {
            handleSkillInput(ctx, skill) {
                return (event) => {
                    //this.$emit('input', event)
                    ctx.$store.commit('setSkillValue', {attribute: this.name, skill: skill, value: event.value})
                }
            },
        },
        computed: {
            attributeValue: {
                get() {
                    return this.$store.dispatch('getLazyAttribute', this.name).value
                },
                set(value) {
                    this.$store.commit('setAttributeValue', {attribute: this.name, value: value})
                }
            },
            ...mapFields([
                'character'
            ]),
        },
    }
</script>
