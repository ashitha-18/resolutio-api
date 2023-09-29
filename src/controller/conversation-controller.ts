import { User } from "../models/user.model";
import { BAD_REQUEST, ContentType, OK, ONE, Roles, Status, ZERO } from "../utils/constants.utils";
import { Request, Response } from "express";
import { uploadText } from "./lighthouse/upload";
import axios from "axios";
import { CHATBOT_BASEURL } from "../config/env.config";

export class ConversationController {
    async getPreviousConversations(request: Request, response: Response) {
        const { userId } = request.query;

        if (!userId) {
            response.status(BAD_REQUEST).send({ message: "Invalid UserId" })
        }

        //let user = await User.findById(userId);

        // return response.status(OK).send(user);

        response.status(OK).send({
            "userId": userId,
            "conversationIds": [
                {
                    "_id": "conversation1",
                    "messages": [
                        {
                            "id": "message1",
                            "authorRole": Roles.User,
                            "content": {
                                "contentType": ContentType.Text,
                                "parts": ["Hello, how are you?", "I'm good. How can I assist you today?"]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:00:00Z"
                        },
                        {
                            "id": "message3",
                            "authorRole": Roles.User,
                            "content": {
                                "content_type": ContentType.Text,
                                "parts": ["I have a question about my account.", "What would you like to know?"]
                            },
                            "status": Status.Sent,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                        {
                            "id": "message4",
                            "authorRole": Roles.System,
                            "content": {
                                "content_type": ContentType.Text,
                                "parts": ["What are intellectual property rights?", "Intellectual property rights are the rights given to persons over the creations of their minds."]
                            },
                            "status": Status.Received,
                            "timestamp": "2023-09-11T12:10:00Z"
                        },
                    ]
                }
            ]
        });

    }

    async sendUserMessage(request: Request, response: Response) {
        try {
            const { userId, messageContent, conversationId, timeStamp, isLoggedIn } = request.body;

            if(!messageContent || !timeStamp){
                return response.status(BAD_REQUEST).send({ message: !messageContent ? "Invalid 'messageContent' value" : "Invalid 'timeStamp' value"})
            }

            const chatbotResponse = (
                await axios.post(
                    `${CHATBOT_BASEURL}/bot`,
                    {
                        userId: userId ?? "",
                        category: "General IP Queries",
                        message: messageContent,
                        timeStamp
                    }
                )
            ).data;

            const chatbotReply: string = chatbotResponse.result.toString().trim();

            // if (isLoggedIn) {
            //     const messageRecord = {
            //         messageContent,
            //         chatbotReply,
            //         timeStamp,
            //         userId
            //     }

            //     await this.saveMessageToDB(messageRecord);
            // }

            return response.status(OK).send({
                userId: userId,
                conversationIds: [
                    {
                        _id: "conversation2",
                        messages: [
                            {
                                id: "message1",
                                authorRole: Roles.User,
                                content: {
                                    "contentType": ContentType.Text,
                                    "parts": [messageContent, chatbotReply]
                                },
                                status: Status.Sent,
                                timeStamp
                            }
                        ]
                    },
                ]
            });
        } catch (error: any) {
            return response.status(error?.response?.status ?? BAD_REQUEST).send(error?.response?.statusText ?? error.message)
        }
    }

    private async saveMessageToDB(request: {
        messageContent: string,
        chatbotReply: string,
        timeStamp: Date,
        userId: string
    }) {
        try {
            let user = await User.findById(request.userId)

            if (!user) {
                user = await User.create({
                    userId: request.userId,
                    conversations: []
                });
            }

            const uploadResponse = await uploadText(JSON.stringify(request));

            if (!uploadResponse?.data?.cid) {
                //Log                
            } else {
                const userConversation = user.conversations[ZERO];
                const messageId = userConversation.messages.length++ ?? ONE;
                userConversation.messages.push({
                    authorRole: Roles.User,
                    content: {
                        contentType: ContentType.Text,
                        parts: [request.messageContent, request.chatbotReply],
                        cid: uploadResponse?.data?.cid
                    },
                    id: `${messageId}`,
                    status: Status.Received,
                    timeStamp: request.timeStamp
                });

                await user.save();
            }
        } catch(error: any) {
            throw error;
        }
    }
}