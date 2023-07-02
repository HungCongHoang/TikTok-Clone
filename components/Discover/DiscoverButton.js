import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Discover.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function DiscoverButton({ title, icon }) {
    return (
        <Button className={cx('discover-btn')} rounded>
            <p className={cx('item-btn')}>
                {icon}
                <span className={cx('text-btn')}>{title}</span>
            </p>
        </Button>
    );
}
DiscoverButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default DiscoverButton;
