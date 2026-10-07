// ====== STORE SETTINGS (edit these) ======
const STORE = {
  name: "ShopNest",
  whatsapp: "919999999999", // your WhatsApp number with country code, no + or spaces
  currency: "₹"
};

// ====== PRODUCTS (add, remove or edit freely) ======
// emoji = used as the product picture. To use real photos, add  image: "images/phone.jpg"
const PRODUCTS = [
  { id: 1,  name: "Wireless Earbuds with Charging Case", category: "Electronics", price: 499,  mrp: 1999, rating: 4.3, reviews: 1284, emoji: "🎧", color: "#dbeafe" },
  { id: 2,  name: "Smart Fitness Band, Heart Rate Monitor", category: "Electronics", price: 799,  mrp: 2999, rating: 4.1, reviews: 842,  emoji: "⌚", color: "#e0e7ff" },
  { id: 3,  name: "20000mAh Fast Charging Power Bank",    category: "Electronics", price: 899,  mrp: 2499, rating: 4.4, reviews: 2210, emoji: "🔋", color: "#cffafe" },
  { id: 4,  name: "Bluetooth Speaker, Waterproof",        category: "Electronics", price: 649,  mrp: 1799, rating: 4.2, reviews: 976,  emoji: "🔊", color: "#e0f2fe" },
  { id: 5,  name: "Men's Cotton Round Neck T-Shirt",      category: "Fashion",     price: 199,  mrp: 799,  rating: 4.0, reviews: 3410, emoji: "👕", color: "#fee2e2" },
  { id: 6,  name: "Women's Printed Kurti",                category: "Fashion",     price: 349,  mrp: 1299, rating: 4.2, reviews: 1530, emoji: "👗", color: "#fce7f3" },
  { id: 7,  name: "Running Shoes, Lightweight",           category: "Fashion",     price: 599,  mrp: 2199, rating: 4.3, reviews: 1895, emoji: "👟", color: "#ffedd5" },
  { id: 8,  name: "Unisex Sunglasses, UV Protection",     category: "Fashion",     price: 149,  mrp: 699,  rating: 3.9, reviews: 654,  emoji: "🕶️", color: "#fef3c7" },
  { id: 9,  name: "Non-Stick Cookware Set (3 pcs)",       category: "Home",        price: 799,  mrp: 2499, rating: 4.4, reviews: 1120, emoji: "🍳", color: "#dcfce7" },
  { id: 10, name: "LED Desk Lamp, Rechargeable",          category: "Home",        price: 349,  mrp: 999,  rating: 4.2, reviews: 710,  emoji: "💡", color: "#fef9c3" },
  { id: 11, name: "Stainless Steel Water Bottle 1L",      category: "Home",        price: 229,  mrp: 699,  rating: 4.5, reviews: 2640, emoji: "🥤", color: "#d1fae5" },
  { id: 12, name: "Cotton Bedsheet with 2 Pillow Covers", category: "Home",        price: 449,  mrp: 1599, rating: 4.1, reviews: 930,  emoji: "🛏️", color: "#ede9fe" },
  { id: 13, name: "Vitamin C Face Serum 30ml",            category: "Beauty",      price: 249,  mrp: 899,  rating: 4.2, reviews: 1760, emoji: "🧴", color: "#ffe4e6" },
  { id: 14, name: "Herbal Hair Oil 200ml",                category: "Beauty",      price: 179,  mrp: 499,  rating: 4.3, reviews: 2095, emoji: "🌿", color: "#ecfccb" },
  { id: 15, name: "Kids Building Blocks (200 pcs)",       category: "Toys",        price: 299,  mrp: 999,  rating: 4.5, reviews: 1380, emoji: "🧩", color: "#fae8ff" },
  { id: 16, name: "Remote Control Car, Rechargeable",     category: "Toys",        price: 549,  mrp: 1899, rating: 4.0, reviews: 560,  emoji: "🚗", color: "#fee2e2" }
];
