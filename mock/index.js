const mockInit = (app) => {
  app.get('/api/user-info', (req, res) => {
    res.json({
      id: 1, username: 'mockUser'
    });
  });
}
// export default mockInit;

module.exports = mockInit