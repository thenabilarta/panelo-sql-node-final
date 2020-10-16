const connection = require('./connection');

const orm = {
  selectAll: function (cb) {
    connection.query('SELECT * FROM dataproduk', function (err, data) {
      if (err) cb(err, null);
      cb(null, data);
    });
  },

  selectOne: function (id, cb) {
    connection.query(`SELECT * FROM dataproduk WHERE id = ${id}`, function (
      err,
      data
    ) {
      if (err) cb(err, null);
      cb(null, data);
    });
  },

  insertOne: function (nama, harga, gambar, cb) {
    const sqlQuery = `INSERT INTO dataproduk (id, product_id, product_name, product_price, product_image) VALUES ('', '', '${nama}', '${harga}', '${gambar}')`;
    connection.query(sqlQuery, function (err, data) {
      if (err) cb(err, null);
      cb(null, data);
    });
  },

  updateOne: function (id, nama, harga, gambar, cb) {
    const sqlQuery = `UPDATE dataproduk SET product_name = "${nama}", product_price = "${harga}", product_image = "${gambar}" WHERE id = ${id}`;
    connection.query(sqlQuery, function (err, data) {
      if (err) cb(err, null);
      cb(null, data);
    });
  },

  deleteOne: function (id, cb) {
    const sqlQuery = `DELETE FROM dataproduk WHERE id = ${id}`;
    connection.query(sqlQuery, function (err, data) {
      if (err) cb(err, null);
      cb(null, data);
    });
  },
};

module.exports = orm;
