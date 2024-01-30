const express = require('express');

const app = express();

// this linen need to add for geeting Body Request in Post request
app.use(express.json());

// simple requests
app.get('/', (req, response) => {
  console.log(req);
  response.status(200).send('hellon from server side');
});

app.post('/', (req, res) => {
  res.json({ mesasg: 'dasdasda', data: 'dasdasdaa' });
});
//--------Router functions----------------------------------------------------------------
const getAllTours = (req, res) => {
  res.json({ mesasg: 'it a message from tour', data: 'data is here ' });
};
const getuser = (req, res) => {
  const ids = req.params.id * 1;
  res.json({
    mesasg: 'it a message from user',
    data: `data is here ${ids}`
  });
};
const routeAdd = (req, res) => {
  console.log(req.body);
  res.json({
    mesasg: 'it a message from router',
    data: `data is here ${req.body.data}`
  });
};
const checkID = (req, res, next, val) => {
  if (req.params.id * 1 > 4) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};
//--------------- Router 1
//middleware
const bodyCheck = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};
const router = express.Router();

app.use('/tours', router);
router
  .route('/')
  .get(getAllTours)
  .post(bodyCheck, routeAdd);

//--------------- Router 2

const router2 = express.Router();
//middleware
app.use('/users', router2);
router2.param('id', checkID);

router2.route('/:id').get(getuser);

//------------------------------------------------------

app.listen(7000, () => {
  console.log('app runinng');
});
