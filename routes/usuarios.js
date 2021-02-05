const { Router } = require('express');
const { ObjectId } = require('mongodb');
const router = Router();
const connection = require('../db');


router.get('/', async (req, res) => {
    const db = await connection();
    await db
      .collection('chatgeek')
      .find()
      .toArray(function (err, chatgeek) {
        res.json(chatgeek);
      });
  });

router.post('/', async (req, res) => {
    const db = await connection();
    const { usuario, foto,mensaje  } = req.body;
    db.collection('chatgeek').insertOne(
      {
        usuario,
        foto,
        chat_grupal:{
            chat:{
                mensaje,
            }
        }
      },
      function (err, info) {
        res.json(info.ops[0]);
      }
    );
  });

module.exports = router;
