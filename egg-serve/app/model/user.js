module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema(
    {
      mobile: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      salt: { type: String, required: true },
      username: { type: String, required: true },
      plateNumber: { type: String },
      driverLicense: { type: String },
      img: { type: String },
      avatar: {
        type: String,
        default:
          'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'
      },
      extra: { type: mongoose.Schema.Types.Mixed }
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    }
  );
  return mongoose.model('User', UserSchema);
};
