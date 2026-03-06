const pageLoader = document.getElementById("pageLoader");

function hideLoader() {
    if (!pageLoader) return;
    pageLoader.classList.add("hidden");
    setTimeout(() => {
        pageLoader.style.display = "none";
    }, 320);
}

if (document.readyState === "complete") {
    setTimeout(hideLoader, 250);
} else {
    window.addEventListener("load", () => setTimeout(hideLoader, 250));
}

const drawer = document.getElementById("navDrawer");
const overlay = document.getElementById("drawerOverlay");

document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!drawer || !overlay) return;
        drawer.classList.toggle("open");
        overlay.classList.toggle("active");
    });
});

if (overlay) {
    overlay.addEventListener("click", () => {
        drawer?.classList.remove("open");
        overlay.classList.remove("active");
    });
}

document.querySelectorAll(".drawer-link").forEach((link) => {
    link.addEventListener("click", () => {
        drawer?.classList.remove("open");
        overlay?.classList.remove("active");
    });
});

const moreBtn = document.getElementById("moreBtn");
const mobileCatMenu = document.getElementById("mobileCatMenu");

if (moreBtn && mobileCatMenu) {
    moreBtn.addEventListener("click", () => {
        const open = mobileCatMenu.classList.toggle("open");
        mobileCatMenu.setAttribute("aria-hidden", open ? "false" : "true");
    });

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (moreBtn.contains(target) || mobileCatMenu.contains(target)) return;

        mobileCatMenu.classList.remove("open");
        mobileCatMenu.setAttribute("aria-hidden", "true");
    });

    mobileCatMenu.querySelectorAll(".mobile-cat-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileCatMenu.classList.remove("open");
            mobileCatMenu.setAttribute("aria-hidden", "true");
        });
    });
}

document.querySelectorAll(".fab-chat").forEach((btn) => {
    btn.addEventListener("click", () => {
        alert("Connect with us on WhatsApp at +91 95880 16011");
    });
});

document.querySelectorAll(".footer-accordion-btn").forEach((btn) => {
    const panelId = btn.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        panel.hidden = expanded;
    });
});

const CART_KEY = "riddhi_siddhi_cart";

