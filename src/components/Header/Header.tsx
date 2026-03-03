import { useState } from "react";
import { useFunnelStore } from "@/store/useFunnelStore";

import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.scss";
import Button from "../ui/Button/Button";
import { ChevronLeftIcon } from "../ui/Icons";

interface HeaderProps {
	type: "default" | "alternative" | "slim" | "plain";
}

interface HeaderClasses {
	[key: string]: string;
}

export default function Header({ type = "default" }: HeaderProps) {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
	const stepPercentage = useFunnelStore((state) => state.stepPercentage);
	const setPrevStep = useFunnelStore((state) => state.prevStep);

	const headerClasses: HeaderClasses = {
		default: styles.header,
		alternative: `${styles.header} ${styles.alternative}`,
		slim: `${styles.header} ${styles.slim}`,
		plain: `${styles.header} ${styles.plain}`,
	};

	const selectedClass = headerClasses[type];

	const handleBurgerToggle = () => {
		setIsBurgerMenuOpen((prevState) => !prevState);
	};

	const handleBackClick = () => {
		setPrevStep();
	};

	return (
		<header
			className={selectedClass}
			style={{
				["--header-progress" as any]: `${stepPercentage}%`,
			}}
		>
			<div className={styles.container}>
				<Link href="/" aria-label="Home" className={styles.logo}>
					<Image
						src="/images/logo.svg"
						alt="Flori Health Logo"
						width={92}
						height={28}
						priority
					/>
				</Link>
				{/* 1. Only render the nav if type is NOT "slim" AND NOT "plain" */}
				{!["slim", "plain"].includes(type) && (
					<nav className={styles.main_nav}>
						<ul>
							{type === "default" ? (
								<>
									<li>
										<Link href="#" title="Help?">
											Help?
										</Link>
									</li>
									<li>
										<Link href="#" title="Login">
											Login
										</Link>
									</li>
								</>
							) : (
								/* This handles "funnel" or "step" types */
								<li>
									<Button
										variant="secondary_rounded"
										type="button"
										aria-label="Go back one step"
										onClick={handleBackClick}
									>
										<ChevronLeftIcon />
									</Button>
								</li>
							)}
						</ul>

						{/* 2. Burger only shows on default view */}
						{type === "default" && (
							<button
								className={
									isBurgerMenuOpen
										? styles.btn_burger +
											" " +
											styles.active
										: styles.btn_burger
								}
								aria-label="Toggle Menu"
								onClick={handleBurgerToggle}
							>
								<span></span>
							</button>
						)}
					</nav>
				)}
			</div>
		</header>
	);
}
