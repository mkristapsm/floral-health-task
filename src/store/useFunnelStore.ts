import { create } from "zustand";
import { persist } from "zustand/middleware";

type Screen = "start" | "steps" | "goal" | "email_capture" | "plan";

const initialState = {
    stepPercentage: 0,
    currentScreen: "start" as Screen,
    subStep: 1,
    unitType: "Metric",
    height: "",
    weight: "",
    targetWeight: "",
    weightDifference: 0,
    email: "",
};

interface FunnelState {
	stepPercentage: number;
	currentScreen: Screen;
	subStep: number;
	unitType: string;
	height: string;
	weight: string;
	targetWeight: string;
	weightDifference: number;
	email: string;
	// Actions
	setUnitType: (unit: string) => void;
	setScreen: (screen: Screen) => void;
	setUserData: (
		data: Partial<
			Pick<FunnelState, "height" | "weight" | "targetWeight" | "email">
		>,
	) => void;
	nextStep: () => void;
	prevStep: () => void;
	reset: () => void;
}

export const useFunnelStore = create<FunnelState>()(
	persist(
		(set, get) => ({
			...initialState,

			setUnitType: (unit) => set({ unitType: unit }),
			setScreen: (screen) => set({ currentScreen: screen }),

			setUserData: (data) => {
				set((state) => {
					// 1. Create a "preview" of what the state will look like after merging
					const newState = { ...state, ...data };

					// 2. Parse values to numbers to ensure math works (in case they come from input strings)
					const currentW = parseFloat(newState.weight) || 0;
					const targetW = parseFloat(newState.targetWeight) || 0;

					// 3. Calculate the difference
					// If they weigh 100 and want to be 80, difference is 20
					const diff =
						currentW > 0 && targetW > 0
							? Number((currentW - targetW).toFixed(1))
							: 0;

					// 4. Return the fully updated state
					return {
						...newState,
						weightDifference: diff,
					};
				});
			},

			nextStep: () => {
				const { subStep, currentScreen } = get();
				const totalSteps = 4;

				if (currentScreen === "start") {
					// Step 1: 0%
					set({
						currentScreen: "steps",
						subStep: 1,
						stepPercentage: 0,
					});
				} else if (currentScreen === "steps") {
					if (subStep < 3) {
						const next = subStep + 1;
						// Step 2 = 25%, Step 3 = 50%
						set({
							subStep: next,
							stepPercentage: ((next - 1) / totalSteps) * 100,
						});
					} else {
						// Moving to Goal screen (between Step 3 and 4)
						// Still 50% or do you want 60%? Let's keep 50% until Email.
						set({ currentScreen: "goal" });
					}
				} else if (currentScreen === "goal") {
					// Moving to Email (Step 4): 75%
					set({
						currentScreen: "email_capture",
						subStep: 4,
						stepPercentage: 75,
					});
				} else if (currentScreen === "email_capture") {
					// Moving to Plan: 100%
					set({ currentScreen: "plan", stepPercentage: 100 });
				}
			},

			prevStep: () => {
				const { subStep, currentScreen } = get();
				const totalSteps = 4;

				if (currentScreen === "steps") {
					if (subStep > 1) {
						const prev = subStep - 1;
						set({
							subStep: prev,
							stepPercentage: ((prev - 1) / totalSteps) * 100,
						});
					} else {
						set({
							currentScreen: "start",
							subStep: 1,
							stepPercentage: 0,
						});
					}
				} else if (currentScreen === "goal") {
					// Back to Step 3 (Dream Weight): 50%
					set({
						currentScreen: "steps",
						subStep: 3,
						stepPercentage: 50,
					});
				} else if (currentScreen === "email_capture") {
					// Back to Goal: 50%
					set({
						currentScreen: "steps",
						subStep: 3,
						stepPercentage: 50,
					});
				}
			},

			reset: () => {
                set(initialState);
                // localStorage.removeItem("flori-funnel-storage");
            },
		}),
		{
			name: "flori-funnel-storage", // key in localStorage
		},
	),
);
