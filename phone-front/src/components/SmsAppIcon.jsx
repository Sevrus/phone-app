import { Link } from 'react-router-dom';
import { usePhone } from '../context/PhoneContext.jsx';
import styles from './SmsAppIcon.module.css';

export default function SmsAppIcon() {
    const { unreadSmsCount } = usePhone();

    return (
        <div className={styles.wrapper}>
            <Link to="/sms">
                <img src="/assets/svg/sms.svg" alt="SMS" />
            </Link>
            {unreadSmsCount > 0 && (
                <span className={styles.badge}>
                    {unreadSmsCount > 9 ? '9+' : unreadSmsCount}
                </span>
            )}
        </div>
    );
}
