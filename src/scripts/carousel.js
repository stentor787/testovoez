const track = document.querySelector(".carousel__track");
const items = Array.from(track.children);
const totalWidth = items.reduce((sum, el) => sum + el.offsetWidth + 60, 0); 


items.forEach(item => track.appendChild(item.cloneNode(true)));


track.style.setProperty("--move", `${totalWidth}px`);
track.style.setProperty("--duration", `${totalWidth / 100}s`);