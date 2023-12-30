import { model, Schema, SchemaTypes } from "mongoose";

const UserSchema = new Schema({
    id: {
        type: SchemaTypes.Number,
        required: true
    },
    name: {
        type: SchemaTypes.String
    },
    age: {
        type: SchemaTypes.Number
    }
}, {
    toObject: {
        transform: (doc, record) => {
            delete record._id;
        }
    }
});

export const UserModel = model("user", UserSchema, "user");