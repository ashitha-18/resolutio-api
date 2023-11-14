import { ContentType, Roles, Status } from "../utils/constants.utils";

export interface IMessage {
    id: string;
    authorRole: Roles;
    content: {
        contentType: ContentType;
        parts: string[];
        cid: string
    };
    status: Status;
    timeStamp: Date;
}

export interface IConversation {
    _id: string;
    messages: IMessage[];
}
export interface IUser {
    userId: string;
    walletAddress: string;
    conversations: IConversation[];
}

export interface IChatRequest {
    userId?: string,
    messageContent: {
        content_type: ContentType,
        parts: [String]
    },
    conversationId: string,
    timestamp: Date,
    isLoggedIn: boolean,
    authorRole: Roles
}