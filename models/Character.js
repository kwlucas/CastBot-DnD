const { Schema, model } = require('mongoose');
// Schema to create Character model
const characterSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        race: {
            type: String,
        },
        description: {
            type: String,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
        stats: {
            type: Schema.Types.ObjectId,
            ref: 'Statset',
        },

    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Character = model('character', characterSchema);

module.exports = Character;
