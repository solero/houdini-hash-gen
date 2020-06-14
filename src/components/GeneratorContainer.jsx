import React from 'react';

import HashGenerator from './HashGenerator.jsx';
import HashCheck from './HashCheck.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import GenerationLearnMore from './GenerationLearnMore.jsx';
import ComparisonLearnMore from './ComparisonLearnMore.jsx';

function GeneratorContainer() {
  return (
      <Container className='mt-5 mb-5'>
      <Row className='justify-content-md-center'>
        <Col lg={7}>
          <Card bg='light' className='mb-2'>
            <Card.Header>Houdini Password Hash Generator</Card.Header>
            <Card.Body>
              <Tabs defaultActiveKey="generate" id="uncontrolled-tab-example">
                <Tab eventKey='generate' title='Generate Hash'>
                  <br />
                  <HashGenerator />
                  <GenerationLearnMore />
                </Tab>
                <Tab eventKey='check' title='Comparison'>
                  <br />
                  <HashCheck />
                  <ComparisonLearnMore />
                </Tab>
              </Tabs>
            </Card.Body>
            <Card.Footer className="text-muted">
              Made with ❤️ by Ben &bull; <a href='https://github.com/ketnipz/houdini-hash-gen' target='_blank' rel='noreferrer'>View on GitHub</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GeneratorContainer;