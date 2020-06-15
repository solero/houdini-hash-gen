import React from 'react';
import Form from 'react-bootstrap/Form';
import Crypto from '../Crypto.js';
import bcrypt from 'bcryptjs';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import md5 from 'md5';

class HashCheck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hashMatch: false,
      processing: false,
      showPassword: true, 
      password: '', 
      hash: '',
      randomKey: 'houdini',
      staticKey: 'Y(02.>\'H}t":E1',
    };

    this.updateTimeout = null;
  }

  handleChangePassword(e) {
    const password = e.target.value;
    this.setState({
      password: password
    }, this.checkMatch.bind(this));
  }

  handleChangeHash(e) {
    const hash = e.target.value;
    this.setState({
      hash: hash
    }, this.checkMatch.bind(this));
  }

  handleChangeRandomKey(e) {
    const randomKey = e.target.value;
    this.setState({
      randomKey: randomKey
    }, this.checkMatch.bind(this));
  }

  handleChangeStaticKey(e) {
    const staticKey = e.target.value;
    this.setState({
      staticKey: staticKey
    }, this.checkMatch.bind(this));
  }

  checkMatch() {
    let loginHash = md5(this.state.password).toUpperCase();
    loginHash = Crypto.getLoginHash(
      loginHash, 
      this.state.randomKey, 
      this.state.staticKey
    );

    this.setState({processing: true});

    clearTimeout(this.updateTimeout);

    this.updateTimeout = setTimeout(() => {
      bcrypt.compare(loginHash, this.state.hash).then((hashMatch) => {
        this.setState({
          hashMatch: hashMatch,
          processing: false
        });
      });
    }, 500);
  }

  render() {
    let matchPrompt;
    if(this.state.password && this.state.hash) {
      if(this.state.processing) {
        matchPrompt = (
          <Alert variant='info' className='text-center'>
            <Spinner animation="border" size="sm" />
          </Alert>
        );
      } else if(this.state.hashMatch) {
        matchPrompt = (
          <Alert variant='success' className='text-center'>
            We have a match! 💪
          </Alert>
        );
      } else {
        matchPrompt = (
          <Alert variant='danger' className='text-center'>
            No match!
          </Alert>
        );
      }
    }

    return(
      <div>
        <Form>
          <Form.Group controlId="hashCheckPassword">
            <Form.Control 
              type={this.state.showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              onChange={this.handleChangePassword.bind(this)}
            />
          </Form.Group>

          <Form.Group controlId="hashCheckHash">
            <Form.Control 
              type={this.state.showPassword ? 'text' : 'password'} 
              placeholder="Hash" 
              onChange={this.handleChangeHash.bind(this)}
            />

            <Form.Text className="text-muted">
              Password hashes entered here are <strong>not</strong> sent to a remote server.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="hashCheckShowPassword">
            <Form.Check 
              custom
              type="checkbox" 
              label="Show password/hash" 
              checked={this.state.showPassword} 
              onChange={(e) => this.setState({showPassword: e.target.checked})}
            />
          </Form.Group>

          <Form.Group controlId="hashCheckAdvanced">
            <Form.Check 
              custom
              type="checkbox" 
              label="Show advanced"
              onChange={(e) => this.setState({showAdvanced: e.target.checked})}
            />
          </Form.Group>

          <Collapse in={this.state.showAdvanced}>
            <div>
              <Form.Group as={Row} controlId="hashCheckRndk">
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

              <Form.Group as={Row} controlId="hashCheckStatic">
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
            </div>
          </Collapse>
        </Form>
        {matchPrompt}
      </div>
    );
  }
}

export default HashCheck;