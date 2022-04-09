const costumlog = (type, path, method, errmsg) => {
  if (type == "err") console.log(`\t\t[!] Error happened while: ${errmsg}`);

  if (type == "endpoint")
    console.log(`\t\t[*] ${method} method was called on '/${path}' `);
};

module.exports = costumlog;
