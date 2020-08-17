fetch("http://localhost:3000/getone").then((response) => {
    response.json().then((data) => {
        const table = document.querySelector("table")
        table.innerHTML = "";
        table.innerHTML = '<tr><th>Name</th><th>Department</th><th>USN</th><th>Year</th><th>Email</th><th>Semester</th><th>Book_Name</th><th>Book_ISBN</th><th>Book_Author</th><th>Want to Remove?</th></tr>'
        for(let i=0;i<data.bor.length;i++)
        {
           const tr = document.createElement("tr")
           tr.innerHTML = `
           <td><b>${data.bor[i].name}</b></td>
           <td><b>${data.bor[i].department}</b></td>
           <td><b>${data.bor[i].usn}</b></td>
           <td><b>${data.bor[i].year}</b></td>
           <td><b>${data.bor[i].email}</b></td>
           <td><b>${data.bor[i].sem}</b></td>
           <td><b>${data.bor[i].bname}</b></td>
           <td><b>${data.bor[i].isbn}</b></td>
           <td><b>${data.bor[i].bauthor}</b></td>
           <td><button class='but' id = '${data.bor[i].name}'>X</button></td>`
           table.appendChild(tr)
        }
    })
})

document.querySelector("table").addEventListener("click",(e) => {
    if(e.target.textContent == "X")
   
        console.log(e.target.textContent)
        window.location = `/del?name=${e.target.id}`
})