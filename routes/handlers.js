const express = require('express');
const fs = require('fs');
const request = require('request');
const axios = require('axios');
const excel = require('exceljs');
const con = require('../config/connection');
const orm = require('../config/orm');
const router = express.Router();

router.get('/', (req, res) => {
  orm.selectAll(function (error, dataproduk) {
    res.render('index', { dataproduk });
  });
});

router.post('/add', (req, res) => {
  const nama = req.body.nama;
  const harga = req.body.harga;

  const file = req.files.gambar;
  const img_name = Date.now() + file.name;

  file.mv('./public/img/' + Date.now() + file.name, function (err) {
    if (err) return res.status(500).send(err);
    orm.insertOne(nama, harga, img_name, function (err, data) {
      if (err) {
        return res.status(401).json({
          message: 'Not able to edit produk',
        });
      }
      res.redirect('/');
    });
  });
});

router.get('/edit/:id', function (req, res) {
  const id = req.params.id;
  orm.selectOne(id, function (err, data) {
    res.render('edit', { data });
  });
});

router.post('/api/edit', (req, res) => {
  const nama = req.body.nama;
  const harga = req.body.harga;
  const id = req.body.id;

  const file = req.files.gambar;
  console.log(file);
  const img_name = file.name;

  file.mv('./public/img/' + file.name, function (err) {
    if (err) return res.status(500).send(err);
    orm.updateOne(id, nama, harga, img_name, function (error, result) {
      if (error) {
        return res.status(401).json({
          message: 'Not able to edit produk',
        });
      }
      res.redirect('/');
    });
  });
});

router.get('/delete/:id', function (req, res) {
  const id = req.params.id;
  orm.deleteOne(id, function (err, data) {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

// Fetch Data
const download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

router.get('/fetch', async (req, res) => {
  const data = await axios.get(
    'https://resto.technopresent.com/api/productlist/3'
  );
  const products = await data.data.products;

  for (var keys in products) {
    var product = products[keys].products;
    for (var key in product) {
      const uri = product[key].preview.content;
      const id = uri.split('/');
      const uriString = id.slice(-1)[0];

      download(
        'https:' + product[key].preview.content,
        './public/img/' + uriString,
        function () {
          console.log('done');
        }
      );

      const item = {
        'id': '',
        'product_id': product[key].id,
        'product_name': product[key].title,
        'product_price': product[key].price.price,
        'product_image': uriString,
      };

      con.query(
        "SELECT product_id FROM dataproduk WHERE product_id = '" +
          product[key].id +
          "'",
        function (error, result) {
          if (result.length === 0) {
            con.query('INSERT INTO dataproduk SET ?', item, function (
              error,
              result
            ) {
              (result) => res.redirect('/');
            });
          } else {
            res.redirect('/');
          }
        }
      );
    }
  }

  res.redirect('/');
});

router.get('/import', (req, res) => {
  con.query('SELECT * FROM dataproduk', function (err, produk, fields) {
    const jsonProduk = JSON.parse(JSON.stringify(produk));

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('Produk');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Product_id', key: 'product_id', width: 10 },
      { header: 'Product_name', key: 'product_name', width: 30 },
      {
        header: 'Product_price',
        key: 'product_price',
        width: 20,
      },
      { header: 'Product_image', key: 'product_image', width: 50 },
    ];

    worksheet.addRows(jsonProduk);

    workbook.xlsx.writeFile('produk.xlsx').then(function () {
      res.redirect('/');
    });
  });
});

module.exports = router;
