import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import type { StyleProp, TextStyle } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
  iconStyle?: 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';
}

export function Icon({ name, size = 24, color, style, iconStyle = 'solid' }: IconProps) {
  return <FontAwesome6 name={name as any} size={size} color={color} style={style} iconStyle={iconStyle} />;
}
