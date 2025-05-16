import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPref extends Document {
    spec_request: string;
}

const PrefSchema: Schema<IPref> = new mongoose.Schema({
    spec_request: { type: String, require: true}
});

export const Pref: Model<IPref> = mongoose.model<IPref>('pref', PrefSchema);