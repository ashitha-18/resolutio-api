
import { object, date, string, ObjectSchema, bool } from 'yup';
import { ICreatorWorkMetadata } from '../models/interfaces.models';

export const sendChatRequestSchema = object().shape({
    userId: string(),
    messageContent: string().required("Users message is required"),
    timeStamp: string().required("timeStamp is required"),
    isLoggedIn: bool().required("User's log in status is required")
});

export const uploadArtWorkSchema: ObjectSchema<ICreatorWorkMetadata> = object({
    userId: string().required("Creator Name is Required"),
    nameOfWork: string().required("Name of Work is Required"),
    dateOfCreation: date().required("Date of Creation is Required"),
    alternativeMedium: string(),
    medium: string<"Film" | "Photo" | "Music" | "AI" | "Art" | "Other">().required("Medium is Required"),
    licenseType: string<"CC BY" | "CC BY-SA" | "CC-BY-NC" | "CC-BY-NC-SA" | "CC-BY-ND" | "CC-BY-NC-ND" | "CC0" | "resolutio License" | "Your own License">().required("Contact File Is Required")
});