const PRODUCT_CATALOG = [
    { id: "1", name: "Pyrite Raw Cluster", min: 240, max: 400, bg: "linear-gradient(160deg, #14150f, #8f8168, #d6b995)", tags: ["shop", "clusters", "home-decor", "crystals", "pyrite"] },
    { id: "2", name: "Indian Amethyst Raw Cluster", min: 250, max: 1750, bg: "linear-gradient(160deg, #22232b, #757d9c, #d8d1c4)", tags: ["shop", "clusters", "home-decor", "crystals", "amethyst"] },
    { id: "3", name: "Black Tourmaline Cluster", min: 275, max: 1925, bg: "linear-gradient(145deg, #1f2528, #8f7f62, #e7d6bf)", tags: ["shop", "clusters", "home-decor", "crystals", "black-tourmaline"] },
    { id: "4", name: "Peridot Cluster Raw Stone", min: 500, max: 1500, bg: "linear-gradient(145deg, #665c50, #c8b49f, #f8f1e6)", tags: ["shop", "clusters", "crystals"] },
    { id: "5", name: "Rose Quartz Cluster", min: 380, max: 1250, bg: "linear-gradient(145deg, #9f8188, #f0d1d4)", tags: ["shop", "clusters", "crystals", "rose-quartz"] },
    { id: "6", name: "Citrine Natural Cluster", min: 420, max: 1850, bg: "linear-gradient(145deg, #d7a149, #f2dd98, #9f7f3f)", tags: ["shop", "clusters", "crystals"] },
    { id: "7", name: "Clear Quartz Cluster", min: 299, max: 1100, bg: "linear-gradient(145deg, #eeeeee, #c7c7c7)", tags: ["shop", "clusters", "crystals"] },
    { id: "8", name: "Raw Garnet Crystal Cluster", min: 450, max: 1600, bg: "linear-gradient(145deg, #5f3a40, #a46367, #e0b8ba)", tags: ["shop", "clusters", "crystals"] },
    { id: "9", name: "Rose Quartz Bracelet", min: 350, max: 690, bg: "linear-gradient(145deg, #e3bcc5, #f4dfe4)", tags: ["shop", "bracelet", "jewellery", "gifting", "color"] },
    { id: "10", name: "Tiger Eye Bracelet", min: 390, max: 750, bg: "linear-gradient(145deg, #5a3a22, #b18a5c)", tags: ["shop", "bracelet", "jewellery", "gifting"] },
    { id: "11", name: "Amethyst Bracelet", min: 410, max: 820, bg: "linear-gradient(145deg, #6d5a8f, #cab9e8)", tags: ["shop", "bracelet", "jewellery", "gifting", "amethyst"] },
    { id: "12", name: "Black Tourmaline Bracelet", min: 430, max: 900, bg: "linear-gradient(145deg, #22252a, #68727d)", tags: ["shop", "bracelet", "jewellery", "gifting", "black-tourmaline"] },
    { id: "13", name: "Raw Citrine Stone", min: 260, max: 540, bg: "linear-gradient(145deg, #c58020, #f5c976)", tags: ["shop", "raw-stone", "crystals", "category"] },
    { id: "14", name: "Raw Pyrite Stone", min: 240, max: 480, bg: "linear-gradient(145deg, #63615e, #b9ab93)", tags: ["shop", "raw-stone", "crystals", "pyrite", "category"] },
    { id: "15", name: "Green Aventurine Chips", min: 180, max: 420, bg: "linear-gradient(145deg, #3f6d53, #9ac5ab)", tags: ["shop", "chips", "crystals", "category", "color"] },
    { id: "16", name: "Rose Quartz Chips", min: 190, max: 430, bg: "linear-gradient(145deg, #c68f97, #f7d5da)", tags: ["shop", "chips", "crystals", "category", "color", "rose-quartz"] },
    { id: "17", name: "7 Chakra Tree", min: 650, max: 1600, bg: "linear-gradient(145deg, #7c5d3e, #d9bc8c)", tags: ["shop", "tree", "home-decor", "gifting", "meaning"] },
    { id: "18", name: "Amethyst Tree", min: 590, max: 1450, bg: "linear-gradient(145deg, #6e5e98, #c8bce4)", tags: ["shop", "tree", "home-decor", "gifting", "amethyst"] },
    { id: "19", name: "Natural Agate Clock", min: 1200, max: 3200, bg: "linear-gradient(145deg, #4f6fb1, #bccbf0)", tags: ["shop", "clock", "home-decor", "gifting"] },
    { id: "20", name: "Blue Agate Clock", min: 1350, max: 3450, bg: "linear-gradient(145deg, #2a4a79, #85a8da)", tags: ["shop", "clock", "home-decor", "gifting", "color"] },
    { id: "21", name: "Geode Decor Pair", min: 990, max: 2600, bg: "linear-gradient(145deg, #6f5c73, #d3c8d8)", tags: ["shop", "geode", "home-decor", "gifting", "geodes"] },
    { id: "22", name: "Amethyst Pendant", min: 520, max: 1120, bg: "linear-gradient(145deg, #5e4e84, #b9a9de)", tags: ["shop", "pendant", "jewellery", "gifting", "amethyst"] },
    { id: "23", name: "Citrine Pendant", min: 480, max: 980, bg: "linear-gradient(145deg, #9e6f1d, #e9c778)", tags: ["shop", "pendant", "jewellery", "gifting"] },
    { id: "24", name: "Protection Tumble Kit", min: 350, max: 700, bg: "linear-gradient(145deg, #3e4650, #9aa4af)", tags: ["shop", "tumble", "gifting", "meaning", "category"] }
];

