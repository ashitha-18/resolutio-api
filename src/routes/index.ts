import { Router, json, urlencoded } from "express";
import conversationRouter from "./conversation.route";
import feedPageRouter from "./feedpage.routes";
import authRoute from "./auth.route";

export const apiRoutes =  Router()
    .use(json())
    .use(urlencoded({ extended: false }))
    .use("/v1.0/auth", authRoute)
    .use("/v1.0/conversation", conversationRouter)
    .use("/v1.0/evidence", feedPageRouter);