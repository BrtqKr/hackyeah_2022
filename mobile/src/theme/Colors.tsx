export enum ColorName {
  Primary1 = 'Primary1',
  Primary2 = 'Primary2',
  Primary3 = 'Primary3',
  PrimaryDark = 'PrimaryDark',
  Secondary1 = 'Secondary1',
  Secondary2 = 'Secondary2',
  Secondary3 = 'Secondary3',
  Secondary4 = 'Secondary4',
  Dark1 = 'Dark1',
  Dark2 = 'Dark2',
  Dark3 = 'Dark3',
  White1 = 'White1',
  Success1 = 'Success1',
  Success2 = 'Success2',
  Success3 = 'Success3',
  Blue1 = 'Blue1',
  Blue2 = 'Blue2',
  Blue3 = 'Blue3',
  Link = 'Link',
  Gold1 = 'Gold1',
  Transparent = 'Transparent',
}

export const Colors: { [key in ColorName]: `#${string}` } = {
  Primary1: '#843E3E',
  Primary2: '#CB1F33',
  Primary3: '#CE1D34',
  PrimaryDark: '#843E3E',
  Secondary1: '#4D5558',
  Secondary2: '#586166',
  Secondary3: '#787F85',
  Secondary4: '#a4acb3',
  Dark1: '#000',
  Dark2: '#313F46',
  Dark3: '#121212',
  White1: '#E5EBED',
  Success1: '#72C944',
  Success2: '#78BA56',
  Success3: '#78BAA0',
  Blue1: '#0050A0',
  Blue2: '#2976C2',
  Blue3: '#98BEE6',
  Link: '#4286F4',
  Transparent: '#00000000',
  Gold1: '#EAC435',
};

export type Color = keyof typeof Colors;
