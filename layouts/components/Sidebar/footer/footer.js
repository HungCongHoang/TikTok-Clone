import classNames from 'classnames/bind';
import styles from './footer.module.scss';
import { contact, Tiktok, Help } from './content';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                {contact.map((title, index) => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a key={index}>{title}</a>
                ))}
            </div>
            <div className={cx('link')}>
                {Tiktok.map((title, index) => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a key={index}>{title}</a>
                ))}
            </div>
            <div className={cx('link')}>
                {Help.map((title, index) => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a key={index}>{title}</a>
                ))}
            </div>
            <span>© 2022 TikTok</span>
        </div>
    );
}

export default Footer;
