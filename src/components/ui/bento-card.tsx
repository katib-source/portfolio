import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * BentoCard - Flat, high-contrast card component for Bento-style layouts
 * Replaces legacy card styling with clean engineering-first aesthetic
 * 
 * @example
 * ```tsx
 * <BentoCard padding="lg" interactive>
 *   <BentoCard.Label>Machine Learning</BentoCard.Label>
 *   <BentoCard.Title>Hotel Cancellation Prediction</BentoCard.Title>
 *   <BentoCard.Content>
 *     A CatBoost model achieving 0.95 AUC-ROC...
 *   </BentoCard.Content>
 * </BentoCard>
 * ```
 */

export type BentoCardProps = HTMLMotionProps<'div'> & {
  span?: string
  index?: number
  /**
   * Card padding size (constraint system: 8px, 16px, 24px, 48px)
   * @default 'md'
   */
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'none'
  /**
   * Card surface variant
   * @default 'elevated'
   */
  variant?: 'flat' | 'elevated' | 'outlined'
  /**
   * Enable interactive hover state (border turns electric-green)
   * @default false
   */
  interactive?: boolean
  /**
   * Full height card (stretches to container)
   * @default false
   */
  fullHeight?: boolean
  /**
   * Accent border on left edge
   * @default false
   */
  accentBorder?: boolean
}

const paddingClasses = {
  none: 'p-0',
  xs: 'p-2',    // 8px
  sm: 'p-4',    // 16px
  md: 'p-6',    // 24px
  lg: 'p-12',   // 48px
}

const variantClasses = {
  flat: '',
  elevated: '',
  outlined: '',
}

export function BentoCard({
  className,
  span = 'col-span-12 md:col-span-4',
  index = 0,
  padding = 'md',
  variant = 'elevated',
  interactive = false,
  fullHeight = false,
  accentBorder = false,
  children,
  ...props
}: BentoCardProps) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-48px' }}
      className={cn(
        'bg-zinc-900/50 border border-zinc-800 rounded-none p-6 md:p-8',
        span,
        variantClasses[variant],
        paddingClasses[padding],
        fullHeight && 'h-full',
        interactive && [
          'cursor-pointer transition-colors duration-300',
          'hover:border-[rgba(0,255,159,0.3)]',
        ],
        accentBorder && 'border-l-2 border-l-[#00FF9F]',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export type SectionTagProps = {
  id: string
  label: string
  className?: string
}

export function SectionTag({ id, label, className }: SectionTagProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="font-mono text-xs text-[#00FF9F]">#{id}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
    </div>
  )
}

export type MetaProps = ComponentPropsWithoutRef<'span'> & {
  prefix?: '#' | '~'
}

export function Meta({ prefix = '~', className, children, ...props }: MetaProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500', className)} {...props}>
      <span className="text-zinc-600">{prefix}</span>
      <span>{children}</span>
    </span>
  )
}

/**
 * BentoCard.Label - Mono font eyebrow label
 */
export type BentoCardLabelProps = ComponentPropsWithoutRef<'p'> & {
  /**
   * Accent color for label
   * @default false
   */
  accent?: boolean
}

