const mongoose = require('mongoose');

const doubtSchema = mongoose.Schema(
  {
    askedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A post must be posted by someone'],
    },
    boardId: {
      type: String,
      required: [true, 'Please provide a board Id for your post'],
    },
    classId: {
      type: String,
      required: [true, 'Please provide a class Id for your post'],
    },
    groupId: {
      type: String,
      required: [true, 'Please provide a group Id for your post'],
    },
    subjectId: {
      type: String,
      required: [true, 'Please provide a subject Id for your post'],
    },
    subjectName: {
      type: String,
      required: [true, 'Please provide a Subject Name for your post'],
    },
    doubt: {
      type: String,
      required: [true, 'Please provide the doubt'],
    },
    isUserOnline: {
      type: Boolean
    },
    userconnectionId: {
      type: String,
      required: [true, 'Please provide the connection ID'],
    },
    teacherConnectionId: {
      type: String,
      required: [true, 'Please provide the connection ID'],
    },
  },
  { timestamps: true }
);

// doubtSchema.post('save', async function () {
//   const post = await Post.findById(this.post);
//   post.answerCount = await this.model('Answer').countDocuments({
//     post: this.post,
//   });
//   post.save();
// });

// doubtSchema.pre(/^find/, function (next) {
//   // populating postedBy
//   this.populate({ path: 'postedBy' });
//   // this.populate({ path: 'post' });
//   next();
// });
// doubtSchema.pre(
//   'deleteOne',
//   { document: true, query: false },
//   async function (next) {
//     const post = await Post.findById(this.post);
//     post.answerCount -= 1;
//     next();
//   }
// );

// initializing and exporting Answer model
const Doubt = mongoose.models.Doubt || mongoose.model('Doubt', doubtSchema);

module.exports = Doubt;
