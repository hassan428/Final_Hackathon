const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    team_name: {
      type: String,
      required: true,
    },
    team_avatar_url: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_profiles",
      },
      { required: true },
    ],
    teamType: {
      type: String,
      enum: ["Private", "Public", "Secret"],
      default: "Private",
    },
  },
  {
    timestamps: true,
  }
);

teamSchema.path("members").validate(function (value) {
  return value.length > 1;
}, "The team must have at least one member.");
const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
