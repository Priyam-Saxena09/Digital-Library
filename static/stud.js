fetch("http://localhost:3000/stud").then((response) => {
    response.json().then((data) => {
        const detail = document.querySelector(".details")
        detail.innerHTML = `<h1>List of Students who are issuing books from Library</h1>`
        for(let i=0;i<data.stud.length;i++)
        {
        const p = document.createElement("p")
        p.innerHTML = `<a href = "localhost:3000/studet?name=${data.stud[i].name}">${data.stud[i].name}</a>-<b><a href="dept?name=${data.stud[i].department}">${data.stud[i].department}</a></b>`
        detail.appendChild(p)
        }
    })
})




    


