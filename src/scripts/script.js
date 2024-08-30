const config = {
  1: {
    telefone: "(99) 99999-9999",
  },
  2: {
    telefone: "(88) 88888-8888",
  },
};

let actives = {};

/**
 *
 * @param {number} id
 */
function tooglePhone(id) {
  if (actives && actives[id]) {
    const span = document.querySelector(`#Corretor${id}`);
    span.textContent = `Ver telefone`;
    actives[id] = false;
  } else {
    const telefone = config[id].telefone;
    const span = document.querySelector(`#Corretor${id}`);
    span.innerHTML = `${telefone}<br/>Ocultar telefone`;
    actives[id] = true;
  }
}

function rule3(event) {
  event.preventDefault();
  var x = parseFloat(document.querySelector("#primeiro").value);
  var y = parseFloat(document.querySelector("#segundo").value);
  var z = parseFloat(document.querySelector("#terceiro").value);
  const input = document.querySelector(`#resultado`);
  input.value = (z * y) / x;
}
/**
 * @param { SubmitEvent } event
 */
function sendMessage(event) {
  event.preventDefault();
  alert("Mensagem enviada!");
}

function format(event, type) {
  const input = event.target;
  let value = input.value.replace(/\D/g, "");

  if (type === "cpf") {
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    input.setAttribute("maxlength", "14");
  } else if (type === "telefone") {
    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }
    input.setAttribute("maxlength", "15");
  }

  input.value = value;
}

window.onload = () => {
  const closeModalButton = document.querySelector("span#closeModal");
  const openModalButton = document.querySelector("button#openModal");
  const DownloadButton = document.querySelector("button#Download");
  const modal = document.querySelector("#modal");
  const overlay = document.querySelector("#overlay");
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  openModalButton.addEventListener("click", () => {
    modal.style.display = "flex";
    overlay.style.display = "block";
  });

  DownloadButton.addEventListener("click", async () => {
    const capture = document.querySelector("#capture");
  
    html2canvas(capture).then((canvas) => {
      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "captura.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
};
