import express from "express";
import axios from "axios";
import { transformUsers } from "../utils/transformer";
import { UsersResponse } from "../types";

const router = express.Router();

/**
 * GET /api/summary
 * Returns user data grouped by department
 */
router.get("/", async (_req, res) => {
  try {
    console.time('fetch-and-transform');

    // Fetch users from the API
    const response = await axios.get<UsersResponse>("https://dummyjson.com/users");

    // Transform the data
    const result = transformUsers(response.data.users);

    console.timeEnd('fetch-and-transform');

    res.json(result);
  } catch (err) {
    console.error('Error fetching or transforming users:', err);
    res.status(500).json({ error: "Failed to fetch or transform users" });
  }
});

export default router;
