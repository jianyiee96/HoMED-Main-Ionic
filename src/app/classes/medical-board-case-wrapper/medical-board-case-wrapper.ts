import { MedicalBoardCaseStatusEnum } from '../medicalboardcasestatus-enum'
import { PesStatusEnum } from '../pesstatus-enum'
import { MedicalBoardTypeEnum } from '../medicalboardtype-enum'

export class MedicalBoardCaseWrapper {

    chairman: String
    conditionStatuses: ConditionStatusWrapper[]
    medicalBoardCase: MedicalBoardCase
    scheduledEndDate: Date
    scheduledStartDate: Date

    constructor(
        chairman?: string,
        conditionStatuses?: ConditionStatusWrapper[],
        medicalBoardCase?: MedicalBoardCase,
        scheduledEndDate?: Date,
        scheduledStartDate?: Date
    ) {

        this.chairman = chairman
        this.conditionStatuses = conditionStatuses
        this.medicalBoardCase = medicalBoardCase
        this.scheduledEndDate = scheduledEndDate
        this.scheduledStartDate = scheduledStartDate

    }

}

export class ConditionStatusWrapper {

    conditionStartDate: Date
    conditionStatus: ConditionStatus
    medicalBoardCaseId: number

    constructor(conditionStartDate?: Date, conditionStatus?: ConditionStatus, medicalBoardCaseId?: number) {

        this.conditionStartDate = conditionStartDate
        this.conditionStatus = conditionStatus
        this.medicalBoardCaseId = medicalBoardCaseId

    }

}

export class ConditionStatus {

    conditionStatusId: number
    description: string
    isActive: boolean
    statusEndDate: Date

    constructor(conditionStatusId?: number, description?: string, isActive?: boolean, statusEndDate?: Date) {

        this.conditionStatusId = conditionStatusId
        this.description = description
        this.isActive = isActive
        this.statusEndDate = statusEndDate

    }

}

export class MedicalBoardCase {

    finalPesStatus: PesStatusEnum
    isSigned: boolean
    medicalBoardCaseId: number
    medicalBoardCaseStatus: MedicalBoardCaseStatusEnum
    medicalBoardType: MedicalBoardTypeEnum

    constructor(
        finalPesStatus?: PesStatusEnum,
        isSigned?: boolean,
        medicalBoardCaseId?: number,
        medicalBoardCaseStatus?: MedicalBoardCaseStatusEnum,
        medicalBoardType?: MedicalBoardTypeEnum
    ) {

        this.finalPesStatus = finalPesStatus
        this.isSigned = isSigned
        this.medicalBoardCaseId = medicalBoardCaseId
        this.medicalBoardCaseStatus = medicalBoardCaseStatus
        this.medicalBoardType = medicalBoardType

    }

}
