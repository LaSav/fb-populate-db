const admin = require('firebase-admin')

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const populateFirestore = async () => {
  try {
    // Add a single user
    const usersCollection = db.collection('users')
    const userData = {
      email: 'example@example.com',
      username: 'exampleUser',
    }
    const userRef = await usersCollection.add(userData)
    const userId = userRef.id
    console.log('User added:', { ...userData, id: userId })

    // Add a single post
    const postsCollection = db.collection('posts')
    const postData = {
      author: userData.username,
      authorId: userId,
      commentCount: 1,
      content: '<p>This is a sample post content.</p>',
      createdAt: admin.firestore.Timestamp.now(),
      slug: 'sample-post',
      title: 'Sample Post Title',
      topic: 'Sample Topic',
      updatedAt: admin.firestore.Timestamp.now(),
    }
    const postRef = await postsCollection.add(postData)
    const postId = postRef.id
    console.log('Post added:', { ...postData, id: postId })

    // Add a single comment to the post
    const commentsCollection = postRef.collection('comments')
    const commentData = {
      author: userData.username,
      authorId: userId,
      createdAt: admin.firestore.Timestamp.now(),
      text: '<p>This is a sample comment.</p>',
    }
    const commentRef = await commentsCollection.add(commentData)
    console.log('Comment added:', { ...commentData, id: commentRef.id })

    console.log('Firestore populated with a single user, post, and comment.')
  } catch (error) {
    console.error('Error populating Firestore:', error)
  }
}

populateFirestore().then(() => process.exit(0))
