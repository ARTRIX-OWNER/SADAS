/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LiquidGlassPreset = 'hyperos-liquid';

export interface DockSettings {
  preset: LiquidGlassPreset;
  powerMultiplier: number; // 0.5x to 2.5x
  hapticFeedback: boolean;
  dockPosition: 'floating' | 'attached';
  elasticity: 'high' | 'medium' | 'crisp';
}

export const DEFAULT_DOCK_SETTINGS: DockSettings = {
  preset: 'hyperos-liquid',
  powerMultiplier: 1.2,
  hapticFeedback: true,
  dockPosition: 'floating',
  elasticity: 'high',
};

/**
 * Clamps a tab index to valid bounds [0, totalTabs - 1].
 */
export function clampTabIndex(index: number, totalTabs: number): number {
  if (totalTabs <= 0) return 0;
  return Math.max(0, Math.min(totalTabs - 1, Math.round(index)));
}

/**
 * Calculates the destination tab index based on user drag distance and fling velocity (power).
 * If the user gives higher "power" (velocityX), momentum will carry the indicator across
 * multiple buttons (e.g. from Home straight to Menu, Offers, or Profile).
 *
 * @param currentIndex Currently active tab index (0-indexed)
 * @param dragDeltaX Distance in pixels the user dragged horizontally
 * @param velocityX Fling velocity in pixels per second
 * @param tabWidth Pixel width allocated to each tab item
 * @param totalTabs Total count of tabs in the navigation bar
 * @param powerMultiplier User-configured physics power sensitivity
 */
export function calculateVelocityTargetIndex(
  currentIndex: number,
  dragDeltaX: number,
  velocityX: number,
  tabWidth: number,
  totalTabs: number,
  powerMultiplier: number = 1.0
): number {
  if (tabWidth <= 0 || totalTabs <= 0) return currentIndex;

  // Direct position displacement (how many tab slots moved by finger)
  const distanceShift = dragDeltaX / tabWidth;

  // Momentum velocity impulse (power supplied by user swipe)
  // Higher powerMultiplier or stronger velocity flings further across tabs
  const momentumShift = (velocityX * powerMultiplier) / 350;

  const totalShift = distanceShift + momentumShift;
  const rawTargetIndex = Math.round(currentIndex + totalShift);

  return clampTabIndex(rawTargetIndex, totalTabs);
}

/**
 * Calculates liquid stretch deformation (squash & stretch) for HyperOS 3 liquid glass physics.
 * Preserves visual mass: as the circle stretches along the movement vector (scaleX),
 * it squashes perpendicularly (scaleY), with slight fluid skew.
 */
export function calculateLiquidStretch(
  dragDeltaX: number,
  velocityX: number = 0
): { scaleX: number; scaleY: number; skewX: number } {
  const absDelta = Math.abs(dragDeltaX);
  const absVelocity = Math.abs(velocityX);

  // Stretch along X axis proportional to drag distance and fling velocity
  const stretchFactor = Math.min(0.48, absDelta / 200 + absVelocity / 1600);
  const scaleX = Number((1 + stretchFactor).toFixed(3));

  // Squash along Y axis to maintain fluid volume illusion
  const scaleY = Number((1 / Math.sqrt(scaleX)).toFixed(3));

  // Dynamic fluid skew tilt based on directional force
  const rawSkew = (dragDeltaX / 10) + (velocityX / 220);
  const skewX = Number(Math.max(-10, Math.min(10, rawSkew)).toFixed(2));

  return { scaleX, scaleY, skewX };
}

/**
 * Visual styling preset for the Xiaomi HyperOS 3 Liquid Glass indicator.
 */
export function getLiquidGlassPresetStyles(preset: LiquidGlassPreset = 'hyperos-liquid'): {
  pillBg: string;
  pillBorder: string;
  pillShadow: string;
  dotColor: string;
  labelActiveColor: string;
  iconActiveColor: string;
  name: string;
  description: string;
} {
  return {
    pillBg:
      'bg-gradient-to-b from-white via-white/95 to-[#FFF8EF]/95 backdrop-blur-2xl',
    pillBorder: 'border-white/90 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]',
    pillShadow: 'shadow-xl shadow-black/10 ring-1 ring-black/5',
    dotColor: 'bg-[#C90024]',
    labelActiveColor: 'text-[#C90024]',
    iconActiveColor: 'text-[#C90024]',
    name: 'Xiaomi HyperOS 3 Liquid Glass',
    description: 'Translucent frosted white glass with dynamic fluid surface',
  };
}
