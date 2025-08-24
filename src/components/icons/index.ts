// Icon component exports
export { BrowserIcon, type IconProps } from './BrowserIcon';
export { BurgerIcon, type BurgerIconProps } from './BurgerIcon';
export { CheckIcon } from './CheckIcon';
export { LoadingIcon } from './LoadingIcon';
export { FlagIcon } from './FlagIcon';
export { MegaphoneIcon } from './MegaphoneIcon';
export { WindowIcon } from './WindowIcon';
export { QuestionIcon } from './QuestionIcon';
export { CartIcon } from './CartIcon';

// Re-export all icons as a collection for convenience
import { BrowserIcon } from './BrowserIcon';
import { BurgerIcon } from './BurgerIcon';
import { CheckIcon } from './CheckIcon';
import { LoadingIcon } from './LoadingIcon';
import { FlagIcon } from './FlagIcon';
import { MegaphoneIcon } from './MegaphoneIcon';
import { WindowIcon } from './WindowIcon';
import { QuestionIcon } from './QuestionIcon';
import { CartIcon } from './CartIcon';

export const Icons = {
  Browser: BrowserIcon,
  Burger: BurgerIcon,
  Check: CheckIcon,
  Loading: LoadingIcon,
  Flag: FlagIcon,
  Megaphone: MegaphoneIcon,
  Window: WindowIcon,
  Question: QuestionIcon,
  Cart: CartIcon,
} as const;