const { Schema, model } = require('mongoose');
// Schema to create game model
const gameSchema = new Schema(
    {
        serverId: {
            type: String,
            required: true,
        },
        masterChannelId: {
            type: String,
            required: true,
        },
        masters: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
        ],
        players: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
        ],
        party: [
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

const Game = model('game', gameSchema);

module.exports = Game;
