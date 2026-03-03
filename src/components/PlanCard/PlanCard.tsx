import { ReactNode } from 'react';
import styles from './PlanCard.module.scss';

interface PlanCardProps {
    customClass?: string;
    headerTitle?: string;
    children: ReactNode;
};

export default function PlanCard({ customClass, headerTitle, children, ...props }: PlanCardProps) {
    const cardClassName = customClass ? styles.plan_card + ' ' + customClass : styles.plan_card;

    return (
        <div className={cardClassName} {...props}>
            {headerTitle &&
                <div className={styles.plan_card_header}>
                    {headerTitle}
                </div>
            }
            <div className={styles.plan_card_content}>
                {children}
            </div>
        </div>
    );
}