
import { ObjectId } from 'mongodb';

export interface Recipe {
  _id?: ObjectId;
  id?: string;
  title: string;
  description: string | null;
  image_url: string | null;
  cooking_time: number | null;
  category: string | null;
  instructions: string;
  user_id: string;
  created_at: Date;
  difficulty: string | null;
}

export interface Ingredient {
  _id?: ObjectId;
  id?: string;
  name: string;
  amount: string;
  unit: string | null;
  recipe_id: string;
}

export interface User {
  _id?: ObjectId;
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  created_at: Date;
}

export interface Comment {
  _id?: ObjectId;
  id?: string;
  content: string;
  recipe_id: string;
  user_id: string;
  created_at: Date;
}

export interface Like {
  _id?: ObjectId;
  recipe_id: string;
  user_id: string;
  created_at: Date;
}
