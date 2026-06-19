import fs from 'fs';
import Item from '../models/itemmodel.js';
import imagekit from '../config/imagekit.js';


// export const addItem = async (req, res) => {
//     try {
//         const { title, description, category, mode, price, condition } = req.body;
        
//         // Validate required fields
//         if (!title || !description || !category || !mode) {
//             return res.status(400).json({ message: 'Missing required fields' });
//         }

//         let uploadedImages = [];

//         // Upload image to ImageKit if provided
//         if (req.file) {
//             try {
//                 const fileBuffer = fs.readFileSync(req.file.path);
//                 const base64 = fileBuffer.toString('base64');
                
//                 console.log('ImageKit instance:', typeof imagekit);
//                 console.log('Upload method:', typeof imagekit.upload);
                
//                 const response = await imagekit.upload({
//                     file: base64,
//                     fileName: req.file.originalname,
//                     folder: "/items",
//                 });

//                 const optimizedImageUrl = imagekit.url({
//                     path: response.filePath,
//                     transformation: [
//                         { width: "1280" },
//                         { quality: "auto" },
//                         { format: "webp" },
//                     ],
//                 });

//                 uploadedImages = [optimizedImageUrl];
                
//                 // Clean up temp file
//                 fs.unlinkSync(req.file.path);
//             } catch (imageError) {
//                 console.error('ImageKit error:', imageError.message);
//                 // For now, just store the temp file path if ImageKit fails
//                 uploadedImages = [req.file.path];
//             }
//         }

//         const newItem = new Item({
//             userId: req.userId, 
//             title,
//             description,
//             category,
//             mode,
//             price: price || 0,
//             condition: condition || 'New',
//             images: uploadedImages
//         });

//         await newItem.save();
//         res.status(201).json({ success: true, data: newItem, message: 'Item added successfully' });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

export const addItem = async (req, res) => {
    try {
        const { title, description, category, mode, price, condition } = req.body;
        
        // Validate required fields
        if (!title || !description || !category || !mode) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // let uploadedImages = [];
        if (!req.file) {
    return res.status(400).json({
        success: false,
        message: "Image is required"
    });
}

const imageFile = req.file;
      


        // Upload image to ImageKit if provided
           const fileBuffer = fs.readFileSync(imageFile.path)
          const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/items'
           })
          
           // optimization through imagekit
          var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {width :'1280'},
                {quality :'auto'},
                {format : 'webp'}
            ]
          });

    //   const image = optimizedImageUrl;

        const newItem = new Item({
            userId: req.userId, 
            title,
            description,
            category,
            mode,
            price: price || 0,
            condition: condition || 'New',
            images:  [optimizedImageUrl]
        });

        await newItem.save();
        res.status(201).json({ success: true, data: newItem, message: 'Item added successfully' });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

