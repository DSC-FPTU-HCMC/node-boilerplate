const axios = require('axios');
const { logger } = rootRequire('/externals/logger/');

// TODO: intergrate with Google Analytics
const trackEvent = (category, action, label, value) => {
  const data = {
    // API Version.
    v: '1',
    // Tracking ID / Property ID.
    tid: process.env.GA_TRACKING_ID,
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: '555',
    // Event hit type.
    t: 'event',
    // Event category.
    ec: category,
    // Event action.
    ea: action,
    // Event label.
    el: label,
    // Event value.
    ev: value,
  };

  return axios.get('http://www.google-analytics.com/debug/collect', { params: data });
};

module.exports = async (req, res, next) => {
  // Event value must be numeric.
  try {
    await trackEvent(
      'Example category',
      'Example action',
      'Example label',
      '100'
    );
    res.status(200).send('Event tracked.').end();
    next();
  } catch (error) {
    logger.error(error.message);
  }
}