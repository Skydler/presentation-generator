function removeParagraphsFromListItems(doc: Document) {
  const listItems = doc.querySelectorAll("li");
  listItems.forEach((li) => {
    const p = li.querySelector("p");
    if (p) {
      while (p.firstChild) {
        li.insertBefore(p.firstChild, p);
      }
      p.remove();
    }
  });

  return doc;
}

export function patchTipTapHTML(content: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const patchedDoc = removeParagraphsFromListItems(doc);
  return patchedDoc.body.innerHTML;
}
