
import {TruncatePipe} from './truncate.pipe';

describe('TruncatePipe', () => {

  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('transforms "123 456 789" to "123 456…"', () => {
    expect(pipe.transform('123 456 789', ['7', '...'])).toEqual('123 456...');
  });

  it('leaves empty string unchanged', () => {
    expect(pipe.transform('', ['', '...'])).toEqual('');
  });
  it('leaves "12" unchanged', () => {
    expect(pipe.transform('12', ['', '...'])).toEqual('12');
  });
});
