import {createContext, useContext} from 'react';
import badgeTheme from './badge/theme.js';
import multiSelectTheme from './multi-select/theme.js';
import selectTheme from './select/theme.js';
import spinnerTheme from './spinner/theme.js';

export type Theme = {
	components: Record<string, ComponentTheme>;
};

export type ComponentTheme = MultiPartComponentTheme;

export type MultiPartComponentTheme = {
	parts: string[];
	baseStyle: Record<
		string,
		ComponentStyles | ((props: any) => ComponentStyles)
	>;
	defaultProps?: Record<string, unknown>;
};

export type ComponentStyles = Record<string, unknown>;

export const defaultTheme: Theme = {
	components: {
		/* eslint-disable @typescript-eslint/naming-convention */
		Badge: badgeTheme,
		MultiSelect: multiSelectTheme,
		Select: selectTheme,
		Spinner: spinnerTheme,
		/* eslint-enable @typescript-eslint/naming-convention */
	},
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ThemeContext = createContext<Theme>(defaultTheme);

export const useMultiStyleConfig = (
	component: string,
	props: Record<string, unknown> = {},
): Record<string, ComponentStyles> => {
	const theme = useContext(ThemeContext);
	const componentTheme = theme.components[component];

	if (!componentTheme) {
		return {};
	}

	const stylesByComponent: Record<string, ComponentStyles> = {};

	for (const part of componentTheme.parts) {
		const styles = componentTheme.baseStyle[part];

		stylesByComponent[part] = {
			...(typeof styles === 'function'
				? styles({
						...componentTheme.defaultProps,
						...props,
				  })
				: styles),
		};
	}

	return stylesByComponent;
};
