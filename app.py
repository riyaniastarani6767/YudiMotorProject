from flask import Flask, render_template, jsonify
import os, json

app = Flask(__name__)

def load_products():
    data_path = os.path.join(app.static_folder, "data", "products.json")
    with open(data_path, "r", encoding="utf-8") as f:
        return json.load(f)

@app.route("/")
def home():
    return render_template("index.html", products=load_products())

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/products")
def products_page():
    return render_template("product.html", products=load_products())

@app.route("/api/products")
def api_products():
    return jsonify(load_products())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
