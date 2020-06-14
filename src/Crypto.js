import md5 from 'md5';

class Crypto {
  
  static encryptPassword(password, digest=true) {
    if(digest) {
      password = md5(password);
    }

    const swappedHash = password.slice(16, 32) + password.slice(0, 16);
    return swappedHash;
  }

  static getLoginHash(password, rndk, staticKey='Y(02.>\'H}t":E1') {
    let key = Crypto.encryptPassword(password, false);
    key += rndk;
    key += staticKey;

    const loginHash = Crypto.encryptPassword(key);

    return loginHash;
  }

}

export default Crypto;