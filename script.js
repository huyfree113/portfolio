document.addEventListener("DOMContentLoaded", function () {
    /*const API_URL = "https://portfolio-backend-2xlj.onrender.com/api/contacts";*/
    /*const API_URL = "http://localhost:3000/api/contacts";*/
    const form = document.querySelector("form");
    const messageBox = document.getElementById("message");
    const contactList = document.getElementById("contactList");

    const nameInput = document.querySelector('input[name="fullname"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="message"]');

    const searchBox = document.getElementById("searchBox");
    const loadBtn = document.getElementById("loadApi");
    const exportBtn = document.getElementById("exportBtn");
    const importFile = document.getElementById("importFile");
    const themeBtn = document.getElementById("themeToggle");

    // ================= SERVER =================
async function getContacts() {
  const data = await getContacts();

  if (!res.ok) {
    throw new Error("Cannot fetch contacts");
  }

  return res.json();
}
    
      async function saveServer(data) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

async function loadServer() {
  const data = await getContacts();
  const data = await getContacts();
  renderContacts(data);
}

    
    // ================= UI =================

    function showError(text) {
        messageBox.textContent = text;
        messageBox.className = "error";
    }

    function showSuccess(text) {
        messageBox.textContent = text;
        messageBox.className = "success";
    }

    function clearStatus() {
        messageBox.textContent = "";
        messageBox.className = "";
    }

    function renderContacts(list) {

        contactList.innerHTML = "";

        list.forEach((item, index) => {

            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${item.name}</strong> (${item.email})<br>
                ${item.msg}<br>
                <small>${item.time}</small><br><br>
            `;

            contactList.appendChild(li);
        });
    }
    // ===== LOCAL STORAGE =====

    function saveLocal(data) {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(data);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}


function loadLocal() {

    const data = JSON.parse(localStorage.getItem("contacts")) || [];

    renderContacts(data);
}


    // ================= FORM =================

    form.addEventListener("submit", async function (e) {

        e.preventDefault();
        clearStatus();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const msg = messageInput.value.trim();

        if (!name || !email || !msg) {
            showError("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        const data = {
            name,
            email,
            msg,
            time: new Date().toLocaleString()
        };

        await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});


        showSuccess("Đã gửi thành công!");

        form.reset();

        loadServer();

    });

    // ================= SEARCH =================

if (searchBox) {
  searchBox.addEventListener("input", async function () {

    const key = this.value.toLowerCase();

    const data = await getContacts();
    const data = await getContacts();

    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(key) ||
      item.email.toLowerCase().includes(key)
    );

    renderContacts(filtered);
  });
}



    // ================= SAMPLE DATA =================
if (loadBtn) {
    loadBtn.addEventListener("click", function () {

        fetch("https://raw.githubusercontent.com/huyfree113/portfolio/main/data.json")
            .then(res => {
                if (!res.ok) throw new Error("Không tải được file JSON");
                return res.json();
            })
            .then(data => {

                data.forEach(item => {
                    saveServer(item); // hoặc saveLocal nếu không dùng server
                });

                saveServer(item);  // hoặc loadLocal nếu dùng localStorage

                showSuccess("Đã load dữ liệu mẫu!");
            })
            .catch(err => {
                showError("Không tải được dữ liệu mẫu!");
                console.error(err);
            });
    });
    }
    // ================= EXPORT =================
if (exportBtn) {
    exportBtn.addEventListener("click", async function () {

        const data = await getContacts();
        const data = await getContacts();

        if (!data.length) {
            alert("Không có dữ liệu");
            return;
        }

        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "contacts_backup.json";
        a.click();

        URL.revokeObjectURL(url);
    });
}
    // ================= IMPORT =================
if (importFile) {
    importFile.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = async function (e) {

            try {

                const data = JSON.parse(e.target.result);

                for (let item of data) {
                    await saveLocal(item);
                }

                loadLocal();

                alert("Import thành công!");

            } catch {
                alert("File không hợp lệ!");
            }
        };

        reader.readAsText(file);
    });
}
    // ================= DARK MODE =================

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    }
if (themeBtn) {
    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙";
        }
    });
}
    // ================= INIT =================

    loadServer();

});



