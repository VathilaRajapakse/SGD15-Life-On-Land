const express = require("express");
const router = express.Router();

const {
  createRating,
  findDetailByID,
  updateByID,
  getRatingDetails,
} = require("../services/rating_service");

router.post("/rating/save", (req, res) => {
  const data = req.body;
  console.log(data);
  if (!data.blogID || !data.blogName || !data.rating) {
    res.status(404).send({ message: "Blog id, Blog name, rating required!" });
    //next(ApiErrors.notFound("Tain id, name, rating and review required!"));
    return;
  }
  const response1 = findDetailByID(data.blogID);
  response1
    .then((detail) => {
      if (detail.length == 0) {
        addNewRate(data);
      } else {
        updateRate(data);
      }
    })
    .catch((err) => {
      res.status(404).send({ message: "Service unavailable" });
    });

  const addNewRate = (data) => {
    const response = createRating(data);
    response
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Service unavailable" });
          return;
        }
        res.status(200).send({ message: "Rating saved successfully!" });
      })
      .catch((err) => {
        res.status(404).send({ message: "Service unavailable" });
      });
  };

  const updateRate = (data) => {
    const response = updateByID(data);
    response
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Service unavailable" });
          return;
        }
        res.status(200).send({ message: "Rating saved successfully!" });
      })
      .catch((err) => {
        res.status(404).send({ message: "Service unavailable" });
      });
  };
});

router.get("/rating/details/:id", (req, res) => {
  const id = req.params.id  
  const response = getRatingDetails(id);
  response
    .then((data) => {
      const avg = getRating(data);
      res.status(200).send({ data: avg });
    })
    .catch((err) => {
      res.status(404).send({ message: "Service unavailable" });
    });

  const getRating = (data) => {
    let a = 0;
    let b = 0;
    let tot = 0;
    let array = [];
    let average = 0;

    while (a < data.length) {
      while (b < data[a].rating.length) {
        tot = tot + data[a].rating[b].rating;
        b++;
      }
      average = tot / data[a].rating.length;
      let tid = data[a].blogID;
      let tName = data[a].blogName;
      array[a] = { blogName: tName, blogID: tid, avg: average.toFixed(1) };
      average = 0;
      tot = 0;
      b = 0;
      a++;
    }
    return array;
  };
});

module.exports = router;
