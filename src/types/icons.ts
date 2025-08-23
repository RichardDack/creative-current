import { IconProps } from '../components/icons/BrowserIcon';

// Re-export IconProps for external use
export type { IconProps };

// Icon component type definition
export type IconComponent = React.FC<IconProps>;

// Available icon names
export type IconName = 
  | 'Browser'
  | 'Check'
  | 'Loading'
  | 'Flag'
  | 'Megaphone'
  | 'Window'
  | 'Question'
  | 'Cart';

// Icon collection type
export type IconCollection = Record<IconName, IconComponent>;