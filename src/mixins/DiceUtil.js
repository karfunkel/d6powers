export const Dice2Pip = {
    methods: {
        toPips: (dicevalue) => {
            let parts = _.split(dicevalue, "D")
            if (parts.length === 1)
                return _.toNumber(parts[0]) * 3
            else if (parts.length > 1)
                return _.toNumber(parts[0]) * 3 + _.toNumber(_.trim(parts[1], '+'))
            else
                return 0
        },
    }
}

export const Pip2Dice = {
    methods: {
        toDice: (pipvalue) => {
            let pip = pipvalue - 1
            let d = _.floor(pip / 3) + 1
            let p = pip % 3
            if (p > 0)
                return d + "D+" + p
            else
                return d + "D"
        },
    }
}
