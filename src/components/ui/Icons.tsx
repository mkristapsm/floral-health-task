interface IconProps {
	className?: string;
	size?: number | string;
}

export const ChevronLeftIcon = ({ className, size }: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size || 9}
		height={size || 16}
		fill="none"
		viewBox="0 0 9 16"
		className={className}
		aria-hidden="true"
	>
		<path
			fill="currentColor"
			fillRule="evenodd"
			clipRule="evenodd"
			d="m2.465 7.868 6.424-6.424L7.445 0 .299 7.146a1.02 1.02 0 0 0 0 1.444l7.146 7.145 1.444-1.443z"
		/>
	</svg>
);

export const ChevronRightIcon = ({ className, size }: IconProps) => (
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		width={size || 9}
		height={size || 16}
		fill="none"
		viewBox="0 0 9 16"
		className={className}
		aria-hidden="true"
	>
		<path 
			fill="currentColor" 
			fillRule="evenodd" 
			d="M6.424 7.868 0 14.292l1.444 1.443L8.59 8.59a1.02 1.02 0 0 0 0-1.444L1.444 0 0 1.444z" 
			clipRule="evenodd"
		/>
	</svg>
);

export const GradientLargeChevronRight = ({ className, size }: IconProps) => (
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		width={size || 50}
		height={size || 99}
		fill="none" 
		viewBox="0 0 50 99"
		className={className}
		aria-hidden="true"
	>
		<path 
			fill="url(#a)" 
			d="M49.285 49.196 18.925 0H0l30.36 49.196L0 98.39h18.925z" 
		/>
		<defs>
			<linearGradient 
				id="a" 
				x1="24.642" 
				x2="24.642" 
				y1="0" 
				y2="98.391" 
				gradientUnits="userSpaceOnUse"
			>
				<stop 
					offset=".351" 
					stopColor="#fff" 
				/>
				<stop 
					offset="1" 
					stopColor="#d38d14" 
				/>
			</linearGradient>
		</defs>
	</svg>
);

export const CheckMark = ({ className, size }: IconProps) => (
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		width={size || 18}
		height={size || 16}
		fill="none" 
		viewBox="0 0 18 16"
		className={className}
		aria-hidden="true"
	>
		<path 
			fill="currentColor" 
			fillRule="evenodd" 
			d="M2.61 1.613c-.961 0-1.74.779-1.74 1.74v9.57c0 .96.779 1.74 1.74 1.74h9.57c.96 0 1.74-.78 1.74-1.74V6.398h.87v6.525a2.61 2.61 0 0 1-2.61 2.61H2.61A2.61 2.61 0 0 1 0 12.923v-9.57A2.61 2.61 0 0 1 2.61.743h8.7v.87z" 
			clipRule="evenodd"
		/>
		<path 
			fill="currentColor" 
			fillRule="evenodd" 
			d="M17.272.615 7.266 10.62a.435.435 0 0 1-.615 0l-3.48-3.48.615-.615 3.172 3.172L16.656 0z" 
			clipRule="evenodd"
		/>
	</svg>
);