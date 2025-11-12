document.addEventListener("DOMContentLoaded", () => {

  /* Slider arrows */
  document.querySelectorAll("[data-scroll]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const track = document.querySelector(btn.dataset.scroll);
      if(!track) return;
      const dir = Number(btn.dataset.dir || 1);
      const card = track.querySelector(".product-card");
      const step = (card ? card.getBoundingClientRect().width : 280) + 12;
      track.scrollBy({ left: step * dir, behavior:"smooth" });
    });
  });

  /* Search (Home & Produk) */
  const searchBox = document.getElementById("searchAll");
  if (searchBox) {
    const filter = () => {
      const term = searchBox.value.trim().toLowerCase();
      document.querySelectorAll(".product-card").forEach(el=>{
        const name=(el.dataset.name||"").toLowerCase(), cat=(el.dataset.category||"").toLowerCase();
        el.classList.toggle("d-none", term && !name.includes(term) && !cat.includes(term));
      });
      document.querySelectorAll(".product-col").forEach(el=>{
        const name=(el.dataset.name||"").toLowerCase(), cat=(el.dataset.category||"").toLowerCase();
        el.classList.toggle("d-none", term && !name.includes(term) && !cat.includes(term));
      });
      if (document.getElementById("prodGrid")) applyPagination();
    };
    searchBox.addEventListener("input", filter);
  }

  /* Modal Detail */
  const modalEl = document.getElementById("productModal");
  const pmName  = document.getElementById("pmName");
  const pmCat   = document.getElementById("pmCategory");
  const pmPrice = document.getElementById("pmPrice");
  const pmImg   = document.getElementById("pmImage");
  const pmDesc  = document.getElementById("pmDesc");
  const pmBuy   = document.getElementById("pmBuy");
  const bsModal = modalEl ? new bootstrap.Modal(modalEl) : null;
  const rupiah = n => "Rp " + (Number(n)||0).toLocaleString("id-ID");

  document.addEventListener("click",(e)=>{
    const btn = e.target.closest(".btn-detail");
    if(!btn || !bsModal) return;
    const box = btn.closest(".product-card, .product-col, .prod-item");
    if(!box) return;

    const name = box.dataset.name || box.querySelector("h6")?.textContent || "";
    const cat  = box.dataset.category || "";
    const price= box.dataset.price || "0";
    const img  = box.dataset.image || box.querySelector("img")?.src || "";
    const desc = box.dataset.desc || "Deskripsi singkat produk.";

    pmName.textContent = name;
    pmCat.textContent  = cat;
    pmPrice.textContent= rupiah(price);
    pmImg.src = img; pmImg.alt = name;
    pmDesc.textContent = desc;

    const msg = `Halo YudiMotor, saya ingin beli: ${name} (Rp ${Number(price).toLocaleString('id-ID')}). Apakah ready?`;
    pmBuy.href = "https://wa.me/6285738506679?text=" + encodeURIComponent(msg);

    bsModal.show();
  });

  /* Pagination (Produk) */
  function getVisibleProdItems(){
    return [...document.querySelectorAll("#prodGrid .prod-item")].filter(el=>!el.classList.contains("d-none"));
  }
  function buildPager(total, perPage, current){
    const pages = Math.max(1, Math.ceil(total/perPage));
    const wrap = document.getElementById("pager"); if(!wrap) return;
    wrap.innerHTML = "";
    const add = (label, page, disabled=false, active=false)=>{
      const b=document.createElement("button");
      b.className="page-link-like"+(active?" active":""); b.textContent=label; b.disabled=disabled;
      b.addEventListener("click",()=>applyPagination(page)); wrap.appendChild(b);
    };
    add("Sebelumnya", Math.max(1,current-1), current===1);
    for(let p=1;p<=pages;p++) add(String(p), p, false, p===current);
    add("Berikutnya", Math.min(pages,current+1), current===pages);
  }
  function applyPagination(goTo){
    const perPage=12, items=getVisibleProdItems(), total=items.length;
    const pages=Math.max(1,Math.ceil(total/perPage)); const cur=Math.min(pages,Math.max(1,goTo||1));
    items.forEach(el=>el.classList.remove("d-none-page"));
    items.forEach((el,i)=>{ const p=Math.floor(i/perPage)+1; el.classList.toggle("d-none-page", p!==cur); });
    buildPager(total, perPage, cur);
  }
  if (document.getElementById("prodGrid")) applyPagination(1);

  console.log("app.js loaded");
});
