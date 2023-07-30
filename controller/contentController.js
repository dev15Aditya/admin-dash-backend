const { Request, Response } = require('express');
const Content = require('../models/contentModel');

exports.updateContent = async (req, res) => {
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

  try {
    const content = await Content.findOne();

    if (content) {
      content.heroTitle = heroTitle;
      content.heroNavitems = heroNavitems;
      content.heroButtonText = heroButtonText;
      content.heroTextColor = heroTextColor;
      content.contentTextHeader = contentTextHeader;
      content.contentText = contentText;
      content.contentButtonOne = contentButtonOne;
      content.contentButtonTwo = contentButtonTwo;
      content.contentImageOne = contentImageOne;
      content.contentImageTwo = contentImageTwo;
      content.contentImageThree = contentImageThree;
      content.contentScheduleText = contentScheduleText;
      content.contentScheduleImage = contentScheduleImage;
      content.contentScheduleDate = contentScheduleDate;

      await content.save();
    } else {
      await Content.create({
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
    }
    res.json({
      message: 'Content updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating content',
    });
  }
};

exports.getContent = async (req, res) => {
  try {
    const content = await Content.findOne();

    if (!content) {
      res.status(404).json({
        message: 'Content not found',
      });
      return;
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting content',
    });
  }
};
