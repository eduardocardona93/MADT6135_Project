function showModal(titleHtml, contentHtml, buttons) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
          <div class="modal--inner">
              <div class="modal--top">
                  <div class="modal--title">${titleHtml}</div>
                  <button class="modal--close" title="Close">
                    <i class="fa fa-close fa-lg"></i>
                  </button>
              </div>
              <div class="modal--content">${contentHtml}</div>
              <div class="modal--bottom"></div>
          </div>
      `;
  
    for (const button of buttons) {
      const element = document.createElement("button");
  
      element.setAttribute("type", "button");
      element.classList.add("modal--button");
      element.textContent = button.label;
      element.addEventListener("click", () => {
        if (button.triggerClose) {
          document.body.removeChild(modal);
        }
  
        button.onClick(modal);
      });
  
      modal.querySelector(".modal--bottom").appendChild(element);
    }
  
    modal.querySelector(".modal--close").addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  
    document.body.appendChild(modal);
  }