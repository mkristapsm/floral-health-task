import Image from 'next/image';

import Button from "../ui/Button/Button";

import style from './StartSection.module.scss';

interface StartSectionProps {
	onNext: () => void;
}

export default function StartSection({ onNext }: StartSectionProps) {
	return (
		<section className={style.start_selection}>
			<div className={style.container}>
				<div className={style.content}>
					<h1>Metabolic Reset Program for Women</h1>
					<p className={style.description}>
						Designed specifically for women's changing bodies.
						Tailored to age, hormones, and psychology.
					</p>
					<div className={style.action_group}>
						<fieldset className={style.button_group_fieldset}>
							<legend className={style.question_text}>
								Select your weight loss goal?
							</legend>
							<div className={style.button_group}>
								<Button variant="primary" type="button" onClick={onNext}>
									Up to 20 lbs
								</Button>
								<Button variant="primary" type="button" onClick={onNext}>
									20-40 lbs
								</Button>
								<Button variant="primary" type="button" onClick={onNext}>
									40+ lbs
								</Button>
							</div>
						</fieldset>
					</div>
				</div>
				<Image
					src="/images/two-persons.png"
					alt="Two woman embracing"
					width={501}
					height={466}
					className={style.main_image}
				/>
			</div>
		</section>
	);
}
