const Colors = {
  WhiteOpacity: (opacity = '0.5') => `rgba(255, 255, 255, ${opacity})`,
  BlackOpacity: (opacity = '0.5') => `rgba(0, 0, 0, ${opacity})`,
  TextColorOpacity: (opacity = 0.15) => `rgba(64, 81, 78, ${opacity})`,
  DisabledColor: (opacity = '0.5') => `rgba(20, 60, 133, ${opacity})`,
  WhiteTwentyOpacity: 'rgba(255, 255, 255, 0.2)',
  PrimaryTextColor: '#6F747D',
  SecondaryTextColor: '#131720',
  HeaderColour: '#C0FF00',
  Primary: '#0D8056',
  Secondary: '#FF2800',
  Danger: '#BE1E24',
  grey: '#00000060',
  Success: '#1cd50f',
  Theme: '#F27122',
  greyText: '#42526E',
  // Transparent: 'transparent',
  // Shadow: '#000000',
  // Placeholder:'rgba(66, 82, 110, 0.5)',
  // TextDark: '#0E134F',
  // TextLight: '#42526E',
  // InputFieldBackground:'rgba(66, 82, 110, 0.03)',
  // InputFieldBorder:'rgba(66, 82, 110, 0.3)',
  // LightGray:'rgba(66, 82, 110, 0.5)',
  // Gray:'rgba(255, 255, 255, 0.5)'
};

export default Colors;
