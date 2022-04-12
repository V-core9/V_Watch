

const vCache = require('../../src/vCache');

test("vCache.size() = 0", async () => {
  expect(await vCache.size()).toBe(0);
});

test("await vCache.get('test')", async () => {
  expect(await vCache.get('test')).toBe(false);
});

test("await vCache.set('test', 11)", async () => {
  expect(await vCache.set('test', 11)).toBe(11);
});

test("await vCache.get('test')", async () => {
  expect(await vCache.get('test')).toBe(11);
});
