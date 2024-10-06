import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "./config/db.js";
import User from "./Models/User.model.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateScore = async (description, materials) => {
  const prompt = `You're a bot whose great at decipehring an estimated ESG score out of 100 from the description and materials of the given amazon listing.
  
  Examples:
  1). Based on the description: 
  Ready made: set of 2 NICETOWN Blackout Curtain Panels per package. Each panel measures 42 inches wide by 63 inches long, the total width is 84 inches for one pair. Each panel has 6 silver grommets top for easy hang and slide.
  Blackout function: curtains can block most light and UV rays (curtain in darker colours has better blackout effects). Easily match with your living room/bedroom, perfect for night shift workers and snooze lovers.
  Better technology: thanks to the innovative triple weave technology, these window panels are excellent in heat insulation, temperature balance, energy saving and noise reduction. It is a better choice for your window replacement.
  About fabric: made from upmarket material, through the eco-friendly production process, the fabric is soft to touch and safe to people, even babies. Thread trimmed and wrinkle-free, same fabric and colour on both sides.
  Easy care: NICETOWN blackout curtain panels are durable and easy to care for. Machine washable in cold water(<86℉), tumble dry. Quick ironing or steam clean when needed. Contact NICETOWN for any product problem.
  and the materials: Polyester generate an ESG score out of 100 for this Amazon listing.

  Output: 72
  
  2). Based on the description: 
  The first hyaluronic serum to visibly replump, boost hydration and glow! Intensely hydrated and suppler skin in one use
  [3%] HYDRATING COMPLEX WITH GLYCERIN + HYALURONIC ACID + ALOE PURE HYALURONIC ACID: Obtained by biofermentation, this ingredient is known for holding up to 1000x its weight in water.
  ORGANIC ALOE VERA: Well-known for its refreshing and super-quenching effects, this organic ingredient intensely hydrates skin.
  Approved by Cruelty Free International and Vegan Formula. Dermatologist tested and ophthalmologist tested for safety, suitable for sensitive skin.
  and the materials: AQUA / WATER • PENTYLENE GLYCOL • GLYCERIN • PEG/PPG/POLYBUTYLENE GLYCOL-8/5/3 GLYCERIN • METHYL GLUCETH-20 • BUTYLENE GLYCOL • ALOE BARBADENSIS LEAF JUICE POWDER • PEG-60 HYDROGENATED CASTOR OIL • CARBOMER • SODIUM HYALURONATE • SODIUM HYDROXIDE • CAPRYLYL GLYCOL • BIOSACCHARIDE GUM-1 • MALTODEXTRIN • PARFUM / FRAGRANCE (F.I.L. B278147/1).

  Output: 70

  -------

  Based on the description: ${description} and the materials: ${materials} listed on an Amazon listing - kindly calculate an estimated ESG score out of 100 that will help educate the user on how sustainable that product and the company is.
  Kindly only giving me the ESG score out of 100 without any other information.

  Output:  
  `;

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Failed to generate ESG score");
  }
};

const classify = async (materials) => {
  const prompt = `You're a bot that's great at classifying ingredients/materials into sustainable/not sustainable based on the materials listed on the Amazon listing.
  Examples:

  1). Classify all the ingredients mentioned into sustainable/not sustainable based on the ingredients section on the Amazon listing:

  AQUA / WATER: Sustainable
  PENTYLENE GLYCOL: Not Sustainable
  GLYCERIN: Sustainable
  PEG/PPG/POLYBUTYLENE GLYCOL-8/5/3 
  GLYCERIN: Not Sustainable
  METHYL GLUCETH-20: Not Sustainable
  BUTYLENE GLYCOL: Not Sustainable
  ALOEBARBADENSIS LEAF JUICE POWDER: Sustainable
  PEG-60 HYDROGENATED CASTOR OIL: Not Sustainable
  CARBOMER: Not Sustainable
  SODIUM HYALURONATE: Sustainable
  SODIUM HYDROXIDE: Not Sustainable
  CAPRYLYL GLYCOL: Not Sustainable
  BIOSACCHARIDE GUM-1: Sustainable
  MALTODEXTRIN: Sustainable
  PARFUM / FRAGRANCE: Not Sustainable (varies)

  ------

  2). Classify all the ingredients mentioned into sustainable/not sustainable based on the ingredients section on the Amazon listing:

  100% Nylon: Not Sustainable

  -------

  Classify all the ingredients mentioned: ${materials} into sustainable/not sustainable based on the ingredients section on the Amazon listing.
  Kindly keep it in the same format as above examples.
  Please do not add any other introdcutory statements or concluding statements.
  `;
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Failed to generate ESG score");
  }
};

// Route to handle incoming requests for ESG score generation
app.post("/api/generate", async (req, res) => {
  const { description, materials } = req.body;
  const { id } = req.query;
  try {
    const score = await generateScore(description, materials);
    const classification = await classify(materials);
    let productClassification = "";
    if (score > 70) {
      productClassification = "Sustainable";
    } else {
      productClassification = "Not Sustainable";
    }
    try {
      const user = await User.findById(id);
      console.log(score);
      user.esgScores.push(score);
      console.log(user);
      await user.save();
    } catch (error) {
      console.error("Error:", error);
    }
    res.status(200).json({ score, classification, productClassification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  console.log(req.body); // Log to check request body
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      _id: user._id,
      username: user.username,
      esgScores: user.esgScores,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const user = new User({ username, password });

    await user.save();
    console.log("User saved successfully");
    res.status(200).json({ message: "User created successfully", username });
  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).json("Invalid entry");
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
