const { Schema, model } = require('mongoose');
// Schema to create user model
const userSchema = new Schema(
    {
        discordId: {
            type: String,
            required: true,
        },
        characters: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Character',
            },
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;
