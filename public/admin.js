async function loadUsers() {
    const pass = document.getElementById("adminPass").value;

    const res = await fetch(`/users?password=${pass}`);
    if (!res.ok) {
        alert("❌ Access Denied");
        return;
    }

    const users = await res.json();
    const table = document.getElementById("userTable");
    table.innerHTML = "";

    users.forEach(u => {
        table.innerHTML += `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.phone}</td>
                <td>${u.role}</td>
                <td>${u.mode}</td>
                <td>${u.registeredAt}</td>
            </tr>`;
    });
}
