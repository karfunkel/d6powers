import Vue from 'vue'
import Vuex from 'vuex'

import {getField, updateField} from 'vuex-map-fields'
import {default as templates} from "./data/templates"
import {default as character} from "./data/character"
import {default as rules} from "./data/rules"
import {default as options} from "./data/options"
import {default as powers} from "./data/powers"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sidebar: false,
        modes: [
            {text: 'Character Creation', value: "C"},
            {text: 'Character Advancement', value: "A"}
        ],
        mode: 'C',
        rules: rules,
        character: character.newCharacter(),
        ...options,
        ...powers,
        ...templates,
    },
    getters: {
        getField,
        diceValues(state) {
            return state.dicevalues
        },
        attribute(state) {
            return (attribute) => {
                return state.character.attributes[attribute]
            }
        },
        skill(state) {
            return (attribute, skill) => {
                let attr = state.character.attributes[attribute]
                if (attr === undefined) {
                    throw new Error('Attribute ' + attribute + ' does not exist')
                }
                return attr.skills[skill]
            }
        },
        specialization(state) {
            return (attribute, skill, specialization) => {
                let attr = state.character.attributes[attribute]
                if (attr === undefined) {
                    throw new Error('Attribute ' + attribute + ' does not exist')
                }
                let _skill = attr.skills[skill]
                if (_skill === undefined) {
                    throw new Error('Skill ' + skill + ' in attribute ' + attribute + ' does not exist')
                }
                return _skill.specializations[specialization]
            }
        },
    },
    actions: {},
    mutations: {
        updateField,
        toggleSidebar(state) {
            state.sidebar = !state.sidebar
        },
        storeCrp(state, value) {
            state.character.freecrp = value
        },
        storeCp(state, value) {
            state.character.freecp = value
        },
        attributeValue(state, obj) {
            let attribute = state.character.attributes[obj.attribute]
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.attribute + ' does not exist')
            }
            Vue.set(attribute, "value", obj.value)
        },
        skillValue(state, obj) {
            let attribute = state.character.attributes[obj.attribute]
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.attribute + ' does not exist')
            }
            let skill = attribute.skills[obj.skill]
            if (skill !== undefined) {
                Vue.set(skill, "value", obj.value)
            }
        },
        specializationValue(state, obj) {
            let attribute = state.character.attributes[obj.attribute]
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.attribute + ' does not exist')
            }
            let skill = attribute.skills[obj.skill]
            if (skill === undefined) {
                throw new Error('Skill ' + obj.skill + ' in Attribute ' + obj.attribute + ' does not exist')
            }
            let specialization = skill.specializations[obj.specialization]
            if (specialization !== undefined) {
                Vue.set(specialization, "value", obj.value)
            }
        },
        newSpecialization(state, obj) {
            let attribute = state.character.attributes[obj.attribute]
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.attribute + ' does not exist')
            }
            let skill = attribute.skills[obj.skill]
            if (skill === undefined) {
                throw new Error('Skill ' + obj.skill + ' in Attribute ' + obj.attribute + ' does not exist')
            }
            let specialization = skill.specializations[obj.name]
            if (specialization !== undefined) {
                throw new Error('Specialization ' + obj.name + ' in Skill ' + obj.skill + ' in Attribute ' + obj.attribute + ' already exist')
            }

            Vue.set(skill.specializations, obj.name, {
                name: obj.name,
                value: skill.value
            })
            Vue.set(attribute.skills, obj.skill, skill)
            Vue.set(state.character.attributes, obj.attribute, attribute)
        },
    },
})
