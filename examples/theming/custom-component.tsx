import React, {render, Text, type TextProps} from 'ink';
import {
	ThemeProvider,
	defaultTheme,
	extendTheme,
	useComponentTheme,
	type ComponentTheme,
} from '../../source/index.js';

const customLabelTheme = {
	styles: {
		label: (): TextProps => ({
			color: 'green',
		}),
	},
} satisfies ComponentTheme;

type CustomLabelTheme = typeof customLabelTheme;

const customTheme = extendTheme(defaultTheme, {
	components: {
		CustomLabel: customLabelTheme,
	},
});

function CustomLabel() {
	const {styles} = useComponentTheme<CustomLabelTheme>('CustomLabel');

	return <Text {...styles.label()}>Hello world</Text>;
}

function Example() {
	return (
		<ThemeProvider theme={customTheme}>
			<CustomLabel />
		</ThemeProvider>
	);
}

render(<Example />);
