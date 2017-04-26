import { APMCLIPage } from './app.po';

describe('apm-cli App', () => {
  let page: APMCLIPage;

  beforeEach(() => {
    page = new APMCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
