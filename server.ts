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

// API Endpoint to Get Menu Items by Category
app.get('/api/menu/category/:category', (req: Request, res: Response) => {
  const { category } = req.params; // Access category using the bracket notation

  // Filter items by category (case-insensitive)
  const filteredItems = menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase());

  if (filteredItems.length === 0) {
    return res.status(404).json({ message: `No items found in category: ${category}` });
  }

  return res.status(200).json(filteredItems);
});

// API Endpoint to Search Menu Items by Price Range
app.get('/api/menu/search', (req: Request, res: Response) => {
  const { minPrice, maxPrice } = req.query;

  // Convert query parameters to numbers and handle potential undefined values
  const min = parseFloat(minPrice as string);
  const max = parseFloat(maxPrice as string);

  // Validate price range
  if (isNaN(min) || isNaN(max)) {
    return res.status(400).json({ message: 'Both minPrice and maxPrice should be valid numbers' });
  }

  // Filter items based on the price range
  const filteredItems = menuItems.filter(item => item.price >= min && item.price <= max);

  if (filteredItems.length === 0) {
    return res.status(404).json({ message: 'No items found in this price range' });
  }

  // Send filtered items
  return res.status(200).json(filteredItems);
});

// Route to get items by category
app.get('/menu-items/category/:category', (req: Request, res: Response) => {
  const category = req.params['category']; // Access category using the bracket notation
  const filteredItems = menuItems.filter(item => item.category === category);
  res.json(filteredItems);
});

// Route to get items by category and price
app.get('/menu-items/category/:category/price', (req: Request, res: Response) => {
  const category = req.params['category']; // Access category using the bracket notation
  const maxPrice = parseFloat(req.query['maxPrice'] as string); // Fixed access to maxPrice
  const filteredItems = menuItems.filter(item => item.category === category && item.price <= maxPrice);
  res.json(filteredItems);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
