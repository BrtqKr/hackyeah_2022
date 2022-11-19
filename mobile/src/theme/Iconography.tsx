export enum IconSize {
  XSmall = 'XSmall',
  Small = 'Small',
  Regular = 'Regular',
  Large = 'Large',
  XLarge = 'XLarge',
}

export const sizeMap: { [key in IconSize]: number } = {
  XSmall: 12,
  Small: 18,
  Regular: 20,
  Large: 24,
  XLarge: 28,
};
