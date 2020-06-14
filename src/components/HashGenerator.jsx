import React, { createRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Collapse from 'react-bootstrap/Collapse';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Crypto from '../Crypto.js';
import bcrypt from 'bcryptjs';

class HashGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      output: '', 
      copied: false, 
      password: '', 
      showPassword: true,
      showAdvanced: false,
      randomKey: 'houdini',
      staticKey: 'Y(02.>\'H}t":E1',
      cost: 12
    };

    this.buttonRef = createRef();
    this.outputRef = createRef();

    this.updateTimeout = null;
  }

  handleChangePassword(e) {
    const password = e.target.value;
    this.setState({
      password: password
    }, this.generatePassword.bind(this));
  }

  handleChangeRandomKey(e) {
    const randomKey = e.target.value;
    this.setState({
      randomKey: randomKey
    }, this.generatePassword.bind(this));
  }

  handleChangeStaticKey(e) {
    const staticKey = e.target.value;
    this.setState({
      staticKey: staticKey
    }, this.generatePassword.bind(this));
  }

  handleChangeCost(e) {
    const cost = parseInt(e.target.value);
    this.setState({
      cost: cost
    }, this.generatePassword.bind(this));
  }

  generatePassword() {
    if(!this.state.password) {
      this.setState({output: '', password: ''});
    } else {
      this.setState({output: '🤔'});
      clearTimeout(this.updateTimeout);
      
      this.updateTimeout = setTimeout(() => {
        const loginHash = Crypto.getLoginHash(
          this.state.password, 
          this.state.randomKey, 
          this.state.staticKey
        );
  
        bcrypt.hash(loginHash, this.state.cost).then((hash) => {
          this.setState({
            output: hash
          });
        });
      }, 500);
    }
  }

  copyClipboard() {
    navigator.clipboard.writeText(this.outputRef.current.value).then(() => {
      this.setState({copied: true});
    });
  }

  render() {
    return(
      <Form>
        <Form.Group controlId="hashGeneratorInput">
          <Form.Control 
            type={this.state.showPassword ? 'text' : 'password'} 
            placeholder="Password" 
            onChange={this.handleChangePassword.bind(this)}
          />

          <Form.Text className="text-muted">
            Passwords entered here are <strong>not</strong> sent to a remote server.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="hashGeneratorShowPassword">
          <Form.Check 
            custom
            type="checkbox" 
            label="Show password" 
            checked={this.state.showPassword} 
            onChange={(e) => this.setState({showPassword: e.target.checked})}
          />
        </Form.Group>

        <Form.Group controlId="hashGeneratorShowAdvanced">
          <Form.Check 
            custom
            type="checkbox" 
            label="Show advanced"
            onChange={(e) => this.setState({showAdvanced: e.target.checked})}
          />
        </Form.Group>

        <Collapse in={this.state.showAdvanced}>
          <div>
            <Form.Group as={Row} controlId="hashGeneratorRndk">
              <Form.Label column sm={3}>Random Key</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type='text'
                  placeholder="Random key substitute"
                  value={this.state.randomKey}
                  onChange={this.handleChangeRandomKey.bind(this)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="hashGeneratorStatic">
              <Form.Label column sm={3}>Static Key</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type='text'
                  placeholder="Static key"
                  value={this.state.staticKey}
                  onChange={this.handleChangeStaticKey.bind(this)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="hashGeneratorCost">
              <Form.Label column sm={3}>bcrypt Cost</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type='number'
                  value={this.state.cost}
                  onChange={this.handleChangeCost.bind(this)}
                  min='1'
                  max='15'
                />
              </Col>
            </Form.Group>
          </div>
        </Collapse>

        <InputGroup>
          <Form.Control 
            ref={this.outputRef} 
            type='text' 
            placeholder='Hash' 
            value={this.state.output}
            readOnly
          />

          <InputGroup.Append>
            <Button ref={this.buttonRef} 
              variant='outline-secondary' 
              onClick={this.copyClipboard.bind(this)} 
              onMouseOut={() => this.setState({copied: false})}
            >
              Copy
            </Button>

            <Overlay 
              target={this.buttonRef.current} 
              show={this.state.copied} 
              placement='top'
            >
              {(props) => (
                <Tooltip id='copied-tooltip' {...props}>
                  Copied!
                </Tooltip>
              )}
            </Overlay>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default HashGenerator;