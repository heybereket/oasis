import parse from '.';

describe('parser', () => {
  it('works', () => {
    console.log('XYZ!!');

    const res = parse('Hello World!');

    expect(res).toEqual('Hello World!');
  });
});
