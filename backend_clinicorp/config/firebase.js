const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "test-clinicorp",
  private_key_id: "23178c7da6559c36a897b60838844fc9dfc68259",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRu0Y7D9f6tUqx\n/eBLWhsjgi7LCLtJ7/N31m0TQT+eVd3rqluVheODNjgSLLYQtQHoP4wkW0URJq8g\nKZ/Bjro0XO8ot+2HHDeoQWyVJ06BJK/WfLO2Iske3Q6YjJJ98R29ftexYl24qc8S\nJ/6XZD6ccZjzKIEcPxZOUh09s/OdM4CUB/E4H6doOcARy+x7+QScRXlU2Oo3edEL\npJvXFFWsSdMAOpc4e+0+aSvyhGapQHQJkMwpgI4LdNUT4CjStuIm2VBjt1iyVptU\nX0Od1Z9YKxAZE1tw9pjLWNCiCpafVT7X/zq8R+erM3rZVETO+RenG1RYbJoLuTVm\nk/vslFPHAgMBAAECggEAASNaY4LK/75zGvMo1UMLnNsD9coG1zhfWfOgS0zjTx+u\nwwqF2hrlysti5JLjeNXN0a3JADL42+AROyY3NTdhfijqizBBY67fFT9KLEChUZgn\nIy+5+2Tfh6fHXmXRauM05xMtKsvA9BwlYyYRi3D3pq2c3Sn/EimrNfOollzlhkwD\n1Awd2YdMyxTHieaQjKazIzyGbtBkbMAsJJv6xn0HHfzpvnnZYVtL0u0TcgJvNxjh\nNUyIcQq2jvAnIrKv8fpWhkujqoFb5/sYprGJ37/Hl+fGsxd2xI8u/YNxjyPVey0v\nBrtcvm9vE02hR86AcoJTvSWxGP6rnBqRaEUluhccvQKBgQD5AIofE8qnldpIb0gt\n+s54NNQlNVgdyWnZuxMW7l7khRvHsTkIcQHWD47pL/1Sb+9i5J6OJHvYcupXtIpG\nFGIP2nRGB882NXURqb3dhJ8enjozFO3ubyRORQcCjw5FDvPe/Ftwec1tK79mzpso\nW0RH7QEIzpyh6a2VRyCzuNEZJQKBgQDXoDNLmElxL8GRTK7ZxnOe2p7L+P9XyNYk\nrY5Kexk1TH5zmQLD09O/uuj3VLG5TxuH4r01bHHD7o3YD1g0wjTh94b5BtPNiq0c\nNbYhMcTVRUa8q6G/b7RVfhChhxnptQuv6tANyFx0EIWVCQhBRq/DE4JT+FrxjZT2\npP1fvOmTewKBgA1czwy95ik6LH2ooyn8hKoEw8G/bBwlG+4YUPzxC9ydnBEKXLIs\nRlnzecrfzWtoIGOhOzULli3WdOcCBE2geGa7ZXQApUkWc1LgVhUWMefVu+/T1rTt\n9/fPUoH7pVtlYwb7afjOQIz0RRBCVCdFRpPJjz2mwNcbkDormACtEWOVAoGBAJ24\n/wxyrnXumsZvsw51DSnLfJBy6EQMEifuE8EDXiMQewaPi+g2UBNU4wfXmdCUvuyc\nvA4R7v2Ex5idUMX2sLwBVWdeyRr2Lz4NQ9XwE6x06hMj8EKZsO1AM2YT7q520b+y\nINGUF5yGYU/stW8aB4LICHLnnY5HJAluEjAvfSN1AoGAEOSm9zPXb9Krz9u0WFX7\nJxEAI/D8P31Ny9SiU2US8c5CSFHj6WlUc8Zgb8otKCaYqwboKE3THm3QlRuObvSO\nQAHZxur2XfNhRFvcwpHkpsC6Q2XQzLYi3b449TrFY1Xm/q4tNcQdGVU7WoNxbRVt\nQVpJeOqxnSj9mGYNVoWnjdI=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-s0naf@test-clinicorp.iam.gserviceaccount.com",
  client_id: "114884128214603991445",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s0naf%40test-clinicorp.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { db };
