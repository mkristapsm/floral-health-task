"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFunnelStore } from "@/store/useFunnelStore";

import Tabs from "@/components/ui/Tabs/Tabs";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";

import styles from "./StepSection.module.scss";
import Checkbox from "../ui/Checkbox/Checkbox";

export default function StepSection() {
	const {
		height,
		weight,
		targetWeight,
		email,
		unitType,
		subStep,
		setUnitType,
		setUserData,
		nextStep,
	} = useFunnelStore();
	const [isAgreed, setIsAgreed] = useState(false);

	const currentInputData = useMemo(() => {
		switch (subStep) {
			case 1:
				return { value: height, key: "height" };
			case 2:
				return { value: weight, key: "weight" };
			case 3:
				return { value: targetWeight, key: "targetWeight" };
			case 4:
				return { value: email, key: "email" };
			default:
				return { value: "", key: "" };
		}
	}, [subStep, height, weight, targetWeight, email]);

	const getStepData = () => {
		switch (subStep) {
			case 1:
				return {
					title: "What is your height?",
					desc: "This information helps us calculate metabolism.",
					inputPlaceholder: "Height",
					symbol: unitType === "Metric" ? "cm" : "ft",
					showTabs: true,
					showCheckbox: false,
				};
			case 2:
				return {
					title: "What is your weight?",
					desc: "This information helps us calculate metabolism.",
					inputPlaceholder: "Weight",
					symbol: unitType === "Metric" ? "kg" : "lbs",
					showTabs: true,
					showCheckbox: false,
				};
			case 3:
				return {
					title: "What is your dream weight?",
					desc: "This information helps us calculate metabolism.",
					inputPlaceholder: "Weight",
					symbol: unitType === "Metric" ? "kg" : "lbs",
					showTabs: true,
					showCheckbox: false,
				};
			case 4:
				return {
					title: `Your custom plan for target weight: <b>${targetWeight || "82"}${unitType === "Metric" ? "kg" : "lbs"}</b> is ready`,
					desc: "Enter your email below",
					inputPlaceholder: "Email address",
					symbol: "",
					showTabs: false,
					showCheckbox: true,
				};
			default:
				return {
					title: "",
					desc: "",
					inputPlaceholder: "",
					symbol: "",
					showTabs: false,
					showCheckbox: false,
				};
		}
	};

	const data = getStepData();

	const handleContinue = () => {
		nextStep();
	};

	const isButtonDisabled = useMemo(() => {
		// Basic empty check for all steps
		if (currentInputData.value.trim() === "") return true;

		// Special check for Step 4: Must have email AND checkbox checked
		if (subStep === 4 && !isAgreed) return true;

		return false;
	}, [currentInputData.value, subStep, isAgreed]);

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setIsAgreed(event.target.checked);
	};

	return (
		<section className={styles.step_section}>
			<div className={styles.container}>
				<AnimatePresence mode="wait">
					<motion.div
						key={subStep}
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -10 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<h1 dangerouslySetInnerHTML={{ __html: data.title }} />
						<p className={styles.description}>{data.desc}</p>
						{data.showTabs && (
							<div className={styles.tabs_wrapper}>
								<Tabs
									options={["Metric", "Imperial"]}
									activeTab={unitType}
									onChange={setUnitType}
								/>
							</div>
						)}

						<Input
							wrapperClass={styles.input_adjustment}
							symbol={data.symbol}
							labelText={data.inputPlaceholder}
							type={subStep === 4 ? "email" : "number"}
							placeholder={data.inputPlaceholder}
							// 4. Connect value and onChange dynamically
							value={currentInputData.value}
							onChange={(e) =>
								setUserData({
									[currentInputData.key]: e.target.value,
								})
							}
						/>

						{data.showCheckbox && (
							<Checkbox
								customClass={styles.email_terms_checkbox}
								type="square"
								inputId="terms"
								inputName="agree_terms"
								inputTitle={`I agree to the <a href="#" title="terms and conditions">terms and conditions</a>`}
								srOnly={false}
								onChange={handleCheckboxChange}
							/>
						)}
					</motion.div>
				</AnimatePresence>
				<Button
					customClass={styles.submit}
					disabled={isButtonDisabled}
					onClick={handleContinue}
				>
					Continue
				</Button>
			</div>
		</section>
	);
}
