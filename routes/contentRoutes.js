const express = require('express');
const router = express.Router();
const Content = require('../models/contentModel');

// Route to handle saving/updating content
router.post('/content', async (req, res) => {
  try {
    const {
      heroTitle,
      heroNavitems,
      heroButtonText,
      heroTextColor,
      contentTextHeader,
      contentText,
      contentButtonOne,
      contentButtonTwo,
      contentImageOne,
      contentImageTwo,
      contentImageThree,
      contentScheduleText,
      contentScheduleImage,
      contentScheduleDate,
    } = req.body;

    // Find existing content document or create a new one if not found
    let existingContent = await Content.findOne();

    if (!existingContent) {
      existingContent = new Content({
        heroTitle,
        heroNavitems,
        heroButtonText,
        heroTextColor,
        contentTextHeader,
        contentText,
        contentButtonOne,
        contentButtonTwo,
        contentImageOne,
        contentImageTwo,
        contentImageThree,
        contentScheduleText,
        contentScheduleImage,
        contentScheduleDate,
      });
    } else {
      existingContent.heroTitle = heroTitle;
      existingContent.heroNavitems = heroNavitems;
      existingContent.heroButtonText = heroButtonText;
      existingContent.heroTextColor = heroTextColor;
      existingContent.contentTextHeader = contentTextHeader;
      existingContent.contentText = contentText;
      existingContent.contentButtonOne = contentButtonOne;
      existingContent.contentButtonTwo = contentButtonTwo;
      existingContent.contentImageOne = contentImageOne;
      existingContent.contentImageTwo = contentImageTwo;
      existingContent.contentImageThree = contentImageThree;
      existingContent.contentScheduleText = contentScheduleText;
      existingContent.contentScheduleImage = contentScheduleImage;
      existingContent.contentScheduleDate = contentScheduleDate;
    }

    await existingContent.save();
    res.json({ message: 'Content saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save content.' });
  }
});

// Route to get current content
router.get('/content', async (req, res) => {
  try {
    const existingContent = await Content.findOne();
    res.json(existingContent || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content.' });
  }
});

module.exports = router;
