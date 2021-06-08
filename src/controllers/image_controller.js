/* eslint-disable import/prefer-default-export */
import Image from '../models/image_model';

export const createImage = async (url) => {
  const image = new Image();
  image.url = url;
  try {
    const savedImage = await image.save();
    return savedImage;
  } catch (error) {
    throw new Error(`create image error: ${error}`);
  }
};

export const updateImage = async (id, url) => {
  try {
    const image = await Image.findOneAndUpdate({ _id: id }, { url }, { new: true });
    return image;
  } catch (error) {
    throw new Error(`update image error: ${error}`);
  }
};
