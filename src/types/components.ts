export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export interface AnimationProps {
  initial?: string | boolean;
  animate?: string | boolean;
  transition?: object;
  variants?: object;
}

export interface HeaderProps {
  fixed?: boolean;
  variant?: 'light' | 'dark';
}

export interface NavigationLink {
  href: string;
  label: string;
}
