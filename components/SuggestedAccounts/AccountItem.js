// import PropTypes from 'prop-types';
import Tippy from "@tippyjs/react/headless";

import { Wrapper as PopperWrapper } from "../../components/Popper";
import AccountPreview from "./AccountPreview/AccountPreview";
import SuggestedAccountItem from "./SuggestedAccountItem";

function Accountitem({ item }) {
  return (
    <div>
      {item !== [] &&
        item.map((item, i) => (
          <Tippy
            key={i}
            interactive
            delay={[800, 0]}
            offset={[-20, 0]}
            placement="bottom"
            render={() => (
              <div tabIndex="-1">
                <PopperWrapper>
                  <div>
                    <AccountPreview data={item} />
                  </div>
                </PopperWrapper>
              </div>
            )}
          >
            <div>
              <SuggestedAccountItem data={item} />
            </div>
          </Tippy>
        ))}
    </div>
  );
}

// Accountitem.propTypes = {};

export default Accountitem;
