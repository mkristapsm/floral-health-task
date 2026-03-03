import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    wrapperClass?: string;
    symbol?: string;
	labelText?: string;
};

export default function Input({ wrapperClass, symbol = '', labelText, ...props}: InputProps) {
    const selectedClass = styles.input_wrapper + ' ' + wrapperClass;

	return (
		<div
			className={selectedClass}
			style={{ "--input-symbol": `"${symbol}"` } as React.CSSProperties}
		>	
			<input {...props} />
			{labelText && <label>{labelText}</label>}
		</div>
	);
}
