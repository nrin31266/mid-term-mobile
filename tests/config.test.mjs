import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('authored source does not commit literal Google API keys', async () => {
  const paths = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    { encoding: 'utf8' }).split('\0').filter((path) =>
    /^(src|server|scripts|tests)\//.test(path) && /\.(m?[jt]sx?|json)$/.test(path));
  for (const path of paths) {
    const content = await readFile(path, 'utf8');
    assert.equal(/AIza[0-9A-Za-z_-]{35}/.test(content), false, `Literal API key: ${path}`);
  }
});