function BentoCardLabel({ className, accent = false, children, ...props }: BentoCardLabelProps) {
  return (
    <p
      className={cn(
        'font-mono text-label-sm tracking-wider',
        accent ? 'text-accent-primary' : 'text-tertiary',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

/**
 * BentoCard.Title - Semantic display/headline typography
 */
export type BentoCardTitleProps = ComponentPropsWithoutRef<'h3'> & {
  /**
   * Title size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Custom HTML heading level (for accessibility)
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const titleSizeClasses = {
  sm: 'text-title-md',       // 18px
  md: 'text-headline-sm',    // 24px
  lg: 'text-headline-md',    // 30px
  xl: 'text-headline-lg',    // 36px
}

function BentoCardTitle({
  className,
  size = 'md',
  as: Component = 'h3',
  children,
  ...props
}: BentoCardTitleProps) {
  return (
    <Component
      className={cn(
        'font-semibold tracking-tight text-primary',
        titleSizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * BentoCard.Description - Body text content
 */
export type BentoCardDescriptionProps = ComponentPropsWithoutRef<'p'> & {
  /**
   * Text size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
}

const descriptionSizeClasses = {
  sm: 'text-body-sm',   // 14px
  md: 'text-body-md',   // 16px
  lg: 'text-body-lg',   // 18px
}

function BentoCardDescription({
  className,
  size = 'md',
  children,
  ...props
}: BentoCardDescriptionProps) {
  return (
    <p
      className={cn(
        'leading-relaxed text-secondary',
        descriptionSizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

/**
 * BentoCard.Content - Generic content container with spacing
 */
export type BentoCardContentProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Internal spacing between children
   * @default 'md'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg'
}

const spacingClasses = {
  xs: 'space-y-2',   // 8px
  sm: 'space-y-4',   // 16px
  md: 'space-y-6',   // 24px
  lg: 'space-y-12',  // 48px
}

function BentoCardContent({
  className,
  spacing = 'md',
  children,
  ...props
}: BentoCardContentProps) {
  return (
    <div className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </div>
  )
}

/**
 * BentoCard.Header - Combined label + title layout
 */
export type BentoCardHeaderProps = {
  label?: ReactNode
  title: ReactNode
  description?: ReactNode
  labelProps?: BentoCardLabelProps
  titleProps?: BentoCardTitleProps
  descriptionProps?: BentoCardDescriptionProps
  className?: string
}

function BentoCardHeader({
  label,
  title,
  description,
  labelProps,
  titleProps,
  descriptionProps,
  className,
}: BentoCardHeaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {label && <BentoCardLabel {...labelProps}>{label}</BentoCardLabel>}
      <BentoCardTitle {...titleProps}>{title}</BentoCardTitle>
      {description && (
        <BentoCardDescription {...descriptionProps}>{description}</BentoCardDescription>
      )}
    </div>
  )
}

/**
 * BentoCard.Footer - Action area with auto-spacing
 */
export type BentoCardFooterProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Flex alignment
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end' | 'between'
}

const footerAlignClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
}

function BentoCardFooter({
  className,
  align = 'start',
  children,
  ...props
}: BentoCardFooterProps) {
  return (
    <div
      className={cn('flex items-center gap-3', footerAlignClasses[align], className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * BentoCard.Badge - Small pill component
 */
export type BentoCardBadgeProps = ComponentPropsWithoutRef<'span'> & {
  /**
   * Badge variant
   * @default 'default'
   */
  variant?: 'default' | 'accent' | 'outline'
}

const badgeVariantClasses = {
  default: 'bg-surface-sunken text-secondary border-transparent',
  accent: 'bg-accent-primary text-accent-on-primary border-transparent',
  outline: 'bg-transparent text-secondary border-border-primary',
}

function BentoCardBadge({
  className,
  variant = 'default',
  children,
  ...props
}: BentoCardBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-label-sm font-semibold',
        badgeVariantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/**
 * BentoCard.Metric - Large number display with label
 */
export type BentoCardMetricProps = {
  value: string | number
  label: string
  icon?: ReactNode
  className?: string
}

function BentoCardMetric({ value, label, icon, className }: BentoCardMetricProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-baseline gap-2">
        {icon && <span className="text-accent-primary">{icon}</span>}
        <p className="text-display-sm font-bold text-primary">{value}</p>
      </div>
      <p className="text-label-md text-tertiary">{label}</p>
    </div>
  )
}

// Compound component exports
BentoCard.Label = BentoCardLabel
BentoCard.Title = BentoCardTitle
BentoCard.Description = BentoCardDescription
BentoCard.Content = BentoCardContent
BentoCard.Header = BentoCardHeader
BentoCard.Footer = BentoCardFooter
BentoCard.Badge = BentoCardBadge
BentoCard.Metric = BentoCardMetric
