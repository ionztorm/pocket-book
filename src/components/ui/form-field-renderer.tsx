import type { Control, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { FormErrors, FormField as FormFieldConfig } from '@/lib/types/auth/auth.types';
import { capitalise } from '@/lib/utils';

type FormFieldRendererProps<TFields extends string> = {
	control: Control<{ [key in TFields]: string }>;
	fieldDetails: FormFieldConfig<TFields>;
	errors?: FormErrors<TFields> | null;
	getInputType: <T extends string>(
		name: Path<{ [key in T]: string }>,
	) => 'text' | 'password' | 'email';
	isPending?: boolean;
};

export const FormFieldRenderer = <TFields extends string>({
	control,
	fieldDetails,
	errors,
	getInputType,
	isPending = false,
}: FormFieldRendererProps<TFields>) => {
	const { name, placeholder } = fieldDetails;

	return (
		<FormField
			key={name}
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{capitalise(name)}</FormLabel>
					<FormControl>
						<Input
							disabled={isPending}
							placeholder={placeholder}
							{...field}
							type={getInputType<TFields>(name)}
						/>
					</FormControl>
					<FormMessage>{errors?.[name]?.join(', ')}</FormMessage>
				</FormItem>
			)}
		/>
	);
};

FormFieldRenderer.displayName = 'FormFieldRenderer';
