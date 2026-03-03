import styles from "./Checkbox.module.scss";

interface CheckboxProps {
	customClass?: string;
	type?: string;
	inputId: string;
	inputName: string;
	inputTitle: string;
	inputActive?: boolean;
	srOnly?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
	customClass,
	type,
	inputId,
	inputName,
	inputTitle,
	inputActive = false,
	srOnly = true,
	onChange
}: CheckboxProps) {

	const currentClass = [
		styles.checkbox_wrapper,
		type === "square" ? styles.square : "",
		customClass,
	].filter(Boolean).join(" ");

	return (
		<div className={currentClass}>
			<input type="radio" id={inputId} name={inputName} onChange={onChange} defaultChecked={inputActive} />
			<label htmlFor={inputId}>
				<span className={styles.checkbox}></span>
				{!srOnly ? (
					<span dangerouslySetInnerHTML={{ __html: inputTitle }} />
				) : (
					<span className="sr-only">{inputTitle}</span>
				)}
			</label>
		</div>
	);
}
