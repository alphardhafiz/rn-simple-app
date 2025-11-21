export const generateJwt = (email: string): string => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({ 
    email: email, 
    exp: Date.now() + 3600000
  })).toString('base64');
  
  return `${header}.${payload}.FAKE_SIGNATURE`;
};