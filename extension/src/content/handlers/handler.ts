// const handleSelection = (e: any) => {
//   console.log("seeeee", e);
//   const selection = window.getSelection();
//   if (
//     selection !== null &&
//     selection.anchorNode !== null &&
//     selection.toString().length > 10
//   ) {
//     const range = document.createRange();
//     range.selectNode(selection.anchorNode);
//     const rect = range.getBoundingClientRect();
//     console.log("Anchor node - ", selection);
//     console.log("Focus Node - ", selection.toString(), rect);
//     // Create the tooltip element with the summary and associated tags
//     const tooltip = document.createElement("div");
//     tooltip.classList.add("tooltip");
//     tooltip.textContent = "hello there";
//     // Position the tooltip next to the clicked highlight element and add it to the DOM
//     // tooltip.style.left = `${rect.x + rect.width}px`;
//     tooltip.style.left = `${rect.x + rect.width / 2}px`;
//     tooltip.style.top = `${rect.y}px`;
//     document.body.appendChild(tooltip);
//     range.detach();
//   }
// };
// document.addEventListener("mouseup", handleSelection);
// return () => {
//   document.removeEventListener("mouseup", handleSelection);
// };
export const o = {
    state: 'hello',
};