const CATEGORY_LABELS = {
    shop: "Shop",
    category: "By Category",
    meaning: "By Meaning",
    crystals: "By Crystals",
    color: "By Color",
    "home-decor": "Home Decor",
    jewellery: "Jewellery",
    gifting: "Gifting",
    bracelet: "Bracelet",
    "raw-stone": "Rough Raw Stone",
    chips: "Stone Chips",
    tree: "Tree",
    geode: "Geode",
    geodes: "Geodes",
    pendant: "Pendant",
    clock: "Agate Clock",
    tumble: "Tumbled Stone",
    clusters: "Clusters",
    amethyst: "Amethyst",
    pyrite: "Pyrite",
    "rose-quartz": "Rose Quartz",
    "black-tourmaline": "Black Tourmaline",
    palm: "Palm Stone"
};

function formatPrice(min, max) {
    return `Rs ${min.toLocaleString("en-IN")} - Rs ${max.toLocaleString("en-IN")}`;
}

function getCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function setCart(cartItems) {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

function getCartCount() {
    return getCart().reduce((total, item) => total + (Number(item.qty) || 1), 0);
}

function updateCartBadge() {
    const count = getCartCount();
    document.querySelectorAll(".cart-badge").forEach((badge) => {
        badge.textContent = String(count);
    });
}

function addToCart(id, name, price, quantity = 1, weight = "") {
    const cart = getCart();
    const safeQty = Number(quantity) > 0 ? Number(quantity) : 1;
    const cartLabel = weight ? `${name} (${weight})` : name;
    cart.push({ id, name: cartLabel, price, qty: safeQty, weight });
    setCart(cart);
    updateCartBadge();
}

function handleAddToCartClick(event) {
    const button = event.target.closest(".add-to-cart-btn");
    if (!button) return;

    const card = button.closest(".product-card") || button;
    const id = card.dataset.id || button.dataset.id;
    const name = card.dataset.name || button.dataset.name;
    const price = card.dataset.price || button.dataset.price;

    if (!id || !name || !price) return;

    const quantity = Number(button.dataset.qty || "1");
    const weight = button.dataset.weight || "";
    addToCart(id, name, price, quantity, weight);
    const previousLabel = button.textContent;
    button.textContent = "Added";
    button.classList.add("added");
    button.disabled = true;

    setTimeout(() => {
        button.textContent = previousLabel || "Add to Cart";
        button.classList.remove("added");
        button.disabled = false;
    }, 1400);
}

document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".add-to-cart-btn")) {
        event.preventDefault();
        handleAddToCartClick(event);
    }
});

