import { FormField, FormTemplate } from '../form-template/form-template'
import { FormInstanceStatusEnum } from '../forminstancestatus-enum'
import { FormTemplateStatusEnum } from '../formtemplatestatus-enum'

export class FormInstance {

    formInstanceId: number
    formInstanceStatusEnum: FormInstanceStatusEnum // DRAFT, PENDING, APPROVED
    formInstanceFields: FormInstanceField[]
    formTemplateMapping: FormTemplate

    constructor(
        formInstanceId?: number,
        formInstanceStatusEnum?: FormInstanceStatusEnum,
        formInstanceFields?: FormInstanceField[],
        formTemplateMapping?: FormTemplate
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