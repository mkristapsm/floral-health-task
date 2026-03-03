import type { Metadata } from "next";
import BodyManager from "@/components/BodyManager";

import "@/styles/globals.scss";
import styles from "./Layout.module.scss";
import { Lora, Montserrat, Mulish } from "next/font/google";

export const metadata: Metadata = {
	title: "Flori Health",
	description: "Custom Health Funnel",
};

const lora = Lora({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	variable: "--font-g-lora",
	display: "swap",
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-g-montserrat",
	display: "swap",
});

const mulish = Mulish({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-g-mulish",
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en" className={`${lora.variable} ${montserrat.variable} ${mulish.variable}`}>
			<body className={styles.home_page}>
				<BodyManager />
				{children}
			</body>
		</html>
	);
}
