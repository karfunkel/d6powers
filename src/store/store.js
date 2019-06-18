import Vue from 'vue'
import Vuex from 'vuex'

import {getField, updateField} from 'vuex-map-fields'

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
        dicevalues: [
            "1D", "1D+1", "1D+2", "2D", "2D+1", "2D+2", "3D", "3D+1", "3D+2", "4D", "4D+1", "4D+2", "5D", "5D+1",
            "5D+2", "6D", "6D+1", "6D+2", "7D", "7D+1", "7D+2", "8D", "8D+1", "8D+2", "9D", "9D+1", "9D+2", "10D", "10D+1",
            "10D+2", "11D", "11D+1", "11D+2", "12D", "12D+1", "12D+2", "13D", "13D+1", "13D+2", "14D", "14D+1", "14D+2",
            "15D", "15D+1", "15D+2", "16D"
        ],
        archetypes: ["", "Adventurer", "Bravo", "Comedian", "Dark Avenger", "Icon", "Outsider", "Protector", "Rogue", "Scientist", "Warrior"],
        genders: ["male", "female"],
        attributes: {
            Reflexes: {
                name: "Reflexes", skills: {
                    climbing: {name: "climbing", specs: {}},
                    brawling: {name: "brawling", specs: {}},
                    dodge: {name: "dodge", specs: {}},
                    flying: {name: "flying", specs: {}},
                    jumping: {name: "jumping", specs: {}},
                    "melee combat": {name: "melee combat", specs: {}},
                    piloting: {name: "piloting", specs: {}},
                    riding: {name: "riding", specs: {}},
                    sneak: {name: "sneak", specs: {}}
                }
            },
            Perception: {
                name: "Perception", skills: {
                    artist: {name: "artist", specs: {}},
                    hide: {name: "hide", specs: {}},
                    gambling: {name: "gambling", specs: {}},
                    "know-how": {name: "know-how", specs: {}},
                    investigation: {name: "investigation", specs: {}},
                    repair: {name: "repair", specs: {}},
                    search: {name: "search", specs: {}},
                    streetwise: {name: "streetwise", specs: {}},
                    survival: {name: "survival", specs: {}},
                    tracking: {name: "tracking", specs: {}},
                }
            },
            Knowledge: {
                name: "Knowledge", skills: {
                    business: {name: "business", specs: {}},
                    demolition: {name: "demolition", specs: {}},
                    forgery: {name: "forgery", specs: {}},
                    gadgetry: {name: "gadgetry", specs: {}},
                    languages: {name: "languages", specs: {}},
                    medicine: {name: "medicine", specs: {}},
                    navigation: {name: "navigation", specs: {}},
                    scholar: {name: "scholar", specs: {}},
                    security: {name: "security", specs: {}},
                    sorcery: {name: "sorcery", specs: {}},
                    tech: {name: "tech", specs: {}},
                }
            },
            Presence: {
                name: "Presence", skills: {
                    "animal handling": {name: "animal handling", specs: {}},
                    con: {name: "con", specs: {}},
                    command: {name: "command", specs: {}},
                    charm: {name: "charm", specs: {}},
                    disguise: {name: "disguise", specs: {}},
                    intimidation: {name: "intimidation", specs: {}},
                    persuasion: {name: "persuasion", specs: {}},
                    willpower: {name: "willpower", specs: {}},
                }
            },
            Coordination: {
                name: "Coordination", skills: {
                    markmanship: {name: "markmanship", specs: {}},
                    lockpicking: {name: "lockpicking", specs: {}},
                    "missile weapons": {name: "missile weapons", specs: {}},
                    "sleight of hand": {name: "sleight of hand", specs: {}},
                    throwing: {name: "throwing", specs: {}},
                }
            },
            Physique: {
                name: "Physique", skills: {
                    lifting: {name: "lifting", specs: {}},
                    running: {name: "running", specs: {}},
                    stamina: {name: "stamina", specs: {}},
                    swimming: {name: "swimming", specs: {}},
                }
            },
        },
        rules: {
            crp: {
                attributeCost: 4,
                skillCost: 1,
                specializationCost: 1 / 3,
            }
        },
        character: {
            name: "",
            archetype: "",
            player: "",
            ka: 0,
            fate: 1,
            body: 0,
            species: "",
            gender: "",
            occupation: "",
            move: 10,
            freecrp: 0,
            crp: 120,
            quote: "",
            age: "",
            height: "",
            weight: "",
            physicaldmg: "1D+0",
            funds: "1D+0",
            freecp: 5,
            usedcp: 0,
            cp: 5,
            attributes: {}
        },
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
                throw new Error('Attribute ' + obj.name + ' does not exist')
            }
            Vue.set(attribute, "value", obj.value)
        },
        setSkillValue(state, obj) {
            let attribute = helper.attribute(state)(obj.attribute)
            if (attribute === undefined) {
                throw new Error('Attribute ' + obj.name + ' does not exist')
            }
            let skill = helper.skill(state)(obj.attribute, obj.skill)
            if (skill !== undefined) {
                Vue.set(skill, "value", obj.value)
            }
        },
        newAttribute(state, name) {
            let templateAttr = helper.templateAttribute(state)(name)
            if (templateAttr === undefined)
                throw new Error('Attribute ' + name + ' does not exist')
            if (state.character.attributes[name] !== undefined)
                throw new Error('Attribute ' + name + ' already does exist')
            state.character.attributes[templateAttr.name] = {
                name: templateAttr.name,
                value: "",
                skills: {}
            }
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
                throw new Error('Skill ' + obj.name + ' in Attribute ' + obj.attribute + ' already does exist')
            attribute.skills[templateSkill.name] = {
                name: templateSkill.name,
                value: attribute.value,
                specs: {}
            }

            state.character.attributes[obj.attribute] = attribute
        },
    },
})
