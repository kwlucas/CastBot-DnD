const { Schema, model } = require('mongoose');
// Schema to create Student model
const statsetSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            default: 'dnd5e',
        },
        dnd5e: {
            class: {
                type: String,
            },
            level: {
                type: Number,
            },
            status: {
                type: String,
            },
            health: {
                hp: Number,
                mhp: Number
            },
            ac: {
                type: Number
            },
            movement: {
                walking: Number,
                flying: Number,
                climbing: Number,
                swimming: Number,
                primary: {
                    type: String,
                    default: 'walking',
                }
            },
            //['Name', 'Race', 'Class', 'Status', 'HP', 'AC', 'Movement Speed', 'Proficiency Bonus', 'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma', 'mhp'/*14*/, 'str', 'dex', 'con', 'int', 'wis', 'cha', 'profSkills'/*21*/, 'maxMov'];
            abilities: {
                strength: Number,
                dexterity: Number,
                constitution: Number,
                intelligence: Number,
                wisdom: Number,
                charisma: Number,
            },
            skills: {
                acrobatics: {
                    type: String,
                    default: 'none'
                },
                animalHandling: {
                    type: String,
                    default: 'none'
                },
                arcana: {
                    type: String,
                    default: 'none'
                },
                athletics: {
                    type: String,
                    default: 'none'
                },
                deception: {
                    type: String,
                    default: 'none'
                },
                history: {
                    type: String,
                    default: 'none'
                },
                insight: {
                    type: String,
                    default: 'none'
                },
                intimidation: {
                    type: String,
                    default: 'none'
                },
                investigation: {
                    type: String,
                    default: 'none'
                },
                medicine: {
                    type: String,
                    default: 'none'
                },
                nature: {
                    type: String,
                    default: 'none'
                },
                perception: {
                    type: String,
                    default: 'none'
                },
                performance: {
                    type: String,
                    default: 'none'
                },
                persuasion: {
                    type: String,
                    default: 'none'
                },
                religion: {
                    type: String,
                    default: 'none'
                },
                sleightOfHand: {
                    type: String,
                    default: 'none'
                },
                stealth: {
                    type: String,
                    default: 'none'
                },
                survival: {
                    type: String,
                    default: 'none'
                },
            },
            customSkills: { type: Array, "default": [] },
            spellSlots: [Number], //Index of number coresponds to the spell slot level

        },
        traits: [
            {
                feature: String,
                details: String,
                priority: Number
            }
        ],
        inventory: [
            {
                item: String,
                quantity: {
                    type: Number,
                    default: 1
                },
                details: String,
                priority: Number
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Statset = model('statset', statsetSchema);

module.exports = Statset;