import { Router } from "express";
import creatorarmourController from "../controller/creatorarmour.controller";
import { upload } from "../utils/multer.utils";
import { ONE, TWO } from "../utils/constants.utils";

export default Router()
    .post("/", upload.fields([{name:"artWorks", maxCount: ONE}, {name:"userPersonalizedLicense", maxCount: ONE}]), creatorarmourController.createTimeStamp)
    .get("/", creatorarmourController.getCreatedWork);
