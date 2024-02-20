const mockInit = (app) => {
  app.get('/web.php/dub/DubList', (req, res) => {
    res.json({
      "errno": 0,
      "message": "",
      "data": {
        "count": 10,
        "list": [
          {
            "dub_id": 1,
            "dub_name": "解说小帅",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV411_streaming.mp3"
          },
          {
            "dub_id": 2,
            "dub_name": "甜宠少御",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV113_streaming.mp3"
          },
          {
            "dub_id": 3,
            "dub_name": "古风少御",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV115_streaming.mp3"
          },
          {
            "dub_id": 4,
            "dub_name": "通用赘婿",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV119_streaming.mp3"
          },
          {
            "dub_id": 5,
            "dub_name": "擎苍",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV701_streaming.mp3"
          },
          {
            "dub_id": 6,
            "dub_name": "灿灿",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV700_streaming.mp3"
          },
          {
            "dub_id": 7,
            "dub_name": "通用男声",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV002_streaming.mp3"
          },
          {
            "dub_id": 8,
            "dub_name": "通用女声",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV001_streaming.mp3"
          },
          {
            "dub_id": 9,
            "dub_name": "儒雅青年",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV102_streaming.mp3"
          },
          {
            "dub_id": 10,
            "dub_name": "阳光男声",
            "url": "https://api.chaojiyuyan.com/upload/dub/BV056_streaming.mp3"
          }
        ]
      }
    });
  });
}

module.exports = mockInit