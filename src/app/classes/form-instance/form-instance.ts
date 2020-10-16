import { Booking } from '../booking/booking'
import { FormField, FormTemplate } from '../form-template/form-template'
import { FormInstanceStatusEnum } from '../forminstancestatus-enum'

export class FormInstance {

    formInstanceId: number
    dateCreated: Date
    dateSubmitted: Date
    formInstanceStatusEnum: FormInstanceStatusEnum
    formInstanceFields: FormInstanceField[]
    formTemplateMapping: FormTemplate
    booking: Booking

    constructor(
        formInstanceId?: number,
        dateCreated?: Date,
        dateSubmitted?: Date,
        formInstanceStatusEnum?: FormInstanceStatusEnum,
        formInstanceFields?: FormInstanceField[],
        formTemplateMapping?: FormTemplate,
        booking?: Booking
    ) {
        this.formInstanceId = formInstanceId
        this.dateCreated = dateCreated
        this.dateSubmitted = dateSubmitted
        this.formInstanceStatusEnum = formInstanceStatusEnum
        this.formInstanceFields = formInstanceFields
        this.formTemplateMapping = formTemplateMapping
        this.booking = booking
    }

}

export class FormInstanceField {

    formInstanceFieldId: number
    formFieldMapping: FormField
    formInstanceFieldValues: FormInstanceFieldValue[]

    constructor(
        formInstanceFieldId?: number,
        formFieldMapping?: FormField,
        formInstanceFieldValues?: FormInstanceFieldValue[]
    ) {
        this.formInstanceFieldId = formInstanceFieldId
        this.formFieldMapping = formFieldMapping
        this.formInstanceFieldValues = formInstanceFieldValues
    }

}

export class FormInstanceFieldValue {

    formInstanceFieldValueId: number
    inputValue: string

    isChecked: boolean

    constructor(
        formInstanceFieldValueId?: number,
        inputValue?: string,
        isChecked?: boolean
    ) {
        this.formInstanceFieldValueId = formInstanceFieldValueId
        this.inputValue = inputValue
        this.isChecked = isChecked
    }

}