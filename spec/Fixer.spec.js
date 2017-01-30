'use strict';

describe('Fixer', () => {
  let Fixer;

  beforeEach(() => {
    Fixer = require('../lib/Fixer');
  });

  describe('contructor', () => {
    it('assigns opts.baseUrl to the instance', () => {
      const fakeUrl = 'google.com';
      const instance = new Fixer({ baseUrl: fakeUrl });
      expect(instance.baseUrl).toBe(fakeUrl);
    });

    it('assigns default baseUrl if none provided', () => {
      const instance = new Fixer();
      expect(instance.baseUrl).toBe('http://api.fixer.io');
    });
  });

  describe('instance methods', () => {
    let fixer;

    beforeEach(() => {
      fixer = new Fixer();
    });

    describe('#request', () => {
      it('throws not implemented error', () => {
        expect(fixer.request).toThrowError(/not implemented/);
      });
    });

    describe('#latest', () => {
      const fakeRequestResult = new Promise(() => {});

      beforeEach(() => {
        spyOn(fixer, 'request').and.returnValue(fakeRequestResult);
      });

      it('calls #request with /latest and `base` & `symbols` parameters', () => {
        const fakeOpts = {
          base: 'USD',
          symbols: 'ANY',
          nonexistent: {}
        };

        const res = fixer.latest(fakeOpts);

        expect(fixer.request).toHaveBeenCalledWith('/latest', {
          base: fakeOpts.base,
          symbols: fakeOpts.symbols
        });
      });

      it('returns result #request returns', () => {
        expect(fixer.latest()).toBe(fakeRequestResult);
      });
    });
  });
});