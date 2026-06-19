import fs from 'fs';
import imagekit from '../config/imagekit.js';
import WantedModel from "../models/wantedmodel.js";



// export const createWanted = async (req, res) => {
//   try {
//     const wanted = new WantedModel({
//       ...req.body,
//       userId: req.userId,
//       image: req.file?.path || "",
//     });

//     await wanted.save();

//     res.status(201).json({
//       success: true,
//       wanted,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const createWanted = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);

      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: req.file.originalname,
        folder: "/wanted",
      });

      imageUrl = response.url;

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    const wanted = new WantedModel({
      ...req.body,
      userId: req.userId,
      image: imageUrl,
    });

    await wanted.save();

    res.status(201).json({
      success: true,
      wanted,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWantedPosts = async (req, res) => {
  try {
    const posts = await WantedModel.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWantedById = async (req, res) => {
  try {
    const post = await WantedModel.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};