import shows from "./db.json" assert { type: "json" };

let globalId = 4;

const handlerFunctions = {
  sayHello: (req, res) => {
    res.send({
      message: "Hello there",
    });
  },

  getAllShows: (req, res) => {
    res.send({
      message: "Here are all the shows",
      allShows: shows,
    });
  },

  addShow: (req, res) => {
    const showName = req.body.showName;
    const showPic = req.body.showPic;

    const newShow = {
      id: globalId,
      name: showName,
      picture: showPic,
      vote: 0,
    };

    shows.push(newShow);
    globalId++;

    res.send({
      message: "Here's your new show",
      allShows: shows,
    });
  },

  updateShow: (req, res) => {
    const showId = req.params.id;
    const voteType = req.body.voteType;

    const showIdx = shows.findIndex((show) => {
      return (show.id = +showId);
    });
    if (voteType === "upvote") {
      shows[showIdx].vote += 1;
    } else if (voteType === "downvote") {
      shows[showIdx].vote -= 1;
    }

    res.send({
      message: "Vote count updated",
      allShows: shows,
    });
  },

  deleteShow: (req, res) => {
    const showId = req.params.id;

    for (let i = 0; i < shows.length; i++) {
      if (shows[i].id === +showId) {
        shows.splice(i, 1);
        break;
      }
    }
    res.send({
      message: "Show deleted",
      allShows: shows,
    });
  },
};

export default handlerFunctions;
