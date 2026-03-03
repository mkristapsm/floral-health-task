"use client";
import { motion } from "framer-motion";

import styles from "./Tabs.module.scss";

interface TabsProps {
	options: string[];
	activeTab: string;
	onChange: (tab: string) => void;
}

export default function Tabs({ options, activeTab, onChange }: TabsProps) {
	return (
		<div className={styles.tab_group}>
			{options.map((option) => (
				<button
					key={option}
					onClick={() => onChange(option)}
					aria-pressed={activeTab === option}
					className={activeTab === option ? styles.active : ""}
				>
					<span>{option}</span>
					{/* The Animated Background */}
					{activeTab === option && (
						<motion.div
							layoutId="active-pill"
							className={styles.active_bg}
							transition={{
								type: "spring",
								bounce: 0.2,
								duration: 0.6,
							}}
						/>
					)}
				</button>
			))}
		</div>
	);
}
