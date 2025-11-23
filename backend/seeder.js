const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./src/models/Product");
const connectDB = require("./src/config/db");

const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

connectDB();

const products = [
  {
    name: "Sourdough Bread",
    image:
      "https://images.unsplash.com/photo-1585476263060-6556643e8e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description:
      "Freshly baked sourdough bread with a crispy crust and soft interior.",
    category: "Bread",
    price: 5.99,
    countInStock: 10,
  },
  {
    name: "Croissant",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description:
      "Buttery, flaky croissant made with traditional French techniques.",
    category: "Pastry",
    price: 3.5,
    countInStock: 15,
  },
  {
    name: "Chocolate Chip Cookie",
    image:
      "https://images.unsplash.com/photo-1499636138143-bd630f5cf386?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description:
      "Chewy chocolate chip cookie loaded with premium chocolate chunks.",
    category: "Cookies",
    price: 2.0,
    countInStock: 20,
  },
  {
    name: "Baguette",
    image:
      "https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Classic French baguette with a golden crust.",
    category: "Bread",
    price: 4.0,
    countInStock: 12,
  },
  {
    name: "Blueberry Muffin",
    image:
      "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Moist muffin bursting with fresh blueberries.",
    category: "Pastry",
    price: 3.0,
    countInStock: 8,
  },
  {
    name: "Cinnamon Roll",
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Warm cinnamon roll topped with cream cheese icing.",
    category: "Pastry",
    price: 4.5,
    countInStock: 10,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
