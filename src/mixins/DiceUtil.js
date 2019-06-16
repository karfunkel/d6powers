export const DiceSplit = {
    methods: {
        dicePart: (value) => {
            if (!value)
                return 0

            let parts = _.split(_.toUpper(value), "D")
            return _.toNumber(parts[0])
        },
        pipPart: (value) => {
            if (!value)
                return 0

            let parts = _.split(_.toUpper(value), "D+")
            if (parts.length < 2)
                return 0
            else
                return _.toNumber(parts[1])
        },
    }
}

export const Dice2Pip = {
    mixins: [DiceSplit],
    methods: {
        toPips(dicevalue, startWith0D = false) {
            let addon = startWith0D ? 0 : -2
            if(!dicevalue)
                addon = 0
            return this.dicePart(dicevalue) * 3 + this.pipPart(dicevalue) + addon
        },
    }
}

export const Pip2Dice = {
    methods: {
        toDice: (pipvalue, startWith0D = false) => {
            let addon = startWith0D ? 0 : 1
            let pip = pipvalue - addon
            let d = _.floor(pip / 3) + addon
            let p = pip % 3
            if (p > 0)
                return d + "D+" + p
            else
                return d + "D"
        },
    }
}

export const DiceCompare = {
    mixins: [Dice2Pip, Pip2Dice],
    methods: {
        pipDiff(base, value) {
            let b = this.toPips(base)
            let v = this.toPips(value)
            return v - b
        },
        diceDiff(base, value) {
            return this.toDice(this.pipDiff(base, value), false)
        },
    }
}
