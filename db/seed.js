// // inside db/seed.js
//To run node ./db/seed.js

// // grab our client with destructuring from the export in index.js
// const { client, getAllUsers, createUser, updateUser } = require('./index');


// // async function testDB() {
// //   try {
// //     console.log("Starting to test database...");

// //     const users = await getAllUsers();
// //     console.log("getAllUsers:", users);

// //     console.log("Finished database tests!");
// //   } catch (error) {
// //     console.error("Error testing database!");
// //     throw error;
// //   }
// // }

// async function testDB() {
//   try {
//     console.log("Starting to test database...");

//     console.log("Calling getAllUsers")
//     const users = await getAllUsers();
//     console.log("Result:", users);

//     console.log("Calling updateUser on users[0]")
//     const updateUserResult = await updateUser(users[0].id, {
//       name: "Newname Sogood",
//       location: "Lesterville, KY"
//     });
//     console.log("Result:", updateUserResult);

//     console.log("Finished database tests!");
//   } catch (error) {
//     console.error("Error testing database!");
//     throw error;
//   }
// }

// async function dropTables() {
//   try {
//     console.log("Starting to drop tables...");

//     // have to make sure to drop in correct order
//     await client.query(`
//       DROP TABLE IF EXISTS posts;
//       DROP TABLE IF EXISTS users;
//     `);

//     console.log("Finished dropping tables!");
//   } catch (error) {
//     console.error("Error dropping tables!");
//     throw error;
//   }
// }



// async function createTables() {
//   try {
//     console.log("Starting to build tables...");

//     await client.query(`
//       CREATE TABLE users (
//         id SERIAL PRIMARY KEY,
//         username varchar(255) UNIQUE NOT NULL,
//         password varchar(255) NOT NULL,
//         name varchar(255) NOT NULL,
//         location varchar(255) NOT NULL,
//         active boolean DEFAULT true
//       );
//       CREATE TABLE posts (
//         id SERIAL PRIMARY KEY,
//         "authorId" INTEGER REFERENCES users(id),
//         title varchar(255) NOT NULL,
//         content TEXT NOT NULL,
//         active BOOLEAN DEFAULT true
//       );
//     `);

//     console.log("Finished building tables!");
//   } catch (error) {
//     console.error("Error building tables!");
//     throw error;
//   }
// }

// // this function should call a query which drops all tables from our database
// async function dropTables() {
//   try {
//     await client.query(`
//       DROP TABLE IF EXISTS users;
//     `);
//   } catch (error) {
//     throw error; // we pass the error up to the function that calls dropTables
//   }
// }

// // this function should call a query which creates all tables for our database 
// async function createTables() {
//   try {
//     await client.query(`
//       CREATE TABLE users (
//         id SERIAL PRIMARY KEY,
//         username varchar(255) UNIQUE NOT NULL,
//         password varchar(255) NOT NULL,
//         name VARCHAR(255) NOT NULL,
//         location VARCHAR(255) NOT NULL,
//         active BOOLEAN DEFAULT true
//       );
//     `);
//   } catch (error) {
//     throw error;
//   }
// }




// // // new function, should attempt to create a few users
// // async function createInitialUsers() {
// //   try {
// //     console.log("Starting to create users...");

// //     const albert = await createUser({ username: 'albert', password: 'bertie99', name: "smallalbert", location:"sanjose" });
// //     const sandra = await createUser({ username: 'sandra', password: '2sandy4me', name: "smallsandra", location:"sanfrancisco"  });
// //     const glamgal = await createUser({ username: 'glamgal', password: 'soglam', name: "smallglamgal", location:"sunnyvale"});
// //     // const albertTwo = await createUser({ username: 'albert', password: 'imposter_albert' });

// //     console.log(albert);
// //     console.log(sandra);
// //     console.log(glamgal);

// //     console.log("Finished creating users!");
// //   } catch(error) {
// //     console.error("Error creating users!");
// //     throw error;
// //   }
// // }

// async function rebuildDB() {
//   try {
//     client.connect();

