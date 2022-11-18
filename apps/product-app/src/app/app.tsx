import React, { useEffect, useState } from 'react';
// import { Message } from '../../../../../product-checkout-assigment/api-interfaces';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { listSeedProducts, Product } from '@product-checkout-assigment/product-lib';
import { ProductCard, ShoppingCart, RoleOption } from '../components';
import './app.css'



export const App = () => {
  useEffect(() => {
  }, [])

  return (
    <>
      <Container fluid className="paddingBottomMobile">
        <Row>
          <Col className='py-5' md={8} xs={12} sm={12}>
            <Row className='gapMobile'>
              { 
                listSeedProducts.map((item, i) => (
                  <Col key={i} lg={4} md={12}><ProductCard data={item} /></Col>
                ))
              }
            </Row>
          </Col>
          <Col md={4} sm={12} >
              <input type="checkbox" id="IdOpenCartMobile" hidden className='openCartMobile' />
              <div className="sidebar">
                <label htmlFor="IdOpenCartMobile" className='buttonCloseModal'>
                    x
                </label>
                  <RoleOption />
                  <ShoppingCart />
              </div>
          </Col>
        </Row>

        <label className="buttonOpenCart" htmlFor='IdOpenCartMobile'>
              Cart
        </label>
      </Container>
    </>
  );
};

export default App;
