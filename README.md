# ShopNest – Online Store

A fast, mobile-friendly online shop that runs 100% free on GitHub Pages (no server, no monthly cost).

## Put it online (5 minutes)
1. Create a free account at github.com and click **New repository** (name it e.g. `myshop`, set it to **Public**).
2. Click **uploading an existing file** and drag in **everything from this folder** (`index.html`, `style.css`, `script.js`, `products.js`, and the `images` folder). Click **Commit changes**.
3. Go to **Settings → Pages**. Under *Branch*, choose `main` and `/ (root)`, then **Save**.
4. After about a minute your shop is live at `https://YOUR-USERNAME.github.io/myshop/`.

## Make it yours
Open `products.js` and edit the top section:
- `name`: your shop name
- `whatsapp`: your WhatsApp number with country code, no `+` or spaces (example: `919876543210`). Orders arrive here.

**Add products:** copy any line in the `PRODUCTS` list, change the id, name, price, mrp (the crossed-out price), etc.

**Use real photos instead of emojis:** put the photo in an `images` folder and add `image: "images/earbuds.jpg"` to that product.

## How orders work
GitHub Pages is static, so there is no payment gateway. When a customer checks out, the order (items, name, phone, address) opens in WhatsApp addressed to you, and you collect payment as Cash on Delivery or by UPI. To add online payments later, you can add a Razorpay Payment Link or Payment Page.

## Tip for free shipping + low prices
Add your shipping cost into the product price, or sell items where your margin covers delivery, so "free shipping" doesn't cut into profit.
