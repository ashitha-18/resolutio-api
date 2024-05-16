import { Schema, model } from 'mongoose';


type CreatedWorkType = {
    [key: string]: any;
};

export interface ICreatedWork extends CreatedWorkType {
    image: string,
    userId: string,
    nameOfWork: string,
    medium: string,
    altMedium?: string
    timeStamp: string,
    license: string,
    cid: string
}

const createdWorkSchema = new Schema<ICreatedWork>({
    userId: { type: String, required: true },
    nameOfWork: { type: String, required: true },
    medium: { type: String, required: true },
    altMedium: { type: String },
    timeStamp: { type: String, required: true },
    licenseType: { type: String, required: true },
    cid: { type: String, required: true },
    fileUploadResponse: {
     type: {
        hash: String,
        name: String,
        size: String
     },
     required: true
    },
    licenseUploadResponse: {
        type: {
            hash: String,
            name: String,
            size: String
        }
    },
}, { timestamps: true });

export const CreatedWork = model<ICreatedWork>("CreatedWork", createdWorkSchema);