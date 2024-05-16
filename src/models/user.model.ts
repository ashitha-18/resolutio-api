import { Schema, model } from 'mongoose';
import { IUser } from './interfaces.models';
import { SocialMediaType} from '../utils/constants.utils';

export const userSchema = new Schema<IUser>({
    walletAddress: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profileImg: {
        type: String,
        required: true,
    },
    professionalTitle: {
        type: String,
        required: true,
    },
    socialMediaURLs:  
    [{
            nameOfSocialMedia: { type: String, enum: SocialMediaType, required: true  },
            URLvalue: { type: String ,required: true},
        }] 
    
});

export const User = model<IUser>("User", userSchema);