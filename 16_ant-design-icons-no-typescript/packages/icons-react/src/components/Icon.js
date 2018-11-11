import * as React from 'react';
import {
    generate,
    getSecondaryColor,
    isIconDefinition,
    log,
    MiniMap,
    withSuffix
} from '../utils';

const twoToneColorPalette = {
    primaryColor: '#333',
    secondaryColor: '#E6E6E6'
};

class Icon extends React.Component {
    static displayName = 'IconReact';
    static definitions = new MiniMap();

    static add(...icons) {
        icons.forEach((icon) => {
            this.definitions.set(withSuffix(icon.name, icon.theme), icon);
        });
    }

    static clear() {
        this.definitions.clear();
    }

    static get(key, colors = twoToneColorPalette) {
        if (key) {
            let target = this.definitions.get(key);
            if (target && typeof target.icon === 'function') {
                target = {
                    ...target,
                    icon: target.icon(colors.primaryColor, colors.secondaryColor)
                };
            }
            return target;
        }
    }

    static setTwoToneColors({primaryColor, secondaryColor}) {
        twoToneColorPalette.primaryColor = primaryColor;
        twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
    }

    static getTwoToneColors() {
        return {
            ...twoToneColorPalette
        };
    }

    render() {
        const {
            type,
            className,
            onClick,
            style,
            primaryColor,
            secondaryColor,
            ...rest
        } = this.props;

        let target;
        let colors = twoToneColorPalette;
        if (primaryColor) {
            colors = {
                primaryColor,
                secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
            };
        }
        if (isIconDefinition(type)) {
            target = type;
        } else if (typeof type === 'string') {
            target = Icon.get(type, colors);
            if (!target) {
                // log(`Could not find icon: ${type}`);
                return null;
            }
        }
        if (!target) {
            log(`type should be string or icon definiton, but got ${type}`);
            return null;
        }
        if (target && typeof target.icon === 'function') {
            target = {
                ...target,
                icon: target.icon(colors.primaryColor, colors.secondaryColor)
            };
        }
        return generate(target.icon, `svg-${target.name}`, {
            className,
            onClick,
            style,
            ['data-icon']: target.name,
            width: '1em',
            height: '1em',
            fill: 'currentColor',
            ['aria-hidden']: 'true',
            ...rest
        });
    }
}

export default Icon;
