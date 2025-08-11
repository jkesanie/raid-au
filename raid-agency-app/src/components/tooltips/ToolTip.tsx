import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Type definitions
type IconType = 'info' | 'help' ;
type PlacementType = 'top' | 'bottom' | 'left' | 'right';
type VariantType = 'default' | 'info' | 'warning' | 'error' | 'success';

interface CustomTooltipProps {
  title?: string;
  content?: string;
  icon?: IconType;
  placement?: PlacementType;
  maxWidth?: number;
  variant?: VariantType;
}

// Custom Tooltip Component
export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  title, 
  content, 
  icon = 'info', 
  placement = 'top',
  maxWidth = 600,
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Icon mapping
  const iconMap: Record<IconType, React.ReactElement> = {
    info: <InfoOutlinedIcon />,
    help: <HelpOutlineIcon />,
  };

  // Color mapping
  const colorMap: Record<VariantType, string> = {
    default: '#1976d2',
    info: '#0288d1',
    warning: '#f57c00',
    error: '#d32f2f',
    success: '#388e3c'
  };

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as Node;
    if (tooltipRef.current && !tooltipRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getTransform = (placement: PlacementType): string => {
    switch (placement) {
      case 'top':
        return 'translateX(-50%) translateY(0%)';
      case 'bottom':
        return 'translateX(-50%) translateY(0)';
      case 'left':
        return 'translateX(-100%) translateY(-50%)';
      case 'right':
        return 'translateX(0) translateY(-50%)';
      default:
        return 'translateX(-50%) translateY(0%)';
    }
  };

  const getPositionStyles = (placement: PlacementType): CSSProperties => {
    switch (placement) {
      case 'top':
        return { bottom: '100%', left: '50%', marginBottom: '8px' };
      case 'bottom':
        return { top: '100%', left: '50%', marginTop: '8px' };
      case 'left':
        return { right: '100%', top: '50%', marginRight: '8px' };
      case 'right':
        return { left: '100%', top: '50%', marginLeft: '8px' };
      default:
        return { bottom: '100%', left: '50%', marginBottom: '8px' };
    }
  };

  const tooltipStyles: CSSProperties = {
    position: 'relative',
    display: 'content',
  };

  const buttonStyles: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colorMap[variant],
    transition: 'background-color 0.2s ease',
    fontSize: 0,
  };

  const buttonHoverStyles: CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  };

  const tooltipContentStyles: CSSProperties = {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    maxWidth: `${maxWidth}px`,
    minWidth: '200px',
    fontSize: '14px',
    lineHeight: '1.5',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    transform: getTransform(placement),
    ...getPositionStyles(placement),
  };

  const tooltipArrowStyles: CSSProperties = {
    content: '',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const titleStyles: CSSProperties = {
    fontWeight: 600,
    marginBottom: content ? '8px' : 0,
    color: '#212121',
    fontSize: '14px',
  };

  const contentStyles: CSSProperties = {
    color: '#757575',
    fontSize: '14px',
    margin: 0,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>): void => {
    Object.assign(e.currentTarget.style, buttonHoverStyles);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <div style={tooltipStyles}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        style={buttonStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type="button"
        aria-label={title || `${icon} tooltip`}
        aria-expanded={isOpen}
      >
        {iconMap[icon]}
      </button>
      
      <div 
        ref={tooltipRef} 
        style={tooltipContentStyles}
        role="tooltip"
        aria-hidden={!isOpen}
      >
        {title && <div style={titleStyles}>{title}</div>}
        {content && <div style={contentStyles}>{content}</div>}
      </div>
    </div>
  );
};

export type { CustomTooltipProps, IconType, PlacementType, VariantType };
