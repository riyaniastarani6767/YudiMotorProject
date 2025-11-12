// tombol panah untuk geser slider
document.querySelectorAll("[data-scroll]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const track = document.querySelector(btn.dataset.scroll);
    if(!track) return;
    const dir = Number(btn.dataset.dir || 1);
    const card = track.querySelector(".product-card");
    const step = (card ? card.getBoundingClientRect().width : 260) + 12; // width + gap
    track.scrollBy({ left: step * dir, behavior:"smooth" });
  });
});
