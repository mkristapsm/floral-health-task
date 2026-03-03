"use client";

import { useEffect } from "react";
import { useFunnelStore } from "@/store/useFunnelStore";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import styles from "@/app/Layout.module.scss";

type Screen = "start" | "steps" | "goal" | "email_capture" | "plan";
interface BodyClasses {
    [key: string]: string;
}
export default function BodyManager() {
	const currentScreen = useFunnelStore((state) => state.currentScreen);
	const hasHydrated = useHasHydrated();

	useEffect(() => {
		if (!hasHydrated) return;

		const body = document.body;
		// 1. Remove any previous screen classes
		const screenClasses: Record<Screen, string> = {
            start: styles.home_page,
            steps: styles.steps_page,
            goal: styles.goal_page,
            email_capture: styles.steps_page,
            plan: styles.steps_page,
        };

		Object.values(screenClasses).forEach((cls) => {
            if (cls) body.classList.remove(cls);
        });

        const activeClass = screenClasses[currentScreen];
        if (activeClass) {
            body.classList.add(activeClass);
        }

		// 3. Keep your base layout class if needed
		//body.classList.add(styles.home_page);
	}, [currentScreen, hasHydrated]);

	return null;
}
