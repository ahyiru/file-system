const {copyfile, movefile, mkdir, touch, readfile, readdir, rmfile, rnfile} = require('../fs');

const startServer = app => {
  app.get('/fs/readdir', async (req, res) => {
    const {path} = req.query;
    try {
      const result = await readdir(path);
      res.status(200).send({result});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  });
  app.get('/fs/readfile', async (req, res) => {
    const {path, filename} = req.query;
    try {
      const result = await readfile(path, filename);
      res.status(200).send({result});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  });
  app.get('/fs/mkdir', async (req, res) => {
    const {path, override} = req.query;
    try {
      await mkdir(path, override);
      res.status(200).send({message: '操作成功！'});
    } catch (error) {
      res.status(500).send({error});
    }
  });
  app.get('/fs/touch', async (req, res) => {
    const {path, override} = req.query;
    try {
      await touch(path, override);
      res.status(200).send({message: '操作成功！'});
    } catch (error) {
      res.status(500).send({error});
    }
  });
  app.get('/fs/copyfile', async (req, res) => {
    const {src, dst} = req.query;
    try {
      await copyfile(src, dst);
      res.status(200).send({message: '操作成功！'});
    } catch (error) {
      res.status(500).send({error});
    }
  });
  app.get('/fs/movefile', async (req, res) => {
    const {src, dst} = req.query;
    try {
      await movefile(src, dst);
      res.status(200).send({message: '操作成功！'});
    } catch (error) {
      res.status(500).send({error});
    }
  });
  app.get('/fs/rmfile', async (req, res) => {
    const {path} = req.query;
    try {
      await rmfile(path);
      res.status(200).send({message: '操作成功！'});
    } catch (error) {
      res.status(500).send({error});
    }
  });
  app.get('/fs/rnfile', async (req, res) => {
    const {path, newpath} = req.query;
    try {
      await rnfile(path, newpath);
      res.status(200).send({message: '操作成功！'});
    } catch (error) {
      res.status(500).send({error});
    }
  });
};

module.exports = startServer;