//     await dropTables();
//     await createTables();
//     await createInitialUsers();
//   } catch (error) {
//     throw error;
//   }
// }

// // async function updateUser(id, fields = {}) {
// //   // build the set string
// //   const setString = Object.keys(fields).map(
// //     (key, index) => `"${ key }"=$${ index + 1 }`
// //   ).join(', ');

// //   // return early if this is called without fields
// //   if (setString.length === 0) {
// //     return;
// //   }

// //   try {
// //     const result = await client.query(`
// //       UPDATE users
// //       SET ${ setString }
// //       WHERE id=${ id }
// //       RETURNING *;
// //     `, Object.values(fields));

// //     return result;
// //   } catch (error) {
// //     throw error;
// //   }
// // }

// rebuildDB();
// testDB();

// await client.query(`
//       CREATE TABLE users (
//         id SERIAL PRIMARY KEY,
//         username varchar(255) UNIQUE NOT NULL,
//         password varchar(255) NOT NULL,
//         name varchar(255) NOT NULL,
//         location varchar(255) NOT NULL,
//         active boolean DEFAULT true
//       );
//       CREATE TABLE posts (
//         id SERIAL PRIMARY KEY,
//         "authorId" INTEGER REFERENCES users(id),
//         title varchar(255) NOT NULL,
//         content TEXT NOT NULL,
//         active BOOLEAN DEFAULT true
//       );
//       CREATE TABLE tags (
//           id SERIAL PRIMARY KEY,
//           name VARCHAR(255) UNIQUE NOT NULL,
//       )
//       CREATE TABLE post_tags (
//         "postId" INTEGER REFERENCES posts(id),
//         "tagId" INTEGER REFERENCES tags(id),
//         UNIQUE ("postId", "tagId")
//       );
//     `);

const {  
  client,
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  createPost,
  updatePost,
  getAllPosts,
  getPostsByUser
} = require('./index');

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
      DROP TABLE IF EXISTS posts;
      DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        location varchar(255) NOT NULL,
        active boolean DEFAULT true
      );
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        "authorId" INTEGER REFERENCES users(id),
        title varchar(255) NOT NULL,
        content TEXT NOT NULL,
        active BOOLEAN DEFAULT true
      );
    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({ 
      username: 'albert', 
      password: 'bertie99',
      name: 'Al Bert',
      location: 'Sidney, Australia' 
    });
    await createUser({ 
      username: 'sandra', 
      password: '2sandy4me',
      name: 'Just Sandra',
      location: 'Ain\'t tellin\''
    });
    await createUser({ 
      username: 'glamgal',
      password: 'soglam',
      name: 'Joshua',
      location: 'Upper East Side'
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialPosts() {
  try {
    const [albert, sandra, glamgal] = await getAllUsers();

    console.log("Starting to create posts...");
    await createPost({
      authorId: albert.id,
      title: "First Post",
      content: "This is my first post. I hope I love writing blogs as much as I love writing them."
    });

    await createPost({
      authorId: sandra.id,
      title: "How does this work?",
      content: "Seriously, does this even do anything?"
    });

    await createPost({
      authorId: glamgal.id,
      title: "Living the Glam Life",
      content: "Do you even? I swear that half of you are posing."
    });
    console.log("Finished creating posts!");
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialPosts();
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);

    console.log("Calling updateUser on users[0]");
    const updateUserResult = await updateUser(users[0].id, {
      name: "Newname Sogood",
      location: "Lesterville, KY"
    });
    console.log("Result:", updateUserResult);

    console.log("Calling getAllPosts");
    const posts = await getAllPosts();
    console.log("Result:", posts);

    console.log("Calling updatePost on posts[0]");
    const updatePostResult = await updatePost(posts[0].id, {
      title: "New Title",
      content: "Updated Content"
    });
    console.log("Result:", updatePostResult);

    console.log("Calling getUserById with 1");
    const albert = await getUserById(1);
    console.log("Result:", albert);

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}


rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());