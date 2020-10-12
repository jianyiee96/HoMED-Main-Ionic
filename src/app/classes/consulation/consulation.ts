import { Booking } from '../booking/booking'

export class Consulation {

    consultationId: number
    booking: Booking

    constructor(
        consulationId?: number,
        booking?: Booking
    ) {

        this.consultationId = consulationId
        this.booking = booking

    }

}
