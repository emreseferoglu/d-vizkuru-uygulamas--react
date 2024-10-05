import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  Container,
  FormControl,
  FormSelect,
  Form,
  Col,
  Row,
} from "react-bootstrap";

import { useState } from "react";
import axios from "axios";

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_TOKEN = "fca_live_vlQ1ffy8L9W55dG8b35NbvRZrZ5ofmUDO3qwH8bX";

function Currency() {
  // 4 yapınında state si tanımlancak
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD"); //Defaul value
  const [toCurrency, setToCurrency] = useState("TRY"); //Defaul value
  const [result, setResult] = useState(0);

  const exChange = async () => {
    // API BAGLANTISINI VE API_KEY  VERİP BİR İSTEK ATIYORUZ
    // base_currency KEY'NE HANGİ PARA BİRİMİNDEN ÇEVİRMEK İSTEDİGİMİZ STATE KOYUYORUZ
    // GELCEK OLAN DATANIN İÇİNDEKİ 2.KISIMDA SEÇİLEN PARA BİRİMİNE ÇARPIYORUZ VE BUNU TO FİXED KULLANARAK 2 Basamaklı olcagını söyledik

    const response = await axios.get(
      `${BASE_URL}?apikey=${API_TOKEN}&base_currency=${fromCurrency}`
    );
    const result = (response.data.data[toCurrency] * amount).toFixed(2);
    setResult(result);
  };

  return (
    <>
      <Container>
        <div className="text-center">
          <h3 className="display-5 text-white">Döviz Kuru Uygulaması</h3>
        </div>
      </Container>
      <Container className="d-flex align-items-center justify-content-center form-container">
        <Row className="justify-content-center satır">
          <Col lg={12} sm={12} md={12}>
            <Form className="d-flex column-gap-3 justify-content-between">
              <FormControl
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="FormControl"
                type="text"
                required
              />
              <FormSelect
                onChange={(e) => setFromCurrency(e.target.value)}
                className="FormControl"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>TRY</option>
                <option>JPY</option>
              </FormSelect>

              <FormSelect
                onChange={(e) => setToCurrency(e.target.value)}
                className="FormControl"
              >
                <option>TRY</option>
                <option>USD</option>
                <option>EUR</option>
                <option>JPY</option>
              </FormSelect>
              <FormControl value={result} className="FormControl" type="text" />
            </Form>
            <div className="d-flex justify-content-center column-gap-4 align-items-center">
              <i className="bi bi-arrow-right-circle "></i>
              <div className="d-flex justify-content-end">
                <button
                  onClick={exChange}
                  className="btn btn-success fs-5 py-2 px-3"
                >
                  Çevir
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Currency;
