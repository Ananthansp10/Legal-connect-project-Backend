import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";


export class UnverifiedLawyerMapper {

    static async toResponse(data: ILawyerSignup[]): Promise<ILawyerResponse[]> {

        const response = data.map((lawyerData: ILawyerSignup) => {
            return {
                _id: lawyerData._id!,
                name: lawyerData.name,
                email: lawyerData.email,
                specialization: lawyerData.specialization,
                documents: lawyerData.documents,
                barCouncilNumber: lawyerData.barCouncilNumber,
                status: lawyerData.verified,
            }
        })

        return response;
    }
}