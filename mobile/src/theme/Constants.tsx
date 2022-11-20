enum Radius {
  Circle = 'Circle',
  XXLarge = 'XXLarge',
  XLarge = 'XLarge',
  Large = 'Large',
  Regular = 'Regular',
  Small = 'Small',
}

export const radiusMap: { [key in Radius]: number } = {
  Circle: 99999,
  XXLarge: 40,
  XLarge: 36,
  Large: 16,
  Regular: 12,
  Small: 8,
};
