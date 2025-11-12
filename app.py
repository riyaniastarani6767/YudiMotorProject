from flask import Flask, render_template, jsonify
import os, json

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
    return render_template("product.html", products=load_products())

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/api/products")
def api_products():
    return jsonify(load_products())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
