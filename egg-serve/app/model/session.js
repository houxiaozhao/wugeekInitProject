module.exports = app => {
  const mongoose = app.mongoose;
  const SessionSchema = new mongoose.Schema(
    {
      sessionKey: { type: String, required: true },
      readerid: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader' }
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    }
  );
  return mongoose.model('Session', SessionSchema);
};
