/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  clampTabIndex,
  calculateVelocityTargetIndex,
  calculateLiquidStretch,
  getLiquidGlassPresetStyles,
  DEFAULT_DOCK_SETTINGS,
} from './liquidNavPhysics.ts';

describe('liquidNavPhysics', () => {
  it('clampTabIndex bounds index safely within [0, totalTabs - 1]', () => {
    assert.strictEqual(clampTabIndex(-3, 5), 0);
    assert.strictEqual(clampTabIndex(2.4, 5), 2);
    assert.strictEqual(clampTabIndex(2.7, 5), 3);
    assert.strictEqual(clampTabIndex(99, 5), 4);
    assert.strictEqual(clampTabIndex(0, 0), 0);
  });

  it('calculateVelocityTargetIndex stays put when drag and velocity are zero', () => {
    const target = calculateVelocityTargetIndex(0, 0, 0, 70, 5, 1.0);
    assert.strictEqual(target, 0);
  });

  it('calculateVelocityTargetIndex moves exactly 1 tab when dragged by 1 tab width with low velocity', () => {
    // Current: 0 (Home), Tab width: 70px, Drag: +72px (Menu), Velocity: 0
    const target = calculateVelocityTargetIndex(0, 72, 0, 70, 5, 1.0);
    assert.strictEqual(target, 1);
  });

  it('calculateVelocityTargetIndex leaps across multiple tabs when user gives high flick power / velocity', () => {
    // Current: 0 (Home), Dragged +35px (halfway to Menu), but swiped with high velocity 1200px/s
    // Velocity impulse: (1200 * 1.0) / 400 = +3.0 tabs!
    // Total shift: 0.5 + 3.0 = 3.5 -> rounds to 4 (Profile)
    const target = calculateVelocityTargetIndex(0, 35, 1200, 70, 5, 1.0);
    assert.strictEqual(target, 4);
  });

  it('calculateVelocityTargetIndex responds to higher powerMultiplier sensitivity', () => {
    // With 0.5x power multiplier:
    const lowPower = calculateVelocityTargetIndex(0, 20, 600, 70, 5, 0.5);
    // 20/70 ~ 0.28, (600 * 0.5)/400 = 0.75 -> total ~ 1.03 -> target 1

    // With 2.0x power multiplier:
    const highPower = calculateVelocityTargetIndex(0, 20, 600, 70, 5, 2.0);
    // 20/70 ~ 0.28, (600 * 2.0)/400 = 3.0 -> total ~ 3.28 -> target 3

    assert.strictEqual(lowPower, 1);
    assert.strictEqual(highPower, 3);
  });

  it('calculateVelocityTargetIndex clamps cleanly when flinging beyond boundaries', () => {
    // Flinging left past 0
    const flingLeft = calculateVelocityTargetIndex(1, -200, -2500, 70, 5, 1.0);
    assert.strictEqual(flingLeft, 0);

    // Flinging right past 4
    const flingRight = calculateVelocityTargetIndex(3, 300, 3000, 70, 5, 1.0);
    assert.strictEqual(flingRight, 4);
  });

  it('calculateLiquidStretch produces viscous squash and stretch volume preservation', () => {
    const atRest = calculateLiquidStretch(0, 0);
    assert.strictEqual(atRest.scaleX, 1);
    assert.strictEqual(atRest.scaleY, 1);
    assert.strictEqual(atRest.skewX, 0);

    const stretched = calculateLiquidStretch(80, 500);
    assert.ok(stretched.scaleX > 1.2, 'scaleX should expand along drag vector');
    assert.ok(stretched.scaleY < 0.95, 'scaleY should squash perpendicularly');
    assert.ok(stretched.skewX > 0, 'skewX should tilt with directional pull');
  });

  it('getLiquidGlassPresetStyles provides valid HyperOS 3 preset styles', () => {
    const style = getLiquidGlassPresetStyles('hyperos-liquid');
    assert.strictEqual(style.name, 'Xiaomi HyperOS 3 Liquid Glass');
    assert.ok(style.pillBg.includes('backdrop-blur'));
    assert.ok(style.pillBorder.includes('border-white'));
    assert.ok(style.dotColor.includes('#C90024'));
  });
});