function renderCartPage() {
    const container = document.getElementById("cartItems");
    const empty = document.getElementById("cartEmpty");
    const checkout = document.getElementById("cartCheckoutSection");
    const subtotalElement = document.getElementById("cartSubtotalValue");
    const totalElement = document.getElementById("cartTotalValue");
    const checkoutTotalElement = document.getElementById("checkoutTotalValue");
    const checkoutBtn = document.getElementById("whatsappOrderBtn");
    const updateBtn = document.getElementById("updateCartBtn");

    if (!container) return;

    function parsePriceValue(priceText) {
        const safe = String(priceText || "");
        const values = safe.match(/\d[\d,]*/g);
        if (!values || values.length === 0) return 0;
        return Number(values[0].replace(/,/g, "")) || 0;
    }

    function formatRupees(value) {
        return `Rs ${Math.max(0, Number(value) || 0).toLocaleString("en-IN")}`;
    }

    function markUpdated() {
        if (!updateBtn) return;
        updateBtn.disabled = true;
        updateBtn.textContent = "Cart Updated";
        setTimeout(() => {
            updateBtn.textContent = "Update Cart";
        }, 1100);
    }

    const cart = getCart().map((item) => ({
        ...item,
        qty: Math.max(1, Number(item.qty) || 1)
    }));

    if (cart.length === 0) {
        container.innerHTML = "";
        if (empty) empty.style.display = "block";
        if (checkout) checkout.style.display = "none";
        if (subtotalElement) subtotalElement.textContent = formatRupees(0);
        if (totalElement) totalElement.textContent = formatRupees(0);
        if (checkoutTotalElement) checkoutTotalElement.textContent = formatRupees(0);
        return;
    }

    if (empty) empty.style.display = "none";
    if (checkout) checkout.style.display = "block";

    container.innerHTML = cart
        .map(
            (item, index) => {
                const product = PRODUCT_CATALOG.find((entry) => entry.id === String(item.id));
                const thumbStyle = product ? ` style="background:${product.bg}"` : "";
                return `
                <div class="cart-row" data-index="${index}">
                    <button type="button" class="cart-remove-btn" data-index="${index}" aria-label="Remove item">&times;</button>
                    <a href="product-detail.html?id=${item.id}" class="cart-product-cell" aria-label="${item.name}">
                        <div class="cart-thumb"${thumbStyle}></div>
                        <div class="cart-item-info">
                            <strong>${item.name}</strong>
                        </div>
                    </a>
                    <div class="cart-price-cell">${item.price}</div>
                    <div class="cart-qty-control" role="group" aria-label="Quantity controls">
                        <button type="button" class="qty-btn" data-action="decrease" data-index="${index}" aria-label="Decrease quantity">&lt;</button>
                        <span class="qty-value">${item.qty}</span>
                        <button type="button" class="qty-btn" data-action="increase" data-index="${index}" aria-label="Increase quantity">&gt;</button>
                    </div>
                    <div class="cart-subtotal-cell">${formatRupees(parsePriceValue(item.price) * item.qty)}</div>
                </div>
            `;
            }
        )
        .join("");

    const grandTotal = cart.reduce((sum, item) => sum + (parsePriceValue(item.price) * item.qty), 0);
    if (subtotalElement) subtotalElement.textContent = formatRupees(grandTotal);
    if (totalElement) totalElement.textContent = formatRupees(grandTotal);
    if (checkoutTotalElement) checkoutTotalElement.textContent = formatRupees(grandTotal);
    if (checkoutBtn) {
        checkoutBtn.textContent = "Proceed to Checkout";
    }
    if (updateBtn) {
        updateBtn.disabled = true;
    }

    container.querySelectorAll(".cart-remove-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = Number(btn.dataset.index);
            const updated = getCart().filter((_, i) => i !== index);
            setCart(updated);
            updateCartBadge();
            renderCartPage();
        });
    });

    container.querySelectorAll(".qty-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = Number(btn.dataset.index);
            const action = btn.dataset.action;
            const currentCart = getCart();
            const item = currentCart[index];
            if (!item) return;

            const currentQty = Math.max(1, Number(item.qty) || 1);
            const nextQty = action === "decrease" ? Math.max(1, currentQty - 1) : Math.min(20, currentQty + 1);
            if (nextQty === currentQty) return;

            item.qty = nextQty;
            setCart(currentCart);
            updateCartBadge();
            if (updateBtn) updateBtn.disabled = false;
            markUpdated();
            renderCartPage();
        });
    });
}

const billingForm = document.getElementById("billingForm");
const whatsappOrderBtn = document.getElementById("whatsappOrderBtn");

