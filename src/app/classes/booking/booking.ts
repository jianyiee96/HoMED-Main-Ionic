import { BookingStatusEnum } from '../bookingstatus-enum'
import { Consulation } from '../consulation/consulation'
import { ConsultationPurpose } from '../consultation-purpose/consultation-purpose'
import { FormInstance } from '../form-instance/form-instance'
import { Serviceman } from '../serviceman/serviceman'
import { BookingSlot } from '../slot/slot'

export class Booking {

    bookingId: number
    serviceman: Serviceman
    consultationPurpose: ConsultationPurpose
    consulation: Consulation
    bookingSlot: BookingSlot
    formInstances: FormInstance[]
    bookingStatusEnum: BookingStatusEnum

    constructor(
        bookingId?: number,
        serviceman?: Serviceman,
        consulationPurpose?: ConsultationPurpose,
        consultation?: Consulation,
        bookingSlot?: BookingSlot,
        formInstances?: FormInstance[],
        bookingStatusEnum?: BookingStatusEnum
    ) {

        this.bookingId = bookingId
        this.serviceman = serviceman
        this.consultationPurpose = consulationPurpose
        this.consulation = consultation
        this.bookingSlot = bookingSlot
        this.formInstances = formInstances
        this.bookingStatusEnum = bookingStatusEnum

    }

}
