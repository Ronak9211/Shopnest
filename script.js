(function () {
  const $ = (s) => document.querySelector(s);
  const money = (n) => STORE.currency + n.toLocaleString("en-IN");
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

  let state = { cat: "All", q: "", sort: "rel" };
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("shopnest_cart")) || []; } catch (e) {}

  /* ---------- Categories ---------- */
  const catNav = $("#catNav");
  const searchCat = $("#searchCat");
  categories.forEach((c) => {
    const b = document.createElement("button");
    b.textContent = c;
    b.dataset.cat = c;
    catNav.appendChild(b);
    if (c !== "All") searchCat.add(new Option(c, c));
  });
  catNav.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state.cat = b.dataset.cat;
    searchCat.value = state.cat;
    render();
  });
  document.querySelectorAll(".slide .btn").forEach((a) =>
    a.addEventListener("click", () => { state.cat = a.dataset.cat; searchCat.value = state.cat; render(); })
  );

  /* ---------- Search & sort ---------- */
  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.q = $("#searchInput").value.trim().toLowerCase();
    state.cat = searchCat.value;
    render();
    $("#products").scrollIntoView();
  });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });

  /* ---------- Product grid ---------- */
  const off = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

  function render() {
    document.querySelectorAll(".catnav button").forEach((b) => b.classList.toggle("active", b.dataset.cat === state.cat));
    let list = PRODUCTS.filter(
      (p) => (state.cat === "All" || p.category === state.cat) &&
             (!state.q || (p.name + " " + p.category).toLowerCase().includes(state.q))
    );
    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    if (state.sort === "disc") list.sort((a, b) => off(b) - off(a));
    if (state.sort === "rate") list.sort((a, b) => b.rating - a.rating);

    $("#listTitle").textContent = state.cat === "All" ? "All Products" : state.cat;
    $("#empty").hidden = list.length > 0;
    $("#grid").innerHTML = list.map((p) => `
      <article class="card">
        <span class="badge">${off(p)}% OFF</span>
        <div class="pic" style="background:${p.color}">${p.image ? `<img src="${p.image}" alt="${p.name}" style="max-height:100%">` : p.emoji}</div>
        <div class="info">
          <h3>${p.name}</h3>
          <div class="rating"><b>${p.rating} ★</b> (${p.reviews.toLocaleString("en-IN")})</div>
          <div class="price"><strong>${money(p.price)}</strong><s>${money(p.mrp)}</s><em>${off(p)}% off</em></div>
          <div class="ship">✔ Free shipping</div>
          <button class="add" data-id="${p.id}">Add to Cart</button>
        </div>
      </article>`).join("");
  }
  $("#grid").addEventListener("click", (e) => {
    const b = e.target.closest(".add");
    if (b) addToCart(+b.dataset.id);
  });

  /* ---------- Cart ---------- */
  function save() { try { localStorage.setItem("shopnest_cart", JSON.stringify(cart)); } catch (e) {} }
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove("show"), 1800);
  }
  function addToCart(id) {
    const row = cart.find((i) => i.id === id);
    row ? row.qty++ : cart.push({ id, qty: 1 });
    save(); drawCart(); toast("Added to cart ✔");
  }
  function drawCart() {
    const rows = cart.map((i) => ({ ...i, p: PRODUCTS.find((p) => p.id === i.id) })).filter((r) => r.p);
    const count = rows.reduce((s, r) => s + r.qty, 0);
    const total = rows.reduce((s, r) => s + r.qty * r.p.price, 0);
    $("#cartCount").textContent = count;
    $("#subtotal").textContent = money(total);
    $("#total").textContent = money(total);
    $("#cartItems").innerHTML = rows.length
      ? rows.map((r) => `
        <div class="item">
          <div class="t" style="background:${r.p.color}">${r.p.emoji}</div>
          <div class="d">${r.p.name}<b>${money(r.p.price)}</b>
            <div class="qty">
              <button data-act="dec" data-id="${r.id}">−</button><span>${r.qty}</span><button data-act="inc" data-id="${r.id}">+</button>
              <button class="rm" data-act="rm" data-id="${r.id}">Remove</button>
            </div>
          </div>
        </div>`).join("")
      : '<p class="none">Your cart is empty 🛒</p>';
  }
  $("#cartItems").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const id = +b.dataset.id, row = cart.find((i) => i.id === id);
    if (b.dataset.act === "inc") row.qty++;
    if (b.dataset.act === "dec") row.qty--;
    if (b.dataset.act === "rm" || row.qty <= 0) cart = cart.filter((i) => i.id !== id);
    save(); drawCart();
  });

  const open = () => { $("#drawer").classList.add("open"); $("#overlay").classList.add("show"); };
  const close = () => { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("show"); };
  $("#openCart").onclick = open;
  $("#closeCart").onclick = close;
  $("#overlay").onclick = close;

  /* ---------- Checkout (sends the order to your WhatsApp) ---------- */
  $("#checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!cart.length) return toast("Your cart is empty");
    const f = new FormData(e.target);
    let total = 0;
    const lines = cart.map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.id);
      total += p.price * i.qty;
      return `• ${p.name} x${i.qty} = ${money(p.price * i.qty)}`;
    });
    const msg = `*New Order – ${STORE.name}*\n\n${lines.join("\n")}\n\n*Total: ${money(total)}* (Free shipping)\n\n*Name:* ${f.get("name")}\n*Phone:* ${f.get("phone")}\n*Address:* ${f.get("address")}\n*Payment:* Cash on Delivery`;
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    cart = []; save(); drawCart(); close(); e.target.reset();
    toast("Order sent! We'll confirm on WhatsApp.");
  });

  /* ---------- Hero slider ---------- */
  const slides = $("#slides"), n = slides.children.length, dots = $("#dots");
  let cur = 0, timer;
  for (let i = 0; i < n; i++) { const d = document.createElement("i"); d.onclick = () => go(i); dots.appendChild(d); }
  function go(i) {
    cur = (i + n) % n;
    slides.style.transform = `translateX(-${cur * 100}%)`;
    [...dots.children].forEach((d, k) => d.classList.toggle("on", k === cur));
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 5000);
  }
  $("#prev").onclick = () => go(cur - 1);
  $("#next").onclick = () => go(cur + 1);

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  $("#footContact").textContent = "WhatsApp: +" + STORE.whatsapp;
  go(0); render(); drawCart();
})();
