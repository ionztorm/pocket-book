type AuthSpacerProps = {
	text: string;
};

export function AuthSpacer({ text }: AuthSpacerProps) {
	return (
		<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t'>
			<span className='relative z-10 bg-background px-2 text-muted-foreground'>{text}</span>
		</div>
	);
}
