import axios from "axios";
import { retrieveFiles, storeFiles } from "../integrations/web3storage";
import { CreatedWork, ICreatedWork } from "../models/createdWork.schema";
import { executeUserOp, getPartialUserOp } from "../integrations/biconomy";
import { ethers } from "ethers";
import { getNetworkConfig } from "../utils/network.utils";
import { HttpException } from "../utils/exceptions.utils";
import { BAD_REQUEST, ONE, ZERO } from "../utils/constants.utils";
import { ICreateWorkSchema, ICreatorWorkMetadata } from "../models/interfaces.models";

class FeedPageService {
    getPaginatedWorks = async (page: number, count: number) => {
        const skip = (page - 1) * count;
        const works = await CreatedWork.find().skip(skip).limit(count);
        const totalWorks = await CreatedWork.countDocuments();
        return {
            works,
            totalWorks,
            totalPages: Math.ceil(totalWorks / count),
            currentPage: page
        };
    }

}

export default new FeedPageService();