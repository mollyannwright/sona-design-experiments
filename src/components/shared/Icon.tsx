/**
 * SonaUI Icon Component
 * 
 * Loads SVG icons from /sonaui-design-system/icons/
 * Icons use currentColor so they can be styled with text-* classes
 */

import { useState, useEffect } from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | number;
}

const sizeMap = {
  sm: 'w-4 h-4',  // 16px
  md: 'w-5 h-5',  // 20px
  lg: 'w-6 h-6',  // 24px
};

// Cache for loaded SVG content
const svgCache: Record<string, string> = {};

export function Icon({ name, className = '', size = 'md' }: IconProps) {
  const [svgContent, setSvgContent] = useState<string | null>(svgCache[name] || null);
  const [error, setError] = useState(false);

  const sizeClass = typeof size === 'number' ? '' : sizeMap[size];
  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : {};

  useEffect(() => {
    if (svgCache[name]) {
      setSvgContent(svgCache[name]);
      return;
    }

    const loadSvg = async () => {
      try {
        const response = await fetch(`/icons/${name}.svg`);
        if (!response.ok) throw new Error('Icon not found');
        const text = await response.text();
        // Remove the outer svg wrapper and get inner content
        const cleanedSvg = text
          .replace(/<svg[^>]*>/, '')
          .replace(/<\/svg>/, '');
        svgCache[name] = cleanedSvg;
        setSvgContent(cleanedSvg);
      } catch {
        setError(true);
        console.warn(`Icon "${name}" not found in /icons/`);
      }
    };

    loadSvg();
  }, [name]);

  if (error) {
    return <span className={`${sizeClass} ${className}`} style={sizeStyle}>?</span>;
  }

  if (!svgContent) {
    return <span className={`${sizeClass} ${className}`} style={sizeStyle} />;
  }

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} ${className}`}
      style={sizeStyle}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

// Commonly used icons as named exports for convenience
export const SearchIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Search" {...props} />;
export const EditIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Edit" {...props} />;
export const TrashIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Trash" {...props} />;
export const PlusIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Plus" {...props} />;
export const ChevronDownIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Chevron down" {...props} />;
export const ChevronRightIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Chevron right" {...props} />;
export const ChevronLeftIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Chevron left" {...props} />;
export const XIcon = (props: Omit<IconProps, 'name'>) => <Icon name="X" {...props} />;
export const CheckIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Check" {...props} />;
export const DownloadIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Download" {...props} />;
export const UploadIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Upload" {...props} />;
export const DuplicateIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Duplicate" {...props} />;
export const ExclamationTriangleIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Exclamation triangle" {...props} />;
export const InformationCircleIcon = (props: Omit<IconProps, 'name'>) => <Icon name="Information circle" {...props} />;

export default Icon;
