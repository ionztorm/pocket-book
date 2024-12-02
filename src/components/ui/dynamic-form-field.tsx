import { Control, FieldValues } from 'react-hook-form';
import { FormErrors } from '@/actions/auth.actions';

export type DynamicFormFieldProps = {
	fields: string[];
	control: Control<FieldValues>;
	isPending: boolean;
	errors?: FormErrors;
};

export function DynamicFormField() {}
