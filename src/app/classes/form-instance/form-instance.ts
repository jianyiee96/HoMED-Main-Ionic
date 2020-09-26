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
    formFieldMapping: FormFieldMapping
    formInstanceFieldValues: []

    constructor(
        formInstanceFieldId?: number,
        formFieldMapping?: FormFieldMapping,
        formInstanceFieldValues?: []
    ) {
        this.formInstanceFieldId = formInstanceFieldId
        this.formFieldMapping = formFieldMapping
        this.formInstanceFieldValues = formInstanceFieldValues
    }

}

export class FormFieldMapping {

    formFieldId: number
    formFieldOptions: FormFieldOption[]
    inputType: string // CHECK_BOX
    isRequired: boolean
    isServicemanEditable: boolean
    position: number
    question: string // What kind of foods do you like?

    constructor(
        formFieldId?: number,
        formFieldOptions?: FormFieldOption[],
        inputType?: string,
        isRequired?: boolean,
        isServicemanEditable?: boolean,
        position?: number,
        question?: string
    ) {
        this.formFieldId = formFieldId
        this.formFieldOptions = formFieldOptions
        this.inputType = inputType
        this.isRequired = isRequired
        this.isServicemanEditable = isServicemanEditable
        this.position = position
        this.question = question
    }

}

export class FormFieldOption {

    formFieldOptionId: number
    formFieldOptionValue: string // noodles

    constructor(
        formFieldOptionId?: number,
        formFieldOptionValue?: string
    ) {
        this.formFieldOptionId = formFieldOptionId
        this.formFieldOptionValue = formFieldOptionValue
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




