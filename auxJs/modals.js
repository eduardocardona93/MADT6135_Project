const modalObj = this;
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
      if(button.type == 'close'){
        element.classList.add('close')
      }
      element.textContent = button.label;
      element.addEventListener("click", () => {
        if (button.triggerClose) {
          document.body.removeChild(modal, );
        }
  
        button.onClick(modal,modalObj);
      });
  
      modal.querySelector(".modal--bottom").appendChild(element);
    }
  
    modal.querySelector(".modal--close").addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  
    document.body.appendChild(modal);
  }



function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--succes", "form__message--error")
    messageElement.classList.add(`form__message--${type}`);
}

function clearFormMessage(formElement) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = "";
    messageElement.classList.remove("form__message--succes", "form__message--error")
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function setInputSuccess(inputElement) {
  inputElement.classList.add("form__input--success");
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}