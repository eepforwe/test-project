import crypto from 'crypto';

export default (value) => {
  const secret = 'supersha512key';
  const hash = crypto.createHmac('sha512', secret);
  hash.update(value);
  return hash.digest('hex');
};
