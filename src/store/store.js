import Vue from 'vue'
import Vuex from 'vuex'

import {getField, updateField} from 'vuex-map-fields'
import {default as templates} from "./data/templates"
import {default as templateAttributes} from "./data/attributes"
import {default as rules} from "./data/rules"
import {default as character} from "./data/character"
import {default as options} from "./data/options"
import {default as powers} from "./data/powers"

Vue.use(Vuex)


let helper = {
    templateAttribute(state) {
        return (name) => {
            return state.attributes[name]
        }
    },
    templateSkill(state) {
        return (attr, name) => {
            let templateAttribute = this.templateAttribute(state)(attr)
            if (templateAttribute === undefined)
                throw new Error('Attribute ' + name + ' does not exist')
            return templateAttribute.skills[name]
        }
    },
    attribute(state) {
        return (name) => {
            return state.character.attributes[name]
        }
    },
    skill(state) {
        return (attribute, name) => {
            let attr = this.attribute(state)(attribute)
            if (attr === undefined) {
                throw new Error('Attribute ' + attribute + ' does not exist')
            }
            return attr.skills[name]
        }
    },
    specialization(state) {
        return (attribute, skill, name) => {
            let _skill = this.skill(state)(attribute, skill)
            if (_skill === undefined) {
                throw new Error('Skill ' + skill + ' in attribute ' + attribute + ' does not exist')
            }
            return _skill.specializations[name]
        }
    }
}

export default new Vuex.Store({
    state: {
        sidebar: false,
        modes: [
            {text: 'Character Creation', value: "C"},
            {text: 'Character Advancement', value: "A"}
        ],
        mode: 'C',
        attributes: templateAttributes,
        rules: rules,
        character: character,
        ...options,
        ...powers,
        ...templates,
    },
    getters: {
        getField,
        diceValues(state) {
            return state.dicevalues
        },
        templateAttribute(state) {
            return helper.templateAttribute(state)
        },
        templateSkill(state, getters) {
            return helper.templateSkill(state, getters)
        },
        attribute(state) {
            return helper.attribute(state)
        },
        skill(state, getters) {
            return helper.skill(state, getters)
        },
        specialization(state, getters) {
            return helper.specialization(state, getters)
        },
    },
    actions: {
        getLazyAttribute({commit, state}, name) {
            let attribute = state.character.attributes[name]
            if (attribute === undefined) {
                commit('newAttribute', name)
                attribute = state.character.attributes[name]
            }
            return attribute
        },
        async getLazySkill({dispatch, commit}, obj) {
            let attribute = await dispatch('getLazyAttribute', obj.attribute)
            let skill = attribute.skills[obj.name]
            if (skill === undefined) {
                commit('newSkill', {attribute: obj.attribute, name: obj.name})
                attribute = await dispatch('getLazyAttribute', obj.attribute)
                skill = attribute.skills[obj.name]
            }
            return skill
        },
        async getLazySpecialization({dispatch, commit}, obj) {
            let skill = await dispatch('getLazySkill', {attribute: obj.attribute, name: obj.skill})
            let specialization = skill.specializations[obj.specialization]
            if (specialization === undefined) {
                commit('newSpecialization', {attribute: obj.attribute, skill: obj.skill, name: obj.specialization})
                skill = await dispatch('getLazySkill', {attribute: obj.attribute, name: obj.skill})
                specialization = skill.specializations[obj.specialization]
            }
            return specialization
        },
    },
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
        setAttributeValue(state, obj) {
            let attribute = helper.attribute(state)(obj.attribute)
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.attribute + ' does not exist')
            }
            Vue.set(attribute, "value", obj.value)
        },
        setSkillValue(state, obj) {
            let attribute = helper.attribute(state)(obj.attribute)
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.attribute + ' does not exist')
            }
            let skill = helper.skill(state)(obj.attribute, obj.skill)
            if (skill !== undefined) {
                Vue.set(skill, "value", obj.value)
            }
        },
        setSpecializationValue(state, obj) {
            let attribute = helper.attribute(state)(obj.attribute)
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.attribute + ' does not exist')
            }
            let skill = helper.skill(state)(obj.attribute, obj.skill)
            if (skill === undefined) {
                throw new Error('Skill ' + obj.skill + ' in Attribute ' + obj.attribute + ' does not exist')
            }
            let specialization = helper.specialization(state)(obj.attribute, obj.skill, obj.specialization)
            if (specialization !== undefined) {
                Vue.set(specialization, "value", obj.value)
            }
        },
        newAttribute(state, name) {
            let templateAttr = helper.templateAttribute(state)(name)
            if (templateAttr === undefined)
                throw new Error('Attribute ' + name + ' does not exist')
            if (state.character.attributes[name] !== undefined)
                throw new Error('Attribute ' + name + ' already exist')
            Vue.set(state.character.attributes, templateAttr.name, {
                name: templateAttr.name,
                value: "",
                skills: {}
            })
        },
        newSkill(state, obj) {
            let templateSkill = helper.templateSkill(state)(obj.attribute, obj.name)
            if (templateSkill === undefined)
                throw new Error('Skill ' + obj.name + ' in Attribute ' + obj.attribute + ' does not exist')
            let attribute = helper.attribute(state)(obj.attribute)
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.name + ' does not exist')
            }
            if (attribute.skills[name] !== undefined)
                throw new Error('Skill ' + obj.name + ' in Attribute ' + obj.attribute + ' already exist')
            Vue.set(attribute.skills, templateSkill.name, {
                name: templateSkill.name,
                value: attribute.value,
                specializations: {}
            })
            Vue.set(state.character.attributes, obj.attribute, attribute)
        },
        newSpecialization(state, obj) {
            let attribute = helper.attribute(state)(obj.attribute)
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.attribute + ' does not exist')
            }
            let skill = helper.skill(state)(obj.attribute, obj.skill)
            if (skill === undefined) {
                throw new Error('Skill ' + obj.skill + ' in Attribute ' + obj.attribute + ' does not exist')
            }
            if (skill.specializations[name] !== undefined)
                throw new Error('Specialization ' + obj.name + ' in Skill ' + obj.skill + ' in Attribute ' + obj.attribute + ' already exist')
            Vue.set(skill.specializations, obj.name, {
                name: obj.name,
                value: skill.value
            })
            Vue.set(attribute.skills, obj.skill, skill)
            Vue.set(state.character.attributes, obj.attribute, attribute)
        },
    },
})
