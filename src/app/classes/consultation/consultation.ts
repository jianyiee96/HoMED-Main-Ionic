import { Booking } from '../booking/booking'
import { ConsultationStatusEnum } from '../consultationstatus-enum'

export class Consultation {

    consultationId: number
    booking: Booking
    consultationStatusEnum: ConsultationStatusEnum
    joinQueueDateTime: Date
    medicalOfficer: MedicalOfficer
    startDateTime: Date
    endDateTime: Date
    remarksForServiceman: string

    constructor(
        consultationId?: number,
        booking?: Booking,
        consultationStatusEnum?: ConsultationStatusEnum,
        joinQueueDateTime?: Date,
        medicalOfficer?: MedicalOfficer,
        startDateTime?: Date,
        endDateTime?: Date,
        remarksForServiceman?: string
    ) {

        this.consultationId = consultationId
        this.booking = booking
        this.consultationStatusEnum = consultationStatusEnum
        this.joinQueueDateTime = joinQueueDateTime
        this.medicalOfficer = medicalOfficer
        this.startDateTime = startDateTime
        this.endDateTime = endDateTime
        this.remarksForServiceman = remarksForServiceman

    }

}

export class MedicalOfficer {

    name: string

    constructor(
        name?: string
    ) {

        this.name = name

    }

}
