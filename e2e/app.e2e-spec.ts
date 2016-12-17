import { JomaPage } from './app.po';

describe('joma App', function() {
  let page: JomaPage;

  beforeEach(() => {
    page = new JomaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
