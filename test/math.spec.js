import { daiAvailable } from '../src/math';
import { USD, MMCR } from '../src';

test('daiAvailable', () => {
  expect(daiAvailable(USD(10), USD(5), 1)).toEqual(MMCR(5));
});

test('daiAvailable handles undercollateralized values', () => {
  expect(daiAvailable(USD(10), USD(5), 2.1)).toEqual(MMCR(0));
});
