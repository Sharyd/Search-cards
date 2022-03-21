const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();

  users.forEach((user) => {
    const showUser =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);

    user.element.classList.toggle("hide", !showUser);

    const deleteUser = user.element.children[0];
    deleteUser.addEventListener("click", function (e) {
      if (+e.target.dataset.id === user.id) {
        user.element.classList.add("hide");
      }
    });
  });
});

const userSearcher = async function () {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) throw new Error("Problem with connection");

    const data = await res.json();

    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      let closeBtn = `<a href="#" class="close" data-id ="${user.id}">close</a>`;
      header.textContent = user.name;
      body.textContent = user.email;

      userCardContainer.appendChild(card);
      card.insertAdjacentHTML("afterbegin", closeBtn);
      return {
        name: user.name,
        email: user.email,
        element: card,
        id: user.id,
        closeBtn,
      };
    });
  } catch (err) {}
};

const init = function () {
  userSearcher();
};
init();

// searchInput.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase();
//   users.forEach((user) => {
//     const isVisible = user.name.includes(value) || user.email.includes(value);
//     user.element.classList.toggle("hide", !isVisible);
//     console.log(isVisible);
//   });
// });

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => res.json())
//   .then((data) => {
//     users = data.map((user) => {
//       const card = userCardTemplate.content.cloneNode(true).children[0];
//       const header = card.querySelector("[data-header]");
//       const body = card.querySelector("[data-body]");

//       header.textContent = user.name;
//       body.textContent = user.email;
//       userCardContainer.append(card);

//       return { name: user.name, email: user.email, element: card };
//     });
//   });
