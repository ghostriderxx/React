import * as React from 'react';
import classNames from 'classnames';
import * as allIcons from 'webj2ee-icons/lib/dist';
import ReactIcon from 'webj2ee-icons-react';
import createFromIconfontCN from './IconFont';
import {
  svgBaseProps, withThemeSuffix,
  removeTypeTheme, getThemeFromTypeName,
  alias,
} from './utils';
import warning from '../_util/warning';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';

// Initial setting
ReactIcon.add(
    ...Object.keys(allIcons).map((key) => allIcons[key])
);
setTwoToneColor('#1890ff');
let defaultTheme = 'outlined';
let dangerousTheme = undefined;

const Icon = (props) => {
  const {
    // affect outter <i>...</i>
    className,

    // affect inner <svg>...</svg>
    type,
    component: Component,
    viewBox,
    spin,

    // children
    children,

    // other
    theme, // default to outlined
    twoToneColor,

    ...restProps
  } = props;

  warning(
    Boolean(type || Component || children),
    'Icon should have `type` prop or `component` prop or `children`.',
  );

  const classString = classNames({
    [`anticon`]: true,
    [`anticon-${type}`]: Boolean(type),
  }, className);

  const svgClassString = classNames({
    [`anticon-spin`]: !!spin || type === 'loading',
  });

  let innerNode;

  // component > children > type
  if (Component) {
    const innerSvgProps = {
      ...svgBaseProps,
      className: svgClassString,
      viewBox,
    };
    if (!viewBox) {
      delete innerSvgProps.viewBox;
    }

    innerNode = (
      <Component {...innerSvgProps} >
        {children}
      </Component>
    );
  }

  if (children) {
    warning(
      Boolean(viewBox) || (
        React.Children.count(children) === 1 &&
        React.isValidElement(children) &&
        React.Children.only(children).type === 'use'
      ),
      'Make sure that you provide correct `viewBox`' +
      ' prop (default `0 0 1024 1024`) to the icon.',
    );
    const innerSvgProps = {
      ...svgBaseProps,
      className: svgClassString,
    };
    innerNode = (
      <svg {...innerSvgProps} viewBox={viewBox}>
        {children}
      </svg>
    );
  }

  if (typeof type === 'string') {
    let computedType = type;
    if (theme) {
      const themeInName = getThemeFromTypeName(type);
      warning(!themeInName || theme === themeInName,
        `The icon name '${type}' already specify a theme '${themeInName}',` +
        ` the 'theme' prop '${theme}' will be ignored.`);
    }
    computedType = withThemeSuffix(
      removeTypeTheme(alias(type)),
      dangerousTheme || theme || defaultTheme,
    );
    innerNode = (
      <ReactIcon
        className={svgClassString}
        type={computedType}
        primaryColor={twoToneColor}
      />
    );
  }

  return (
    <i {...restProps} className={classString}>
      {innerNode}
    </i>
  );
};

Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;
