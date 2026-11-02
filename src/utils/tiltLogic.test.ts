import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTilt, getResetTilt } from './tiltLogic.ts';

const mockRect = {
  left: 100,
  top: 100,
  width: 300,
  height: 200,
};

test('calculateTilt returns neutral angles at card center', () => {
  const result = calculateTilt(250, 200, mockRect, 15);
  assert.equal(result.rotateX, 0);
  assert.equal(result.rotateY, 0);
  assert.equal(result.glareX, 50);
  assert.equal(result.glareY, 50);
});

test('calculateTilt calculates corner rotation properly within maxAngle', () => {
  const result = calculateTilt(400, 300, mockRect, 14); // bottom right
  assert.equal(result.rotateX, -14);
  assert.equal(result.rotateY, 14);
  assert.equal(result.glareX, 100);
  assert.equal(result.glareY, 100);
});

test('calculateTilt clamps out of bound cursor positions safely', () => {
  const result = calculateTilt(900, 900, mockRect, 10);
  assert.equal(result.rotateX, -10);
  assert.equal(result.rotateY, 10);
});

test('getResetTilt returns zero rotations and resets glare opacity', () => {
  const reset = getResetTilt();
  assert.equal(reset.rotateX, 0);
  assert.equal(reset.rotateY, 0);
  assert.equal(reset.glareOpacity, 0);
});
