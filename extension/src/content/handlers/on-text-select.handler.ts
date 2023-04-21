export const onTextSelect = (event: any) => {
    console.log('seeeee', event);
    const selection = window.getSelection();
    if (selection !== null && selection.anchorNode !== null && selection.toString().length > 2) {
        const node = selection.anchorNode;
        const parentNode = selection.anchorNode.parentElement;

        const range = document.createRange();
        range.selectNode(selection.anchorNode);
        const rect = range.getBoundingClientRect();
        console.log('Anchor node - ', selection);
        console.log('Focus Node - ', selection.toString(), rect);
        // Create the tooltip element with the summary and associated tags
        const highlight = document.createElement('span');
        highlight.style.backgroundColor = 'red';
        highlight.appendChild(node);

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = selection.toString();
        selection.anchorNode.parentNode?.insertBefore(highlight, selection.anchorNode);
        selection.anchorNode.parentNode?.removeChild(node);
        // Position the tooltip next to the clicked highlight element and add it to the DOM
        // tooltip.style.left = `${rect.x + rect.width}px`;

        // tooltip.style.left = `${rect.x}px`;
        // tooltip.style.top = `${rect.y}px`;
        document.body.appendChild(tooltip);
        range.detach();
    }
};
