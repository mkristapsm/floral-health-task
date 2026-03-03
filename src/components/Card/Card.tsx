import { ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
    customClass?: string;
    children: ReactNode;
};

export default function Card({ customClass, children, ...props }: CardProps) {
    const cardClassName = customClass ? styles.card + ' ' + customClass : styles.card;

    return (
        <div className={cardClassName} {...props}>
            {children}
        </div>
    )
}