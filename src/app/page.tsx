"use client";
import { useState } from "react";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { useFunnelStore } from "@/store/useFunnelStore";

import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/Header/Header";
import StartSection from "@/components/StartSection/StartSection";
import StepSection from "@/components/StepSection/StepSection";
import GoalSection from "@/components/GoalSection/GoalSection";
import PlanSection from "@/components/PlanSection/PlanSection";

type Screen = "start" | "steps" | "goal" | "email_capture" | "plan";

export default function Home() {
	const hasHydrated = useHasHydrated();
	const currentScreen = useFunnelStore((state) => state.currentScreen);
	const setCurrentScreen = useFunnelStore((state) => state.setScreen);
	const setNextStep = useFunnelStore((state) => state.nextStep);

	// If the store hasn't finished reading from localStorage,
	// we return null to prevent hydration mismatch errors.
	if (!hasHydrated) return null;

	const getHeaderType = () => {
		switch (currentScreen) {
			case "start":
				return "default";
			case "steps":
				return "alternative";
			case "goal":
				return "slim";
			case "email_capture":
				return "alternative";
			case "plan":
				return "plain";
			default:
				return "default";
		}
	};

	const handleContinue = (step: Screen) => {
		if (step === 'email_capture') {
			setNextStep();
		}
		setCurrentScreen(step);
	};

	return (
		<>
			<Header type={getHeaderType()} />
			<main>
				<AnimatePresence mode="wait">
					{currentScreen === "start" && (
						<motion.div
							key="start"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, x: -20 }}
						>
							<StartSection
								onNext={() => handleContinue("steps")}
							/>
						</motion.div>
					)}
					{currentScreen === "steps" && (
						<motion.div
							key="steps"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
						>
							<StepSection />
						</motion.div>
					)}
					{currentScreen === "goal" && (
						<motion.div
							key="goal"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
						>
							<GoalSection
								onPlanSelect={() =>
									handleContinue("email_capture")
								}
							/>
						</motion.div>
					)}
					{currentScreen === "email_capture" && (
						<motion.div
							key="email_capture"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
						>
							<StepSection />
						</motion.div>
					)}
					{currentScreen === "plan" && (
						<motion.div
							key="plan"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<PlanSection />
						</motion.div>
					)}
				</AnimatePresence>
			</main>
			{/* <StartSection /> */}
			{/* <StepSection onComplete={() => setCurrentScreen("goal")} /> */}
			{/* <GoalSection /> */}
			{/* <PlanSection /> */}
		</>
	);
}
