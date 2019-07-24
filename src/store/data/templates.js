export default {
    powerlevels: [
        {
            name: "Vigilantes",
            crp: 80,
            maxDisAdv: 4,
            maxPowers: 5,
            description: "Appropriate for vigilantes with little or no super- human abilities."
        },
        {
            name: "Newbie",
            crp: 100,
            maxDisAdv: 10,
            maxPowers: 5,
            description: "“Newbie” super humans, with decent super abilities."
        },
        {
            name: "Standard",
            crp: 120,
            maxDisAdv: 10,
            maxPowers: 10,
            description: "Average super humans able to combat the many foes present on earth."
        },
        {
            name: "Seasoned",
            crp: 150,
            maxDisAdv: 15,
            maxPowers: 20,
            description: "Seasoned professionals of noted skill and capacity."
        },
        {
            name: "Iconic",
            crp: 200,
            maxDisAdv: 20,
            maxPowers: 30,
            description: "Iconic super beings known by the world and maybe the galaxy."
        },
        {
            name: "Godlike",
            crp: 400,
            maxDisAdv: 20,
            maxPowers: 60,
            description: "Godlike in power and ability."
        },
    ],
    dicevalues: [
        "1D", "1D+1", "1D+2", "2D", "2D+1", "2D+2", "3D", "3D+1", "3D+2", "4D", "4D+1", "4D+2", "5D", "5D+1",
        "5D+2", "6D", "6D+1", "6D+2", "7D", "7D+1", "7D+2", "8D", "8D+1", "8D+2", "9D", "9D+1", "9D+2", "10D", "10D+1",
        "10D+2", "11D", "11D+1", "11D+2", "12D", "12D+1", "12D+2", "13D", "13D+1", "13D+2", "14D", "14D+1", "14D+2",
        "15D", "15D+1", "15D+2", "16D"
    ],
    archetypes: [{
        name: "",
        description: "",
        conceptBonus: ""
    }, {
        name: "Adventurer",
        description: "The Adventurer is an everyday kind of guy who happens to have special abilities and the will to use them. An adventurer’s goals are not lofty or dark; if you are an adventurer, you just know right from wrong and feel a responsibility to use your abilities for the common good. Adventurers are known for flexibility and thoughtfulness. this is one of the most open and heroic of the archetypes, and suitable for a character that’s certain he wants to be heroic, but not sure how to be.",
        conceptBonus: "The character receives any 2D to add to ANY skill or 2 ranks of any Advantage of her choice at no extra charge. This bonus may not exceed the starting skill die code limit. Your character regains 2 Ka when she sets an example by doing what’s right, especially when others might hesitate."
    }, {
        name: "Bravo",
        description: "The bravo has not a care in the world, and lives for the moment. She’s the life of the party, the ayatollah of rock-n-rolla, constantly joking, and taking everything not with a single grain of salt, but a whole bag of salt. She’s a high-octane joy girl (or boy) who always takes the big chances and somehow gains the big rewards, a thrill seeker who lives life to the fullest. But she must also beware the consequences of her actions!",
        conceptBonus: "The character receives either 2 ranks of the Good Looks Advantage or 2D in the charm or dodge skill. The Bravo regains 2 Ka when she overcomes her enemies with reckless abandon!"
    }, {
        name: "Comedian",
        description: "The comedian is the crime fighter who fights not only with a sharp wit, but also with a contagious mirth. Always joking, he’s the bright side of every tragedy. With this archetype, a character could also be the tragic clown, laughing on the outside but crying on the inside, and possibly very unhappy in their personal life.",
        conceptBonus: "The character receives either the Trademark Specialization (R1)& Skill Bonus (R1) or 2D in any Presence skill. The character regains 2 Ka when he defeats a villain with mirth and wit."
    }, {
        name: "Dark Avenger",
        description: "The Dark Avenger is the character that fights the forces of evil with his rules, driven by some need to see justice being done, possibly on any terms. The character is consumed by the desire to wreak retribution on all villains, generally for some slight or tragedy that was committed against them in their past. To the dark avenger’s view, the streets are full of crime and the local law enforcement is either on the take or completely ineffectual. In order to take back the streets, the dark avenger and every right- thinking citizen should get their hands dirty, making the predators the prey. However, they may destroy a lot in the process of your vengeance, and certainly aren’t likely to make more friends — in fact, they may drive some away.",
        conceptBonus: "The character receives either the Hard to Kill Advantage (R2), or 2D in the intimidation or sneak skills. The Dark Avenger regains 2 Ka when she brings the guilty to justice."
    }, {
        name: "Icon",
        description: "The Icon is the essence of the loftier ideals of humanity. People look up to her for what she represents. She’s the person who tries to lead by example, putting her best foot forward in the hopes that it will inspire humanity to do the same. Sometimes the people around her think she’s corny and stuffy, but it’s a small price to pay to achieve her goals!",
        conceptBonus: "The character receives either 2D in the command skill, or the Fame Advantage. The hero regains 2 Ka when she lives up to her ideals and triumph over the forces of evil."
    }, {
        name: "Outsider",
        description: "The Outsider is different from normal society or people... or, so he thinks, anyway. Whether hunted for real, or by some imaginary foes, the world is a much colder place to live than normal society, because the outsider realizes what’s really going on. He’s the ultimate survivor, living by his own cunning and sharp wits. His friends probably consider him a pessimist, if they’re not like- minded.",
        conceptBonus: "The character receives either 2D in the sneak or hide skill or the Contacts (R2) Advantage. She regains 2 Ka when she thwarts her opponents with her cunning."
    }, {
        name: "Protector",
        description: "The Protector is the champion of an idea or place. She might be the defender of the environment on an island, or a small community anywhere, or might be devoted to ideas like “justice,” “purity,” etc. She fights with almost a religious fervor when protecting her charges, and takes her duties very seriously. She feels personal pain if by her own inaction, she allows harm to come to that which she protects.",
        conceptBonus: "The character receives either 2D in the stamina skill or the Hard to Kill (R2) Advantage. She regains 2 Ka when she protects her charge(s)."
    }, {
        name: "Rogue",
        description: "No one has more secrets than the rogue does. The rogue runs the borderline of a criminal, barely heroic character, and may have a shady past that he’s trying to run away from or forget. The straight and narrow path is one littered with temptation, and he must stay strong and not falter... because sometimes the unsavory deeds of the past come back to haunt you. More often than not, he’ll falter on that path, looking for an angle that leads to personal gain. He’s not above using his status as a hero to benefit himself. He has an absolute disdain for authority, and will always want to do things his way. Yet with all these personal drawbacks, he still has a sense of honor, and will stick with a friend to the end.",
        conceptBonus: "The character receives either 2D in the sneak, sleight of hand, security, or hide skills. The character regains 2 Ka when he uses his skills to help atone for past deeds."
    }, {
        name: "Scientist",
        description: "The Scientist seeks knowledge for the sake of knowing. She could be any type of educated figure, from a mathematician to an exotic sorcerer. She is brilliant, and often a little quirky, always looking for the cutting edge — and she won’t stop looking until she’s cut herself on it, too! this is not to say that every scientist is a goofy, wild-haired guy in the basement of the science building — she could also be that ultra-sexy astrophysicist rock star who gets all the guys because she has all the brains. However, most scientists share the common trait that they must know the unknowable — and that can get them into a lot of trouble! ",
        conceptBonus: "The character receives 2D in either the scholar, tech or gadgetry skill, or a Laboratory (R2). The character regains 2 Ka whenever she uses science (or knowledge) to solve a problem, or make a great discovery."
    }, {
        name: "Warrior",
        description: "Your character lives for the fight and little else. He lives the spartan life, always honing his abilities. He may have a social life, but this is probably by pure accident. The warrior is always completely obsessed with the fight — his goal is to be the best, and the only way to be the best is through battle.",
        conceptBonus: "The character receives 2D in either brawl or melee skills or any Physique skill. He regains 2 Ka when he defeats a worthy and equally matched (or better) opponent in single combat."
    }],
    genders: ["male", "female"],
}
