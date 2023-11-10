import express from "express";
import { createUser } from "../controllers/UserController";

const router = express.Router()

router.get('/api/v1/register', createUser)