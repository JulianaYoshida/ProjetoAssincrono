const alerta = document.querySelector("#alerta");
const brandTable = document.querySelector("#brand-table");
const botaoCarregar = document.querySelector("#botao-carregar");

botaoCarregar.addEventListener("click", () => loadData());

async function loadBrands() {
  const response = await fetch(
    "https://parallelum.com.br/fipe/api/v1/carros/marcas"
  );
  const brands = await response.json();

  return brands;
}

document.addEventListener("DOMContentLoaded", async () => {
  let brands = [];

  try {
    brands = await loadBrands();
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }

  console.log(brands);
});

const newLine = ({ brands }) =>
  `<tr id="${id}">
      <td>${brands}</td>

    </tr>`;

const fillTable = (brands) => {
  if (!brands) {
    alerta.textContent = "Não existem registros a serem exibidos";
    return;
  } else {
    const carBrandList = brands.map((brand) => newLine(brand)).join("");
    brandTable.innerHTML = carBrandList;
    alerta.textContent = `Foram carregados ${brands.length} registros`;
  }
};

const loadData = () => {
  Promise.all([loadBrands()]).then((values) => {
    const brands = values[0];
    fillTable(brands);
  });
 
};

// <td>${email}</td>
// <td>${company.name}</td>
