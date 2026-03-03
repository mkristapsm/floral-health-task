import Checkbox from "../ui/Checkbox/Checkbox";
import styles from "./PricingOption.module.scss";

interface PricingOptionProps {
	type?: string;
	inputName: string;
	inputId: string;
	inputTitle: string;
	inputActive?: boolean;
	planTitle: string;
	billingPeriod: string;
	currency: string;
	oldPrice?: string;
	currentPrice: string;
	pricePeriod: string;
	badgeText?: string;
}

export default function PricingOption({
	type,
	inputName,
	inputId,
	inputTitle,
	inputActive = false,
	planTitle,
	billingPeriod,
	currency,
	oldPrice,
	currentPrice,
	pricePeriod,
	badgeText,
}: PricingOptionProps) {
	const currentClass = type === 'offer'
		? styles.pricing_option + " " + styles.offer
		: styles.pricing_option;
	return (
		<div className={currentClass}>
			{badgeText && <div className={styles.badge}>{badgeText}</div>}
			<Checkbox
				inputId={inputId}
				inputName={inputName}
				inputTitle={inputTitle}
				inputActive={inputActive}
				onChange={() => {}}
			/>
			<div className={styles.pricing_option_title}>
				<p>{planTitle}</p>
				<p>{billingPeriod}</p>
			</div>
			<div className={styles.pricing_option_prices}>
				{oldPrice && (
					<span className={styles.old_price}>
						{currency}
						{oldPrice}
					</span>
				)}
				<span className={styles.current_price}>
					{currency}
					{currentPrice}
				</span>
				<p className={styles.billing_period}>{pricePeriod}</p>
			</div>
		</div>
	);
}
