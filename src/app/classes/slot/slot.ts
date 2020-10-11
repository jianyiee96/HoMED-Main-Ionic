import { Booking } from '../booking/booking'
import { MedicalCentre } from '../medical-centre/medical-centre'

export class Slot {

    slotId: number
    startDateTime: Date
    endDateTime: Date

    constructor(
        slotId?: number,
        startDateTime?: Date,
        endDateTime?: Date,
    ) {

        this.slotId = slotId
        this.startDateTime = startDateTime
        this.endDateTime = endDateTime

    }

}

export class BookingSlot extends Slot {

    booking: Booking
    medicalCentre: MedicalCentre

    constructor(
        booking?: Booking,
        medicalCentre?: MedicalCentre
    ) {

        super()
        this.booking = booking
        this.medicalCentre = medicalCentre

    }

}
