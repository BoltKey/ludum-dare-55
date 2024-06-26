import { emojiDictionary } from "./globals.js";

export function createFlyer(content, from, opposite) {
  let wrap = document.getElementById("game-wrap");
  if (!wrap || !from) {
    return;
  }
  let fromRect = from.getBoundingClientRect();
  let toRect = document.getElementById(content + "-number").getBoundingClientRect();

  if (opposite) {
    [fromRect, toRect] = [toRect, fromRect]
  }
  let wrapRect = wrap.getBoundingClientRect();

  let fromX = fromRect.left + fromRect.width / 2 - wrapRect.left
  let fromY = fromRect.top + fromRect.height / 2 - wrapRect.top
  let toX = toRect.left + toRect.width / 2 - 15 - wrapRect.left
  let toY = toRect.top + toRect.height / 2 - 15 - wrapRect.top

  let dictEntry = Object.entries(emojiDictionary).find(e => e[1] === content)
  if (dictEntry) {
    content = dictEntry[0]
  }

  let flyer = document.createElement("div")
  flyer.style.left = fromX + "px"
  flyer.style.top = fromY + "px"
  flyer.classList.add("flyer")
  flyer.innerHTML = content;

  wrap.appendChild(flyer)
  let animation = flyer.animate([
    {left: fromX + "px", top: fromY + "px", opacity: 0},
    {opacity: 1},
    {opacity: 1},
    {left: toX + "px", top: toY + "px", opacity: 0}
  ], {
    duration: 1000, easing: "ease-in-out"
  })
  animation.onfinish = () => {
    console.log("animation complete");
    flyer.remove()
  }
}