import { render, screen } from '@testing-library/react';
import { ExtractedSvg } from '../ExtractedSvg';

describe('ExtractedSvg', () => {
  it('renders with default props', () => {
    render(<ExtractedSvg />);
    
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '100');
    expect(svg).toHaveAttribute('viewBox', '0 0 180 100');
  });

  it('accepts custom width and height', () => {
    render(<ExtractedSvg width={150} height={75} />);
    
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('width', '150');
    expect(svg).toHaveAttribute('height', '75');
  });

  it('accepts custom className', () => {
    render(<ExtractedSvg className="custom-class" />);
    
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('accepts custom style', () => {
    const customStyle = { opacity: 0.5 };
    render(<ExtractedSvg style={customStyle} />);
    
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveStyle('opacity: 0.5');
  });

  it('maintains proper viewBox and has both path elements', () => {
    render(<ExtractedSvg />);
    
    const svg = screen.getByRole('img');
    const paths = svg.querySelectorAll('path');
    
    expect(svg).toHaveAttribute('viewBox', '0 0 180 100');
    expect(paths).toHaveLength(2); // Top and bottom parts
    expect(paths[0]).toHaveAttribute('fill', '#31afb4'); // Top part - teal
    expect(paths[1]).toHaveAttribute('fill', '#babdc6'); // Bottom part - gray
  });

  it('has proper accessibility attributes', () => {
    render(<ExtractedSvg />);
    
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('aria-label', 'Creative Current Logo');
  });

  it('shows text when showText prop is true', () => {
    render(<ExtractedSvg showText={true} />);
    
    expect(screen.getByText('CREATIVE CURRENT')).toBeInTheDocument();
  });

  it('does not show text when showText prop is false', () => {
    render(<ExtractedSvg showText={false} />);
    
    expect(screen.queryByText('CREATIVE CURRENT')).not.toBeInTheDocument();
  });

  it('shows HOME text when not animated', () => {
    render(<ExtractedSvg animated={false} />);
    
    expect(screen.getByText('HOME')).toBeInTheDocument();
  });
});