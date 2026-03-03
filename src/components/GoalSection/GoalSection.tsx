import { useFunnelStore } from "@/store/useFunnelStore";

import styles from "./GoalSection.module.scss";

import Button from "@/components/ui/Button/Button";

interface GoalSectionProps {
	onPlanSelect: () => void;
}

export default function GoalSection({ onPlanSelect }: GoalSectionProps) {
	const { weightDifference, unitType } = useFunnelStore();

	return (
		<section className={styles.goal_section}>
			<div className={styles.container}>
				<h1>
					<span>✨</span>
					<b>{weightDifference}{unitType === 'Metric' ? 'kg' : 'lbs'}</b> to your goal—let's make it happen.
				</h1>
				<p className={styles.description}>
					Setting a clear target means you're ready. Let's keep
					building your plan.
				</p>
				<Button onClick={onPlanSelect}>Next</Button>
			</div>
		</section>
	);
}
