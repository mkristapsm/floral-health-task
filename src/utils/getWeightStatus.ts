export const getBodyFatBracket = (bfp: number) => {
	if (bfp >= 31)
		return { label: "Over-fat weight", color: "#FF4D4D", range: "31-37%" };
	if (bfp >= 24)
		return { label: "Average weight", color: "#FFB347", range: "24-30%" };
	if (bfp >= 20)
		return { label: "Healthy weight", color: "#77DD77", range: "20-23%" };
	if (bfp >= 14)
		return { label: "Fitness weight", color: "#85CFEC", range: "14-19%" };
	return { label: "Athlete weight", color: "#B19CD9", range: "6-13%" };
};
