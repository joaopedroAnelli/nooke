import type {ReactNode} from 'react';

interface NookeHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  variant?: 'primary' | 'secondary' | 'minimal';
}

export function NookeHeading({
  children,
  level = 1,
  className = '',
  variant = 'primary',
}: NookeHeadingProps) {
  const baseClasses =
    'font-heading text-deep-charcoal leading-tight tracking-wide';

  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-light',
    2: 'text-2xl md:text-3xl lg:text-4xl font-normal',
    3: 'text-xl md:text-2xl font-medium',
    4: 'text-lg md:text-xl font-medium',
  };

  const variantClasses = {
    primary: '',
    secondary: 'text-warm-stone',
    minimal: 'font-light text-warm-stone',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[level]} ${variantClasses[variant]} ${className}`;

  if (level === 1) {
    return <h1 className={combinedClasses}>{children}</h1>;
  } else if (level === 2) {
    return <h2 className={combinedClasses}>{children}</h2>;
  } else if (level === 3) {
    return <h3 className={combinedClasses}>{children}</h3>;
  } else {
    return <h4 className={combinedClasses}>{children}</h4>;
  }
}

interface NookeTextProps {
  children: ReactNode;
  variant?: 'body' | 'muted' | 'accent' | 'small';
  className?: string;
}

export function NookeText({
  children,
  variant = 'body',
  className = '',
}: NookeTextProps) {
  const baseClasses = 'font-body leading-relaxed';

  const variantClasses = {
    body: 'text-deep-charcoal text-base',
    muted: 'text-warm-stone text-sm',
    accent: 'text-soft-ember text-base font-medium',
    small: 'text-deep-charcoal text-sm',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <p className={combinedClasses}>{children}</p>;
}

interface NookeButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function NookeButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
}: NookeButtonProps) {
  const baseClasses =
    'font-heading font-medium uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-soft-ember focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-full',
    md: 'px-8 py-3 text-sm rounded-full',
    lg: 'px-10 py-4 text-base rounded-full',
  };

  const variantClasses = {
    primary:
      'bg-soft-ember text-nooke-white border-2 border-soft-ember hover:bg-amber-600 hover:-translate-y-0.5 hover:shadow-lg',
    secondary:
      'bg-transparent text-deep-charcoal border-2 border-border-soft hover:border-soft-ember hover:text-soft-ember hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-warm-stone border-none hover:text-deep-charcoal hover:bg-white hover:shadow-sm',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface NookeCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function NookeCard({
  children,
  className = '',
  elevated = false,
  padding = 'md',
}: NookeCardProps) {
  const baseClasses =
    'bg-white border border-border-soft rounded-2xl transition-all duration-200';

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const elevationClasses = elevated
    ? 'hover:-translate-y-1 hover:shadow-xl'
    : 'hover:shadow-md';

  const combinedClasses = `${baseClasses} ${paddingClasses[padding]} ${elevationClasses} ${className}`;

  return <div className={combinedClasses}>{children}</div>;
}

interface NookeSectionProps {
  children: ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '6xl' | '7xl' | 'full';
}

export function NookeSection({
  children,
  className = '',
  spacing = 'lg',
  maxWidth = '6xl',
}: NookeSectionProps) {
  const spacingClasses = {
    sm: 'py-8 px-4',
    md: 'py-12 px-6',
    lg: 'py-16 px-8',
    xl: 'py-24 px-10',
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  const combinedClasses = `${spacingClasses[spacing]} ${maxWidthClasses[maxWidth]} mx-auto ${className}`;

  return <section className={combinedClasses}>{children}</section>;
}
