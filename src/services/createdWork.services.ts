import axios from "axios";
import { retrieveFiles, storeFiles } from "../integrations/web3storage";
import { CreatedWork, ICreatedWork } from "../models/createdWork.schema";
import { executeUserOp, getPartialUserOp } from "../integrations/biconomy";
import { ethers } from "ethers";
import { getNetworkConfig } from "../utils/network.utils";
import { HttpException } from "../utils/exceptions.utils";
import { BAD_REQUEST, ONE, ZERO } from "../utils/constants.utils";
import { ICreateWorkSchema, ICreatorWorkMetadata } from "../models/interfaces.models";

class CreatedWorkService {

    getWorkByCID = async (cid: string) =>
        await CreatedWork.findOne({ cid });

    createTimestamp = async (createWorkRequest: ICreateWorkSchema) => {
        //Todo: Retrieve creator from the backend
        
        if (await this.getWorkByCID(createWorkRequest.finalCID.toLowerCase())) {
            throw new HttpException(BAD_REQUEST, "A work with matching CID exists");
        }

        const work = await CreatedWork.create({
            cid: createWorkRequest.finalCID.toLowerCase(),
            nameOfWork: createWorkRequest.metadata.nameOfWork,
            licenseType: createWorkRequest.metadata.licenseType,
            altMedium: createWorkRequest.metadata.alternativeMedium,
            medium: createWorkRequest.metadata.medium,
            timeStamp: createWorkRequest.metadata.dateOfCreation ?? Date.now,
            userId: createWorkRequest.metadata.userId,
            fileUploadResponse: createWorkRequest.fileUploadResponse.data.fileUploadResponse,
            licenseUploadResponse: createWorkRequest.fileUploadResponse.data.licenseUploadResponse
        });

        return work;
    }

    getAllWorks = async () =>
        await CreatedWork.find();
} 

export default new CreatedWorkService();