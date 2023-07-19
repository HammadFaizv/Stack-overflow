/* Add data only once */
// User.insertMany(users);
// Post.insertMany(posts);

//         userId: { type: String, required: true },
//         desc: { type: String },
//         likes: { type: [String], default: [] },
//         imageUrl: { type: String },
//         videoUrl: { type: String }, 

const posts = [
    
    {
        userId: "6491ca8fc00fe371bf29446b",
        name: 'Manoj Kumar',
        desc: "This is a code that I wrote while in train",
        likes: [],
        imageUrl: 'https://imageio.forbes.com/blogs-images/forbestechcouncil/files/2019/01/canva-photo-editor-8-7.png?format=png&width=1200',
    },
    {
        userId: "123",
        name: "Romio",
        desc: "The world of AI is evolving...!!!",
        likes: [],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWbqm_Px5A3wFEABLUwVYQMhOQpY04juKxZQ&usqp=CAU', 
    },
    {
        userId: "64949317cac3c4f5739ad9c0",
        name: 'Fake Man',
        desc: "Code is bugging but so am I",
        likes: [],
        imageUrl: 'https://i.ytimg.com/vi/v9XyIGXcRck/hqdefault.jpg'
    }
]

export default posts;