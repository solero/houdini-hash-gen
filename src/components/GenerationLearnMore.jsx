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
  let swappedHash += password.slice(0, 16);
  return swappedHash;
}

function getLoginHash(password, rndk) {
  let key = encryptPassword(password, false);
  key += rndk;
  key += 'Y(02.>\\'H}t":E1';

  const loginHash = encryptPassword(key);

  return loginHash;
}

const passwordToHash = 'abc';
const loginHash = getLoginHash(
  passwordToHash, 
  'houdini'
);

bcrypt.hash(loginHash, 12).then((hash) => {
  console.log('Hash = ' + hash);
});
`.trim()


class GenerationLearnMore extends React.Component {

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
        <a href='#' onClick={() => this.setState({open: !this.state.open})}>Want to know how this hash is generated?</a>
        <Collapse in={this.state.open}>
          <div id="generationCodeExample">
            The final step in generating a hash is bcrypt, this means you get 
            all of the security benefits bcrypt provides. However, you will 
            find that generating a normal bcrypt hash from a plaintext password 
            will result in invalid comparison. This is because a few steps are 
            performed first so that the server can work around the flash Club 
            Penguin client outdated and insecure hashing algorithm. 
            <br/><br/>
            In order to generate the right hash, first 
            &nbsp;<code className="language-js">getLoginHash</code> must be called on 
            the plaintext password and the result of this is then passed into 
            bcrypt hash.
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

export default GenerationLearnMore;