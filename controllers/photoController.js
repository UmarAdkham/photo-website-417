const pool = require("../config/db");
const jwt = require("jsonwebtoken");

exports.addPhoto = async (req, res) => {
  try {
    const { userId } = req.body;
    const filepath = req.file.path;
    const result = await pool.query(
      "INSERT INTO photos (filepath, userId) VALUES ($1, $2) RETURNING *",
      [filepath, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const { userId } = req.query;

    const result = await pool.query(
      ` SELECT photos.id, filepath, firstname, lastname, COUNT(photoId) as likeCount,
        EXISTS (SELECT * from likes WHERE userId = $1 and photoId = photos.id) as isLiked
        FROM photos
        LEFT JOIN likes ON likes.photoId = photos.id
        INNER JOIN users ON photos.userId = users.id
        GROUP BY photos.id, users.id`,
      [userId]
    );

    const photos = result.rows.map(photo => {
      return {...photo, url: 'https://photo-website-417-s8hs.onrender.com/' + photo.filepath}
    })
    
    res.status(200).json(photos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
};

exports.myPhotos = async (req, res) => {
  try {
    const { userId } = req.params;
    const resultUser = await pool.query(
      "SELECT * FROM photos WHERE userId = $1",
      [userId]
    );
    const photos = resultUser.rows.map(photo => {
      return {...photo, url: 'https://photo-website-417-s8hs.onrender.com/' + photo.filepath}
    })
    
    res.status(200).json(photos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("delete from photos where id = $1", [id]);
    res.status(200).json({
      message: "Rasm o'chirildi",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Girgittonimizda nomaqbul hato yuz berdi",
    });
  }
};
