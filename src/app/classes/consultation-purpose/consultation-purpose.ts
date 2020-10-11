export class ConsultationPurpose {

    consultationPurposeId: number
    consultationPurposeName: string

    constructor(
        consultationPurposeId?: number,
        consultationPurposeName?: string
    ) {

        this.consultationPurposeId = consultationPurposeId
        this.consultationPurposeName = consultationPurposeName
        
    }

}
