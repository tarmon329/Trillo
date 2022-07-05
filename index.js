// Scroll
let lastScrollTop;
navbar = document.querySelector(".sidebar");
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (window.innerWidth > 900 || scrollTop < 140) {
    navbar.style = "";
  } else if (scrollTop > lastScrollTop) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }
  lastScrollTop = scrollTop;
});

// Notifications
class notification {
  constructor(img, text) {
    this.img = img;
    this.text = text;
  }
}
const notifications = [
  new notification("img/hotel-1.jpg", " Booking confirmed - Panambi"),
  new notification("img/hotel-2.jpg", " Booking confirmed - Ashok"),
  new notification("img/hotel-3.jpg", " Booking confirmed - Kastraki"),
];

const notNum = document.querySelector(".user-nav__notification--notifications");

const createNotifications = (notifications) => {
  const container = document.querySelector(".notification__container");
  notifications.map((notification, id) => {
    const html = `
    <figcaption data-index="${id}" class="notification__box u-menu__box">
    <img
      src="${notification.img}"
      alt="Hotel Image"
      class="notification__box-photo u-photo--circle"
    />
    <p class="notification__box-text">
      ${notification.text}
    </p>
  </figcaption>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });

  // Add event listener
  document.querySelectorAll(".notification__box").forEach((m) =>
    m.addEventListener("click", (e) => {
      const index = +e.target.closest(".notification__box").dataset.index;
      const notificationsCopy = notifications.filter((_, i) => i !== index);
      container.innerHTML = "";
      createNotifications(notificationsCopy);
      if (notificationsCopy.length === 0) {
        notNum.style.display = "none";
        container.innerHTML =
          '<p style="text-align:center;" class="message-menu__user-message">No new notifications</p>';
        return;
      } else if (notificationsCopy.length > 9) {
        notNum.textContent = "+9";
      } else {
        notNum.textContent = notificationsCopy.length;
      }
      notNum.style.display = "flex";
    })
  );
};

// Messages
class message {
  constructor(name, img, text) {
    this.name = name.toUpperCase();
    this.img = img;
    this.text = text;
  }
}
let messages = [
  new message(
    "Nick smith",
    "img/user-1.jpg",
    "I've just confirmed your order at our hotel Panambi"
  ),
  new message(
    "MARY THOMAS",
    "img/user-2.jpg",
    "Hey, you order for Ashok is confirmed!"
  ),
  new message(
    "Nick Young",
    "img/user-3.jpg",
    "I'm sorry to inform you that your reservation for Kastraki is declined."
  ),
  new message("Jason Bourne", "img/user-4.jpg", "You're welcome!"),
  new message(
    "Cris Cross",
    "img/user-5.jpg",
    "Do you want to the passanger seat in the end?"
  ),
  new message("Jesse Morgan", "img/user-6.jpg", "Thanks! You too!"),
  new message("Omri Levi", "img/user-5.jpg", " I'll get you your rented bike."),
  new message("nick smith", "img/user-1.jpg", "We've recieved your order"),
  new message("Mary Thomas", "img/user-2.jpg", "We've recieved your order"),
  new message("Nick Young", "img/user-3.jpg", "We've recieved your order"),
];
let messagesCopy = JSON.parse(JSON.stringify(messages));

const container = document.querySelector(".message-menu__container");

const mesNum = document.querySelector(".user-nav__notification--messages");

const createMessages = (messages) => {
  messages.map((message, id) => {
    const html = `
    <div data-index="${id}" class="message-menu__friends u-menu__box">
                  <figcaption class="message-menu__user">
                    <img
                      src="${message.img}"
                      alt="User Image"
                      class="message-menu__user-photo u-photo--circle"
                    />
                    <div class="message-menu__user-box">
                      <p class="message-menu__user-name">${message.name}</p>
                      <p class="message-menu__user-message">${message.text}</p>
                    </div>
                  </figcaption>
                </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });

  // Add event listener
  document
    .querySelectorAll(".message-menu__friends")
    .forEach((m) => m.addEventListener("click", deleteMessage));
};

// Delete Messages
function deleteMessage(e) {
  const index = +e.target.closest(".message-menu__friends").dataset.index;
  messagesCopy = messagesCopy.filter((_, i) => i !== index);
  container.innerHTML = "";
  createMessages(messagesCopy);
  if (messagesCopy.length === 0) {
    mesNum.style.display = "none";
    container.innerHTML =
      '<p style="text-align:center;" class="message-menu__user-message">No new messages</p>';
    return;
  } else if (messagesCopy.length > 9) {
    mesNum.textContent = "+9";
  } else {
    mesNum.textContent = messagesCopy.length;
  }
  mesNum.style.display = "flex";
}

// Filter messages
const form = document.querySelector(".message-menu__form");
const formInput = document.querySelector(".message-menu__form-input");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

formInput.addEventListener("input", () => {
  if (!formInput.value) {
    container.innerHTML = "";
    return createMessages(messagesCopy);
  }
  const filterText = formInput.value.toLowerCase();
  const filteredMessages = messagesCopy.filter((m) =>
    m.name.toLowerCase().includes(filterText)
  );
  if (filteredMessages.length === 0) {
    container.innerHTML =
      '<p style="text-align:center;" class="message-menu__user-message">No new messages</p>';
  } else {
    container.innerHTML = "";
    createMessages(filteredMessages);
  }
});

// Run App
createNotifications(notifications);
createMessages(messages);
