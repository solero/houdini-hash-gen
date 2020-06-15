import React, {useState} from 'react';

import Collapse from 'react-bootstrap/Collapse';
import Prism from 'prismjs';

const codeExample = `
import bcrypt from 'bcryptjs';
import md5 from 'md5';

function encryptPassword(password, digest=true) {
  if(digest) {
    password = md5(password);
  }

  let swappedHash = password.slice(16, 32)
  swappedHash += password.slice(0, 16);
  return swappedHash;
}

function getLoginHash(password, rndk) {
  let key = encryptPassword(password, false);
  key += rndk;
  key += 'Y(02.>\\'H}t":E1';

  const loginHash = encryptPassword(key);

  return loginHash;
}

const passwordToCompare = 'abc';
const hashToCompare = '$2a$12$o...HCO8IZiS';

let loginHash = md5(passwordToCompare).toUpperCase();
loginHash = getLoginHash(
  loginHash, 
  'houdini'
);

bcrypt.compare(loginHash, hashToCompare)
  .then((hashMatch) => {
    console.log('Match result = ' + hashMatch);
});
`.trim()


class ComparisonLearnMore extends React.Component {

  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }

  render() {
    return (
      <div className='mt-3'>
        <a href='#' onClick={() => this.setState({open: !this.state.open})}>Want to know how this works?</a>
        <Collapse in={this.state.open}>
          <div id="comparisonCodeExample">
            The password hash comparison process starts the same as hash generation. 
            First the workaround is applied for dealing with what the Club Penguin 
            client sends to the server, then a standardized bcrypt compare call is 
            invoked to check if the password is correct.
            <pre>
              <code className="language-js">
                {codeExample}
              </code>
            </pre>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default ComparisonLearnMore;