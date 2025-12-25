

from flask import Flask, render_template, jsonify, request, url_for
import os, json
from math import ceil

app = Flask(__name__)

def _load_json(relpath):
    with open(os.path.join(app.static_folder, relpath), "r", encoding="utf-8") as f:
        return json.load(f)

def load_products():
    return _load_json(os.path.join("data", "products.json"))

def load_home_products():
    return _load_json(os.path.join("data", "homeProducts.json"))

@app.route("/")
def home():
    return render_template("index.html", products_home=load_home_products())

@app.route("/products")
def products_page():
    products = load_products()
    page = request.args.get("page", 1, type=int)
    per_page = 12

    total = len(products)
    total_pages = ceil(total / per_page)

    start = (page - 1) * per_page
    end = start + per_page
    page_items = products[start:end]

    return render_template(
        "product.html",
        products=page_items,
        page=page,
        total_pages=total_pages,
    )

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/api/products")
def api_products():
    return jsonify(load_products())

@app.route("/products/all")
def products_all():
    try:
        products = load_products()
        
        # Format setiap produk dengan URL gambar yang benar
        result = []
        for p in products:
            result.append({
                "name": p.get("name", ""),
                "category": p.get("category", ""),
                "price": p.get("price", ""),
                "image": url_for('static', filename='images/' + p.get("image", "")),
                "desc": p.get("desc", ""),
                "spesifikasi_motor": p.get("spesifikasi_motor", "")
            })
        
        print(f"✅ /products/all returning {len(result)} products")
        return jsonify(result)
    except Exception as e:
        print("❌ Error in /products/all:", str(e))
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)