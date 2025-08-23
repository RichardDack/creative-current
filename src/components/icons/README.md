# Icon Components

This directory contains SVG icon components extracted from the original Framer design. All icons are optimized React components with TypeScript support.

## Available Icons

- **BrowserIcon** - Browser window with navigation dots
- **CheckIcon** - Checkmark in a circle
- **LoadingIcon** - Loading spinner/progress indicator
- **FlagIcon** - Flag shape
- **MegaphoneIcon** - Megaphone/announcement icon
- **WindowIcon** - Layered window interface
- **QuestionIcon** - Question mark in a circle
- **CartIcon** - Shopping cart with items

## Usage

### Individual Import
```tsx
import { BrowserIcon, CheckIcon } from '@/components/icons';

function MyComponent() {
  return (
    <div>
      <BrowserIcon size={24} color="#31afb4" />
      <CheckIcon size={16} color="green" className="my-icon" />
    </div>
  );
}
```

### Collection Import
```tsx
import { Icons } from '@/components/icons';

function MyComponent() {
  return (
    <div>
      <Icons.Browser size={32} />
      <Icons.Check color="currentColor" />
    </div>
  );
}
```

## Props

All icon components accept the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Width and height of the icon |
| `color` | `string` | `'currentColor'` | Fill color of the icon |
| `className` | `string` | `''` | Additional CSS classes |

## Features

- **TypeScript Support**: Full type definitions included
- **Tree Shaking**: Optimized for bundle splitting
- **Accessibility**: Proper SVG structure with semantic markup
- **Customizable**: Size, color, and styling props
- **Performance**: Optimized SVG paths from original Framer assets
- **Consistent API**: All icons follow the same interface

## Design Tokens

Icons are designed to work with the project's design tokens:

```css
/* Use with design tokens */
<BrowserIcon color="var(--color-primary)" />
<CheckIcon color="var(--color-success)" />
```

## Examples

### Different Sizes
```tsx
<BrowserIcon size={16} />  {/* Small */}
<BrowserIcon size={24} />  {/* Default */}
<BrowserIcon size={32} />  {/* Large */}
<BrowserIcon size="2rem" /> {/* CSS units */}
```

### Different Colors
```tsx
<CheckIcon color="#31afb4" />           {/* Hex */}
<CheckIcon color="rgb(49, 175, 180)" /> {/* RGB */}
<CheckIcon color="currentColor" />      {/* Inherit */}
<CheckIcon color="var(--color-primary)" /> {/* CSS Custom Property */}
```

### With CSS Classes
```tsx
<LoadingIcon 
  className="animate-spin text-blue-500" 
  size={24} 
/>
```