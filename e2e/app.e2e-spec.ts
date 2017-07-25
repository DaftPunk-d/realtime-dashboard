import { DatadashboardPage } from './app.po';

describe('realtime App', () => {
  let page: DatadashboardPage;

  beforeEach(() => {
    page = new DatadashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
