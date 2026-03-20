import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * BentoGrid - 12-column CSS Grid system for asymmetric Bento-style layouts
 * 
 * @example
 * ```tsx
 * <BentoGrid>
 *   <BentoGridItem colSpan={8} rowSpan={2}>Large featured item</BentoGridItem>
 *   <BentoGridItem colSpan={4}>Smaller item</BentoGridItem>
 *   <BentoGridItem colSpan={6}>Half-width item</BentoGridItem>
 * </BentoGrid>
 * ```
 */

export type BentoGridProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Gap size between grid items
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Number of columns (mobile breakpoint)
   * @default 1
   */
  colsMobile?: 1 | 2 | 4
  /**
   * Number of columns (tablet breakpoint)
   * @default 6
   */
  colsTablet?: 4 | 6 | 8
  /**
   * Number of columns (desktop breakpoint)
   * @default 12
   */
  colsDesktop?: 8 | 12
}

const gapClasses = {
  sm: 'gap-4',      // 16px
  md: 'gap-6',      // 24px
  lg: 'gap-8',      // 32px
  xl: 'gap-12',     // 48px
}

export function BentoGrid({
  className,
  gap = 'md',
  colsMobile = 1,
  colsTablet = 6,
  colsDesktop = 12,
  children,
  ...props
}: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid w-full',
        gapClasses[gap],
        // Mobile columns
        colsMobile === 1 && 'grid-cols-1',
        colsMobile === 2 && 'grid-cols-2',
        colsMobile === 4 && 'grid-cols-4',
        // Tablet columns
        colsTablet === 4 && 'md:grid-cols-4',
        colsTablet === 6 && 'md:grid-cols-6',
        colsTablet === 8 && 'md:grid-cols-8',
        // Desktop columns
        colsDesktop === 8 && 'lg:grid-cols-8',
        colsDesktop === 12 && 'lg:grid-cols-12',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * BentoGridItem - Grid child with responsive column/row spanning
 * 
 * @example
 * ```tsx
 * <BentoGridItem colSpan={8} rowSpan={2} colSpanMd={12}>
 *   Content here
 * </BentoGridItem>
 * ```
 */

export type BentoGridItemProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Column span (mobile)
   * @default 1
   */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'
  /**
   * Column span (tablet)
   */
  colSpanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'
  /**
   * Column span (desktop)
   */
  colSpanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'
  /**
   * Row span
   * @default 1
   */
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto'
  /**
   * Row span (tablet)
   */
  rowSpanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto'
  /**
   * Row span (desktop)
   */
  rowSpanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto'
}

const colSpanClasses = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
  full: 'col-span-full',
}

const colSpanMdClasses = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
  full: 'md:col-span-full',
}

const colSpanLgClasses = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
  full: 'lg:col-span-full',
}

const rowSpanClasses = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
  auto: 'row-auto',
}

const rowSpanMdClasses = {
  1: 'md:row-span-1',
  2: 'md:row-span-2',
  3: 'md:row-span-3',
  4: 'md:row-span-4',
  5: 'md:row-span-5',
  6: 'md:row-span-6',
  auto: 'md:row-auto',
}

const rowSpanLgClasses = {
  1: 'lg:row-span-1',
  2: 'lg:row-span-2',
  3: 'lg:row-span-3',
  4: 'lg:row-span-4',
  5: 'lg:row-span-5',
  6: 'lg:row-span-6',
  auto: 'lg:row-auto',
}

export function BentoGridItem({
  className,
  colSpan = 1,
  colSpanMd,
  colSpanLg,
  rowSpan = 1,
  rowSpanMd,
  rowSpanLg,
  children,
  ...props
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        'relative',
        // Column spans
        colSpanClasses[colSpan],
        colSpanMd && colSpanMdClasses[colSpanMd],
        colSpanLg && colSpanLgClasses[colSpanLg],
        // Row spans
        rowSpanClasses[rowSpan],
        rowSpanMd && rowSpanMdClasses[rowSpanMd],
        rowSpanLg && rowSpanLgClasses[rowSpanLg],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
