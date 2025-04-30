import bcrypt from "bcrypt";

const password = "user123";

bcrypt.hash(password, 10).then((hash) => {
  console.log("Hash:", hash);
});