if (whatsappOrderBtn) {
    whatsappOrderBtn.addEventListener("click", () => {
        const cart = getCart();
        if (cart.length === 0) {
            alert("Please add at least one product.");
            return;
        }

        if (billingForm && !billingForm.checkValidity()) {
            billingForm.reportValidity();
            return;
        }

        const name = billingForm?.querySelector("[name='name']")?.value?.trim() || "";
        const phone = billingForm?.querySelector("[name='phone']")?.value?.trim() || "";
        const email = billingForm?.querySelector("[name='email']")?.value?.trim() || "";
        const address = billingForm?.querySelector("[name='address']")?.value?.trim() || "";

        const parsePriceValue = (priceText) => {
            const values = String(priceText || "").match(/\d[\d,]*/g);
            if (!values || values.length === 0) return 0;
            return Number(values[0].replace(/,/g, "")) || 0;
        };

        const total = cart.reduce((sum, item) => sum + (parsePriceValue(item.price) * (Number(item.qty) || 1)), 0);
        const items = cart
            .map((item) => `- ${item.name} (${item.price}) x ${Number(item.qty) || 1}`)
            .join("\n");
        const message = [
            "Hi Riddhi Siddhi, I would like to place an order.",
            "",
            "Items:",
            items,
            "",
            `Total: Rs ${total.toLocaleString("en-IN")}`,
            "",
            "Billing Details:",
            `Name: ${name}`,
            `Phone: ${phone}`,
            email ? `Email: ${email}` : "",
            `Address: ${address}`
        ]
            .filter(Boolean)
            .join("\n");

        const whatsappUrl = `https://wa.me/919588016011?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    });
}

function renderProductsPage() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const categoryTitle = document.getElementById("categoryTitle");
    const breadcrumbCategory = document.getElementById("breadcrumbCategory");
    const resultCount = document.getElementById("resultCount");
    const sortSelect = document.getElementById("sortSelect");
    const priceRange = document.getElementById("priceRange");
    const priceText = document.getElementById("priceText");
    const filterBtn = document.getElementById("filterBtn");

    const params = new URLSearchParams(window.location.search);
    const cat = (params.get("cat") || "shop").toLowerCase();
    const baseProducts = cat === "shop"
        ? PRODUCT_CATALOG
        : PRODUCT_CATALOG.filter((product) => product.tags.includes(cat));

    const categoryLabel = CATEGORY_LABELS[cat] || "Shop";
    if (categoryTitle) categoryTitle.textContent = categoryLabel;
    if (breadcrumbCategory) breadcrumbCategory.textContent = categoryLabel;

    document.querySelectorAll(".nav-list a").forEach((a) => {
        const href = a.getAttribute("href") || "";
        const active = href.includes(`cat=${cat}`) || (cat === "shop" && href === "products.html");
        a.classList.toggle("active", active);
    });

    let visibleProducts = [...baseProducts];
    let maxPriceFilter = Number(priceRange?.value || 58840);

    function updatePriceText() {
        if (!priceText) return;
        priceText.textContent = `Price: Rs 100 - Rs ${maxPriceFilter.toLocaleString("en-IN")}`;
    }

    function applySort() {
        const sortBy = sortSelect?.value || "popularity";
        if (sortBy === "price-low") {
            visibleProducts.sort((a, b) => a.min - b.min);
        } else if (sortBy === "price-high") {
            visibleProducts.sort((a, b) => b.max - a.max);
        } else if (sortBy === "latest") {
            visibleProducts.sort((a, b) => Number(b.id) - Number(a.id));
        } else {
            visibleProducts.sort((a, b) => Number(a.id) - Number(b.id));
        }
    }

    function drawProducts() {
        applySort();

        if (resultCount) {
            resultCount.textContent = `Showing all ${visibleProducts.length} results`;
        }

        if (visibleProducts.length === 0) {
            grid.innerHTML = "<p>No products found in this range.</p>";
            return;
        }

        grid.innerHTML = visibleProducts
            .map((product) => {
                const price = formatPrice(product.min, product.max);
                return `
                    <article class="product-card" data-id="${product.id}" data-name="${product.name}" data-price="${price}">
                        <a href="product-detail.html?id=${product.id}" class="product-card-link">
                            <div class="product-image" style="background:${product.bg}"></div>
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-price">${price}</p>
                        </a>
                        <button type="button" class="add-to-cart-btn">Add to Cart</button>
                    </article>
                `;
            })
            .join("");
    }

    function applyFilter() {
        visibleProducts = baseProducts.filter((product) => product.min <= maxPriceFilter);
        drawProducts();
    }

    if (priceRange) {
        priceRange.addEventListener("input", () => {
            maxPriceFilter = Number(priceRange.value);
            updatePriceText();
        });
    }

    if (filterBtn) {
        filterBtn.addEventListener("click", applyFilter);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", drawProducts);
    }

    updatePriceText();
    applyFilter();
}

function getDetailDescription(product) {
    if (product.tags.includes("clusters")) {
        return `Unleash grounded crystal energy with the ${product.name}. This natural cluster helps bring focus, confidence, and positive intention to your home or workspace. Ideal for meditation corners, work desks, and spiritual decor styling.`;
    }
    if (product.tags.includes("bracelet")) {
        return `The ${product.name} is made for everyday wear and healing style. Use it to carry balancing crystal energy through your day while adding a clean premium jewelry look.`;
    }
    if (product.tags.includes("pendant")) {
        return `Wear the ${product.name} close to your heart for daily intention support. Lightweight, elegant, and designed for both spiritual and fashion-focused use.`;
    }
    if (product.tags.includes("clock")) {
        return `Bring a premium decor statement to your space with ${product.name}. The stone pattern and polished finish create an elegant healing decor centerpiece.`;
    }
    return `Premium natural ${product.name} selected for healing, positivity, gifting, and decor.`;
}

function setupDetailInteractions(product) {
    const qtyMinus = document.getElementById("qtyMinus");
    const qtyPlus = document.getElementById("qtyPlus");
    const qtyValue = document.getElementById("qtyValue");
    const addButton = document.getElementById("detailAddToCart");
    const weightButtons = document.querySelectorAll(".weight-btn:not(.disabled)");
    const thumbButtons = document.querySelectorAll(".detail-thumb");
    const mainImage = document.getElementById("detailMainImage");

    if (!addButton) return;

    let qty = 1;
    let selectedWeight = "20-30gm";

    addButton.dataset.qty = String(qty);
    addButton.dataset.weight = selectedWeight;

    if (qtyValue) qtyValue.textContent = String(qty);

    qtyMinus?.addEventListener("click", () => {
        qty = Math.max(1, qty - 1);
        if (qtyValue) qtyValue.textContent = String(qty);
        addButton.dataset.qty = String(qty);
    });

    qtyPlus?.addEventListener("click", () => {
        qty = Math.min(10, qty + 1);
        if (qtyValue) qtyValue.textContent = String(qty);
        addButton.dataset.qty = String(qty);
    });

    weightButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            weightButtons.forEach((item) => item.classList.remove("active"));
            btn.classList.add("active");
            selectedWeight = btn.dataset.weight || "20-30gm";
            addButton.dataset.weight = selectedWeight;
        });
    });

    const variants = {
        base: product.bg,
        dark: `linear-gradient(145deg, rgba(0,0,0,0.24), rgba(0,0,0,0.1)), ${product.bg}`,
        light: `linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15)), ${product.bg}`,
        soft: `linear-gradient(145deg, rgba(250,230,220,0.22), rgba(230,230,255,0.15)), ${product.bg}`
    };

    thumbButtons.forEach((btn) => {
        const key = btn.dataset.variant || "base";
        btn.style.background = variants[key] || product.bg;
        btn.addEventListener("click", () => {
            thumbButtons.forEach((item) => item.classList.remove("active"));
            btn.classList.add("active");
            if (mainImage) mainImage.style.background = variants[key] || product.bg;
        });
    });
}

function applyProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    if (!productId) return;

    const product = PRODUCT_CATALOG.find((item) => item.id === productId);
    if (!product) return;

    const nameElement = document.querySelector(".product-detail-name");
    const priceElement = document.querySelector(".product-detail-price");
    const imageElement = document.querySelector(".product-detail-img");
    const addButton = document.getElementById("detailAddToCart");
    const descriptionElement = document.getElementById("detailDescription");
    const breadcrumbElement = document.getElementById("detailBreadcrumb");

    const priceText = formatPrice(product.min, product.max);

    if (nameElement) nameElement.textContent = product.name;
    if (priceElement) priceElement.textContent = priceText;
    if (imageElement) imageElement.style.background = product.bg;
    if (descriptionElement) descriptionElement.textContent = getDetailDescription(product);
    if (breadcrumbElement) breadcrumbElement.textContent = CATEGORY_LABELS[product.tags[1]] || "Product";

    if (addButton) {
        addButton.dataset.id = product.id;
        addButton.dataset.name = product.name;
        addButton.dataset.price = priceText;
    }

    setupDetailInteractions(product);
}

updateCartBadge();
renderCartPage();
renderProductsPage();
applyProductDetail();
