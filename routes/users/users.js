const users = async (req, res, admin) => {
  const db = admin.firestore();
  const usersRef = db.collection('users');

  const docs = await usersRef.get();

  if(!docs) {
    res.json({
      message: 'something went wrong. Please try again later'
    });
  }

  if(docs.empty) {
    res.json({
      message: 'There are no users'
    });
  } else {
    let data = [];

    docs.forEach(doc => {
      data.push(doc.data());
    });

    res.json(data);
  }
};

module.exports = users;