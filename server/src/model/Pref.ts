import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPref extends Document {
    spec_request: string;
    description: string;
}

const PrefSchema: Schema<IPref> = new mongoose.Schema({
    spec_request: { type: String, require: true},
    description: { type: String, require: false}
});

export const Pref: Model<IPref> = mongoose.model<IPref>('pref', PrefSchema);