enum Radius {
  Circle = 'Circle',
  XLarge = 'XLarge',
  Large = 'Large',
  Regular = 'Regular',
  Small = 'Small',
}

export const radiusMap: { [key in Radius]: number } = {
  Circle: 99999,
  XLarge: 36,
  Large: 16,
  Regular: 12,
  Small: 8,
};
