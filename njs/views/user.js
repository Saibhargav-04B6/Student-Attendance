var b=document.getElementById("ul");
b.innerHTML=`<thead>
<tr>                <th>UserId</th>
                <th>UserName</th>
                <th>EmailId</th>
                <th>RFIDNumber</th>
                <th>StartedAt</th>
            </tr>
        </thead>
        <tbody id="coldata">
        <tr></tr>
    </tbody>
`;
function getStudents(){
    async function fetchStudents()
    {
        try{
            const response = await fetch('/api/data/user');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        data.forEach(ele => {
            var e=document.getElementById("coldata");
            var a=document.createElement("tr");            
            a.innerHTML=`   <td><a href="#" onclick="IdData(${ele.UserID})">${ele.UserID}</a></td>
                            <td>${ele.UserName}</td>
                            <td>${ele.UserEmail}</td>
                            <td>${ele.RFIDCardNumber}</td>
                            <td>${ele.CreatedAt}</td>`;
            e.appendChild(a);
        });
        }catch(err)
        {

        }
    }
    fetchStudents();
}
getStudents();