import { Types } from "mongoose";
import { IChatEntity, Messages } from "../../domain/entity/chatEntity";
import { chatModel } from "../models/chatModel";
import { IChatRepository } from "../repositoryInterface/IChatRepository";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";

export class ChatRepository implements IChatRepository {
  async saveChat(data: IChatEntity): Promise<void> {
    await chatModel.create(data);
  }

  async findChatConnection(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
  ): Promise<IChatEntity | null> {
    return await chatModel.findOne({
      participants: { $all: [userId, lawyerId] },
    });
  }

  async addMessage(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
    message: Messages,
  ): Promise<void> {
    await chatModel.updateOne(
      { participants: { $all: [userId, lawyerId] } },
      { $push: { messages: message } },
    );
  }

  async findUserChat(userId: Types.ObjectId): Promise<IChatEntity[] | null> {
    return await chatModel.find({ participants: { $in: [userId] } });
  }

  async findLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<LawyerProfileEntity | null> {
    return await lawyerProfileModel.findOne({ lawyerId: lawyerId });
  }

  async updateChatReadStatus(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
  ): Promise<void> {
    await chatModel.updateMany(
      { participants: { $all: [userId, lawyerId] } },
      {
        $set: { "messages.$[msg].isRead": true },
      },
      {
        arrayFilters: [{ "msg.receiverId": userId, "msg.isRead": false }],
      },
    );
  }
}
