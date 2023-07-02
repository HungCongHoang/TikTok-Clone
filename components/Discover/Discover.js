import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Discover.module.scss';
import DiscoverButton from './DiscoverButton';
import { DiscoverHastagIcon, DiscoverMusicIcon } from '../icons';

const cx = classNames.bind(styles);

function Discover({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('box-btn')}>
                <DiscoverButton
                    title="suthatla"
                    icon={<DiscoverHastagIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="mackedoi"
                    icon={<DiscoverHastagIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="sansangthaydoi"
                    icon={<DiscoverHastagIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & hon"
                    icon={<DiscoverMusicIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng"
                    icon={<DiscoverMusicIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & hon"
                    icon={<DiscoverMusicIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="suthatla"
                    icon={<DiscoverHastagIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="mackedoi"
                    icon={<DiscoverHastagIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng"
                    icon={<DiscoverMusicIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
                <DiscoverButton
                    title="Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & hon"
                    icon={<DiscoverMusicIcon className={cx('icon-btn')} />}
                ></DiscoverButton>
            </div>
        </div>
    );
}

Discover.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Discover;
