/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#163442',
    background: '#F2F6F8',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E0ECF0',
    textSecondary: '#526975',
    accent: '#125C73',
    onAccent: '#FFFFFF',
    border: '#C6D4DB',
    danger: '#AC2636',
  },
  dark: {
    text: '#E5F1F5',
    background: '#0D1F28',
    backgroundElement: '#16313E',
    backgroundSelected: '#214352',
    textSecondary: '#B4C8D2',
    accent: '#9AD3E7',
    onAccent: '#10313E',
    border: '#47616D',
    danger: '#FFAFB8',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const Radius = { control: 12, surface: 24 } as const;
export const TypeSize = { caption: 12, label: 14, body: 16, section: 24, hero: 44 } as const;
export const ControlHeight = 48;
