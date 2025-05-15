import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGdate extends Document {
    date: string;
    preference: string;
    guest: mongoose.Schema.Types.ObjectId;
}

const GdateSchema: Schema<IGdate> = new mongoose.Schema({
    date: { type: String, require: true},
    preference: { type: String, require: false},
    guest: { type: Schema.Types.ObjectId, ref: 'User'}
});

export const Gdate: Model<IGdate> = mongoose.model<IGdate>('gdate', GdateSchema);