import {default as attributes} from "./attributes"

export default {
    newCharacter() {
        return {
            powerlevel: "",
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
            attributes: attributes.newAttributeSet(),
            advantages: [],
            disadvantages: [],
            powers: [],
        }
    }
}
