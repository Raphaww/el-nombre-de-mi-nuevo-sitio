import jwt from 'jsonwebtoken';

const isValidAccessToken = (accesToken) => {
   if (!accesToken || accesToken === 'undefined' || accesToken === null || accesToken === '') {
      return false;
   }

   let tokenDecoded = jwt.decode(accesToken);
   let expiredDate = new Date(tokenDecoded.exp * 1000);
   let validationDate = new Date();

   validationDate.setMinutes(validationDate.getMinutes() + 5);

   return validationDate.getTime() < expiredDate.getTime();
};

export default { isValidAccessToken };
