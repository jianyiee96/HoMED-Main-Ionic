import { FormField } from '../form-template/form-template'
import { FormInstanceStatusEnum } from '../forminstancestatus-enum'
import { FormTemplateStatusEnum } from '../formtemplatestatus-enum'

export class FormInstance {

    formInstanceId: number
    formInstanceStatusEnum: FormInstanceStatusEnum // DRAFT, PENDING, APPROVED
    formInstanceFields: FormInstanceField[]
    formTemplateMapping: FormTemplateMapping

    constructor(
        formInstanceId?: number,
        formInstanceStatusEnum?: FormInstanceStatusEnum,
        formInstanceFields?: FormInstanceField[],
        formTemplateMapping?: FormTemplateMapping
    ) {
        this.formInstanceId = formInstanceId
        this.formInstanceStatusEnum = formInstanceStatusEnum
        this.formInstanceFields = formInstanceFields
        this.formTemplateMapping = formTemplateMapping
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

export class FormTemplateMapping {

    formTemplateId: number
    dateCreated: Date
    datePublished: Date
    formTemplateName: string // induction form
    formTemplateStatus: FormTemplateStatusEnum // draft, deleted, published, archived
    isPublic: boolean
    formFields: FormField[]

    constructor(
        formTemplateId?: number,
        dateCreated?: Date,
        datePublished?: Date,
        formTemplateName?: string,
        formTemplateStatus?: FormTemplateStatusEnum,
        isPublic?: boolean,
        formFields?: FormField[]
    ) {
        this.formTemplateId = formTemplateId
        this.dateCreated = dateCreated
        this.datePublished = datePublished
        this.formTemplateName = formTemplateName
        this.formTemplateStatus = formTemplateStatus
        this.isPublic = isPublic
        this.formFields = formFields
    }

}