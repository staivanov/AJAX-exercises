let userDatabaseURL = "https://phonebook-c6777.firebaseio.com/phonebook.json";
let loadButton = document.getElementById("btnLoad");
let btnCreate = document.getElementById("btnCreate");


function clearPersonAndNumberForm() {
    document.getElementById("person").value = " ";
    document.getElementById("phone").value = " ";
}

loadButton.addEventListener("click", function () {

    let phonebookUl = document.getElementById("phonebook");
    phonebookUl.innerHTML = " ";
    let xht = new XMLHttpRequest();
    xht.open("GET", userDatabaseURL, true);

    function deleteCurrentUser(ev) {

        ev.preventDefault();
        let xhr = new XMLHttpRequest();
        let deleteContactURL = this.attributes.href.value;
        this.parentNode.remove(this);
        xhr.open("DELETE", deleteContactURL, true);
        xhr.send();
    }

    xht.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let users = JSON.parse(this.responseText);

            for (let user in users) {
                let li = document.createElement('li'),
                    anchor = document.createElement('a');
                anchor.text = " [DELETE]";
                anchor.href = `https://phonebook-c6777.firebaseio.com/phonebook/${user}.json`;
                anchor.addEventListener("click", deleteCurrentUser);
                li.innerHTML = users[user].person + " " + users[user].phone;
                li.appendChild(anchor);
                phonebookUl.appendChild(li);
            }
        }
    };
    xht.send();
});

btnCreate.addEventListener("click", function () {
    let xhr = new XMLHttpRequest();
    let url = userDatabaseURL;
    let personValue = document.getElementById("person").value;
    let phoneValue = document.getElementById("phone").value;
    let contactInfo = {
        person: personValue,
        phone: phoneValue
    };
    let data = JSON.stringify(contactInfo);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    clearPersonAndNumberForm();
});