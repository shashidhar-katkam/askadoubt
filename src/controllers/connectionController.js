const Doubt = require('./../models/doubtModel');
const Connection = require('./../models/connectionModel');

const _ = require('lodash');

exports.saveConnection = async (payload) => {
    let r = await Connection.findOne({ user: payload.user });
    if (!r) {
        return await Connection.create(payload);
    } else {
        return await Connection.findByIdAndUpdate(
            r.id,
            payload,
            { new: true }
        );
    }

}

exports.getConnectionByUser = async (filter) => {
    return await Connection.findOne(filter, { connectionId: 1 });
}

exports.updateConnection = async (payload) => {
    let r = await Connection.findOne({ user: payload.user });
    if (!r) {
        return await Connection.create(payload);
    } else {
        return await Connection.findByIdAndUpdate(
            r.id,
            payload,
            { new: true }
        );
    }
}

//const doc = await Connection.findOne(updatedFilter);

exports.deleteConnection = async (payload) => {
    await Connection.findByIdAndDelete(payload.conversationId);
    return true;


}


