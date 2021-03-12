function save(name, value, days = 15) {
   let expires;

   if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
   }
   else {
      expires = '';
   }

   document.cookie = name + "=" + value + expires + ";path=/";
}

function load(name) {
   const nameEQ = `${name}=`;
   const ca = document.cookie.split(';');
   for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
   }
   return null;
}

function remove(name) {
   save(name, "", -1);
}

export default { save, load, remove };
