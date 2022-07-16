/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked menu restaurant', ({ I }) => {
  I.dontSeeElement('.restaurant-item');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.dontSeeElement('.restaurant-item');
  I.amOnPage('/');
  I.waitForElement('.restaurant-item');
  I.seeElement('.restaurant__name');

  const firstRestaurant = locate('.restaurant__name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
