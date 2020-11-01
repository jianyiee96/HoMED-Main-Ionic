import { BookingStatusEnum } from '../bookingstatus-enum'
import { ConsultationPurpose } from '../consultation-purpose/consultation-purpose'
import { Consultation } from '../consultation/consultation'
import { FormInstance } from '../form-instance/form-instance'
import { Serviceman } from '../serviceman/serviceman'
import { BookingSlot } from '../slot/slot'

export class Booking {

    bookingId: number
    serviceman: Serviceman
    consultationPurpose: ConsultationPurpose
    consultation: Consultation
    bookingSlot: BookingSlot
    formInstances: FormInstance[]
    bookingStatusEnum: BookingStatusEnum
    bookingComment: string
    cancellationComment: string
    isForReview: boolean

    constructor(
        bookingId?: number,
        serviceman?: Serviceman,
        consultationPurpose?: ConsultationPurpose,
        consultation?: Consultation,
        bookingSlot?: BookingSlot,
        formInstances?: FormInstance[],
        bookingStatusEnum?: BookingStatusEnum,
        bookingComment?: string,
        cancellationComment?: string,
        isForReview?: boolean
    ) {

        this.bookingId = bookingId
        this.serviceman = serviceman
        this.consultationPurpose = consultationPurpose
        this.consultation = consultation
        this.bookingSlot = bookingSlot
        this.formInstances = formInstances
        this.bookingStatusEnum = bookingStatusEnum
        this.bookingComment = bookingComment
        this.cancellationComment = cancellationComment
        this.isForReview = isForReview

    }

}
