import { ButtonHTMLAttributes, ReactNode } from 'react';
import style from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'secondary_rounded';
	customClass?: string;
    children: ReactNode;
};

interface ButtonClasses {
	[key: string]: string;
};

export default function Button({ customClass = '', variant = 'primary' , children, ...props}: ButtonProps) {

	const classes: ButtonClasses = {
		primary: style.btn_primary,
		secondary: style.btn_secondary,
		secondary_rounded: style.btn_secondary_rounded,
	};
    const selectedClass = classes[variant] + ' ' + customClass;

	return (
		<button className={selectedClass} {...props}>
			{children}
		</button>
	);
}
