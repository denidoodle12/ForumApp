import { describe, expect, it } from 'vitest';

describe('CI evidence', () => {
  it('should demonstrate a failing automation test check', () => {
    expect(true).toBe(false);
  });
});
