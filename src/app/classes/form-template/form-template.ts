import { FormTemplateStatusEnum } from '../formtemplatestatus-enum'

export class FormTemplate {

    dateCreated: Date
    datePublished: Date
    formFields: FormField[]
    formTemplateStatus: FormTemplateStatusEnum
    formTemplateId: number
    formTemplateName: string
    isPublic: boolean

    constructor(
        dateCreated?: Date,
        datePublished?: Date,
        formFields?: FormField[],
        formTemplateStatus?: FormTemplateStatusEnum,
        formTemplateId?: number,
        formTemplateName?: string,
        isPublic?: boolean,
    ) {
        this.dateCreated = dateCreated
        this.datePublished = datePublished
        this.formFields = formFields
        this.formTemplateStatus = formTemplateStatus
        this.formTemplateId = formTemplateId
        this.formTemplateName = formTemplateName
        this.isPublic = isPublic
    }

}

export class FormField {

    formFieldId: number;
    formFieldOptions: FormFieldOption[];
    inputType: string;
    isRequired: boolean;
    isServicemanEditable: boolean;
    position: number;
    question: string;

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
    formFieldOptionValue: string

    constructor(
        formFieldOptionId?: number,
        formFieldOptionValue?: string
    ) {
        this.formFieldOptionId = formFieldOptionId
        this.formFieldOptionValue = formFieldOptionValue
    }

}
