import { Time } from '@angular/common'
import { Address } from '../serviceman/serviceman'

export class MedicalCentre {

    medicalCentreId: number
    name: string
    phone: string
    address: Address
    operatingHours: OperatingHours[]

    constructor(
        medicalCentreId?: number,
        name?: string,
        phone?: string,
        address?: Address,
        operatingHours?: OperatingHours[]
    ) {

        this.medicalCentreId = medicalCentreId
        this.name = name
        this.phone = phone
        this.address = address
        this.operatingHours = operatingHours

    }

}

export class OperatingHours {

    operatingHoursId: number
    isOpen: boolean
    dayOfWeek: string
    openingHours: Time
    closingHours: Time

    constructor(
        operatingHoursId?: number,
        isOpen?: boolean,
        dayOfWeek?: string,
        openingHours?: Time,
        closingHours?: Time
    ) {

        this.operatingHoursId = operatingHoursId
        this.isOpen = isOpen
        this.dayOfWeek = dayOfWeek
        this.openingHours = openingHours
        this.closingHours = closingHours

    }

}
