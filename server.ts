import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()

// Define the type for a menu item
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

// In-memory array to store menu items (replace with database in production)
let menuItems: MenuItem[] = [];

// API Endpoint to Add Menu Item
app.post('/api/menu', (req: Request, res: Response) => {
  const { name, description, price, category, imageUrl } = req.body;

  // Validate input data
  if (!name || !description || typeof price !== 'number' || !category || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required and price must be a number' });
  }

  // Create a new menu item object
  const newMenuItem: MenuItem = {
    id: menuItems.length + 1, // Auto-increment the ID
    name,
    description,
    price,
    category,
    imageUrl,
  };

  // Add the new item to the in-memory array
  menuItems.push(newMenuItem);

  // Send the newly added item as a response
  return res.status(201).json(newMenuItem);
});

// API Endpoint to Get All Menu Items
app.get('/api/menu', (_req: Request, res: Response) => {
  if (menuItems.length === 0) {
    return res.status(404).json({ message: 'No menu items found' });
  }
  return res.status(200).json(menuItems);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
