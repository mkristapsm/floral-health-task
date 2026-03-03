import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFunnelStore } from "@/store/useFunnelStore";
import { getBodyFatBracket } from "@/utils/getWeightStatus";

import {
	CheckMark,
	ChevronRightIcon,
	GradientLargeChevronRight,
} from "@/components/ui/Icons";
import Button from "@/components/ui/Button/Button";

import styles from "./PlanSection.module.scss";
import Card from "../Card/Card";
import PlanCard from "../PlanCard/PlanCard";
import PricingOption from "../PricingOption/PricingOption";

export default function PlanSection() {
    const router = useRouter();
    const reset = useFunnelStore((state) => state.reset);
	const weight = parseFloat(useFunnelStore((state) => state.weight));
	const targetWeight = parseFloat(
		useFunnelStore((state) => state.targetWeight),
	);
	const height = parseFloat(useFunnelStore((state) => state.height));
	const unitType = useFunnelStore((state) => state.unitType);

	const calculateBodyFat = (weight: number, height: number) => {
		const age = 25;
		let bodyFat = 0;
		if (weight > 0 && height > 0) {
			// 1. Calculate BMI: kg / (m^2)
			const heightInMeters = height / 100;
			const bmi = weight / (heightInMeters * heightInMeters);

			// 2. Calculate Body Fat % (Standard formula)
			bodyFat = 1.2 * bmi + 0.23 * age - 16.2;
		}

		return Number(bodyFat.toFixed(1));
	};

	const currentBmiStatus = getBodyFatBracket(
		calculateBodyFat(weight, height),
	);
	const targetBmiStatus = getBodyFatBracket(
		calculateBodyFat(targetWeight, height),
	);

    const handleCheckoutClick = () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset all your data? This action cannot be undone."
        );

        if (confirmReset) {
            reset();
            // Optional: redirect to home if using Next.js router
            router.push('/');
        }
    };

	return (
		<section className={styles.plan_section}>
			<div className={styles.container}>
				<Card customClass={styles.weight_card}>
					<div className={styles.weight_card_title}>
						<p>Now</p>
						<p>After the plan</p>
					</div>
					<div className={styles.weight_card_image_wrapper}>
						<Image
							src="/images/woman_02.png"
							alt="Picture of body"
							width={264}
							height={152}
						/>
						<GradientLargeChevronRight
							className={styles.first_chevron}
						/>
						<GradientLargeChevronRight />
						<GradientLargeChevronRight
							className={styles.last_chevron}
						/>
						<Image
							src="/images/woman_01.png"
							alt="Picture of body"
							width={264}
							height={152}
						/>
					</div>
					<div className={styles.weight_card_information}>
						<div className={styles.information_group}>
							<p>Body Fat</p>
							<div className={styles.percentage_info}>
								<p>{currentBmiStatus.range}</p>
							</div>
							<p className={styles.percentage_description}>
								{currentBmiStatus.label}
							</p>
						</div>
						<div className={styles.information_group}>
							<p>Body Fat</p>
							<div className={styles.percentage_info}>
								<p>{targetBmiStatus.range}</p>
							</div>
							<p className={styles.percentage_description}>
								{targetBmiStatus.label}
							</p>
						</div>
					</div>
				</Card>

				<Card customClass={styles.weight_tracker_card}>
					<div className={styles.weight_tracker_card_title}>
						<p>Current Weight</p>
						<p>Target Weight</p>
					</div>
					<div
						className={
							styles.weight_tracker_card_weight_tracker_wrapper
						}
					>
						<div
							className={
								styles.weight_tracker_card_weight_tracker
							}
						>
							<p className={styles.weight}>{weight}</p>
							<p className={styles.weight_unit}>
								{unitType === "Metric" ? "kg" : "lbs"}
							</p>
						</div>
						<div
							className={
								styles.weight_tracker_card_weight_tracker
							}
						>
							<p className={styles.weight}>{targetWeight}</p>
							<p className={styles.weight_unit}>
								{unitType === "Metric" ? "kg" : "lbs"}
							</p>
						</div>
					</div>
				</Card>

				<h1>Your custom metabolic reset plan is ready</h1>
				<div className={styles.plan_selection_wrapper}>
					<div className={styles.plan_offer_information}>
						<h4>Here’s a look at what you’ll get.</h4>
						<ul>
							<li>
								<CheckMark />
								Personalized Meal Plans
							</li>
							<li>
								<CheckMark />
								CBT Strategies
							</li>
							<li>
								<CheckMark />
								Habit-Building Guidance
							</li>
							<li>
								<CheckMark />
								Mindset Coaching
							</li>
							<li>
								<CheckMark />
								Long-Term Maintenance Tools
							</li>
							<li>
								<CheckMark />
								Progress Tracking
							</li>
						</ul>
					</div>

					<PlanCard
						customClass={styles.plan_selection_card}
						headerTitle="Limited Time Offer - Expires in: 14:24"
					>
						<p className={styles.plan_content_title}>
							Select your plan
						</p>
						<div className={styles.pricing_options}>
							<PricingOption
								inputName="pricing_plan"
								inputId="pricing_plan_01"
								inputTitle="Checkbox for: 1 month plan"
								planTitle="1 Month Plan"
								billingPeriod="Billed monthly"
								currency="$"
								oldPrice="39.00"
								currentPrice="35.00"
								pricePeriod="per month"
							/>
							<PricingOption
								type="offer"
								inputName="pricing_plan"
								inputId="pricing_plan_02"
								inputTitle="Checkbox for: 1 month plan"
								inputActive={true}
								planTitle="1 Month Plan"
								billingPeriod="Billed monthly"
								currency="$"
								oldPrice="39.00"
								currentPrice="35.00"
								pricePeriod="per month"
								badgeText="Limited Offer - Save 75%"
							/>
							<PricingOption
								inputName="pricing_plan"
								inputId="pricing_plan_03"
								inputTitle="Checkbox for: 1 month plan"
								planTitle="1 Month Plan"
								billingPeriod="Billed monthly"
								currency="$"
								oldPrice="39.00"
								currentPrice="35.00"
								pricePeriod="per month"
							/>
						</div>
					</PlanCard>
				</div>
				<div className={styles.moneyback_disclaimer}>
					<Link href="#" title="Moneyback disclaimer">
						30 Day Money Back Guarantee
					</Link>
				</div>
				<Button
					customClass={styles.btn_plan_select}
					aria-label="Continue to checkout page"
                    onClick={handleCheckoutClick}
				>
					<span>GET MY 6-MONTH PLAN</span>
					<ChevronRightIcon />
				</Button>
				<div className={styles.terms_disclaimer}>
					<p>
						By purchasing this, I agree to Terms of Services and
						Privacy Policy and to pay $66 for 6-months membership
						introductory offer and if I don’t cancel before the end
						of 6-months period, it will convert to regular
						membership with price $149 every 6 months and Flori
						Health will charge my payment method automatically until
						I cancel my membership. I can manage my membership by
						visiting my account under section “Manage your
						subscription”.
					</p>
				</div>
			</div>
		</section>
	);
}
