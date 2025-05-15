import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRdate extends Document {
    date: string;
    guestnum: number;
}

const RdateSchema: Schema<IRdate> = new mongoose.Schema({
    date: { type: String, require: true},
    guestnum: { type: Number, require: true, default: 5}
});

export const Rdate: Model<IRdate> = mongoose.model<IRdate>('rdate', RdateSchema);