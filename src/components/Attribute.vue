<template>
    <v-card color="light-grey" class="sheet">
        <div class='attributeHeader'>&nbsp;</div>
        <v-container fluid grid-list-xs>
            <v-layout :id="attribute.name" row wrap>
                <v-flex xs7 class="attributeRow">
                    <div class="attribute">{{attribute.name}}</div>
                </v-flex>
                <v-flex xs4 class="attributeRow">
                    <DiceField label="" v-model="attributeValue" :name="attribute.name" @input="handleInput" height="0.75em"></DiceField>
                </v-flex>
                <v-flex xs1 class="attributeRow">&nbsp;</v-flex>

                <template v-for="skill in attribute.skills">
                    <v-flex xs7 class="skillRow">
                        <div class="skill">{{skill.name}}</div>
                    </v-flex>
                    <v-flex xs4 class="skillRow">
                        <SkillField :attribute="attribute" :skill="skill" :name="attribute.name + '_' + skill.name" height="0.75em"></SkillField>
                    </v-flex>
                    <v-flex xs1 class="skillRow specBtn">
                        <AddSpecialization :attribute="attribute" :skill="skill"></AddSpecialization>
                    </v-flex>

                    <template v-for="specialization in skill.specializations">
                    <!-- TODO: add specializations -->
                        <v-flex xs7 class="specializationRow">
                            <div class="specialization">{{specialization.name}}</div>
                        </v-flex>
                        <v-flex xs4 class="specializationRow">
                            <SpecializationField :attribute="attribute" :skill="skill" :specialization="specialization" :name="attribute.name + '_' + skill.name + '_' + specialization.name" height="0.75em"></SpecializationField>
                        </v-flex>
                        <v-flex xs1 class="specializationRow">&nbsp;</v-flex>
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

    .specialization {
        text-align: start;
        padding-left: 1.5em;
    }


    .attributeRow {
        height: 3em;
        z-index: 2;
        color: white;
    }

    .attributeRow .dice-field, .skillRow .dice-field, .specializationRow .dice-field {
        padding: 0;
    }

    .skillRow, .specializationRow {
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
    import SpecializationField from "./SpecializationField"
    //import {mapState} from 'vuex'
    import {mapFields} from 'vuex-map-fields'

    export default {
        name: 'Attribute',
        components: {
            DiceField,
            SkillField,
            AddSpecialization,
            SpecializationField
        },
        data: () => ({}),
        props: {
            attribute: Object,
        },
        methods: {
            handleInput(event) {
                this.$store.commit('attributeValue', {attribute: this.attribute.name, value: event})
            }
        },
        computed: {
            attributeValue: {
                get() {
                    return this.$store.getters.attribute(this.attribute.name).value
                },
                set(value) {
                    this.$store.commit('attributeValue', {attribute: this.attribute.name, value: value})
                }
            },
            ...mapFields([
                'character',
            ]),
        },
    }
</script>
