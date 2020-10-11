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
