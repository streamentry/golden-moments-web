import test from 'node:test';
import assert from 'node:assert/strict';
import { makeBoard } from '../public/scripts/match-engine.js';

test('the preview uses exactly two matching pairs', () => {
  assert.throws(() => makeBoard(['cup', 'cup', 'cup', 'flower']), TypeError);
  assert.throws(() => makeBoard(['cup', 'flower']), TypeError);
  const board = makeBoard(['cup', 'flower', 'flower', 'cup']);
  assert.deepEqual(board.snapshot(), { chosen: [], matched: [], complete: false });
});

test('a pair stays visible and a completed game is never scored', () => {
  const board = makeBoard(['cup', 'flower', 'flower', 'cup']);
  assert.equal(board.tap(0), 'first');
  assert.equal(board.tap(3), 'pair');
  assert.deepEqual(board.snapshot().matched, [0, 3]);
  assert.equal(board.tap(0), 'ignored');
  assert.equal(board.tap(1), 'first');
  assert.equal(board.tap(2), 'complete');
  assert.equal(board.snapshot().complete, true);
  assert.equal(board.snapshot().matched.length, 4);
});

test('mismatches wait for another deliberate tap, without a timer', () => {
  const board = makeBoard(['cup', 'flower', 'flower', 'cup']);
  assert.equal(board.tap(0), 'first');
  assert.equal(board.tap(1), 'different');
  assert.deepEqual(board.snapshot().chosen, [0, 1]);
  assert.equal(board.tap(2), 'first');
  assert.deepEqual(board.snapshot().chosen, [2]);
});

test('restart does not retain cards or user data', () => {
  const board = makeBoard(['cup', 'flower', 'flower', 'cup']);
  board.tap(0);
  board.tap(3);
  assert.equal(board.reset(), 'reset');
  assert.deepEqual(board.snapshot(), { chosen: [], matched: [], complete: false });
  assert.equal(board.tap(-1), 'ignored');
});
