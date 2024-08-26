document.getElementById('loginform')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userid',data.id)
            window.location.href = '/home';
        } else {
            alert('Login failed: ' + data.error);
        }           
    } catch (error) {
        console.error('Error during login:', error);
    }
});
document.getElementById('logid')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    // console.log('hello');
    const entry = document.getElementById('entry').value;
    try {
        const response = await fetch('/api/attend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ entry })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Thank You');
        } else {
            alert('Login failed: ');
        } 
    }
    catch(err)
    {
        console.log(err);
    }    
});
    
function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    window.location.href='login.html';
}
var b=document.getElementById("ut");
b.innerHTML=`<thead>
<tr>
<th>UserId</th>
                <th>User Name</th>
                <th>Email Id</th>
                <th>RFID Number</th>
                <th>Log Id</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>LogDate</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="coldata">
        <tr></tr>
    </tbody>
`;
async function fetchData() {
    try {
        const response = await fetch('/api/data');
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
                            <td>${ele.LogID}</td>
                            <td>${ele.EntryTime}</td>
                            <td>${ele.ExitTime}</td>
                            <td><a href="#"  onclick="DateData(${ele.LogDate})">${ele.LogDate}</a></td>
                            <td>${ele.status}</td>`;
            e.appendChild(a);
        });
        return JSON.stringify(data);
        }catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
fetchData();
function IdData(id)
{
    var e=document.getElementById("coldata");
    e.style.display="none";
    async function fetchId(id){
    try{
        console.log("hello");
       const response= await fetch(`/api/data/${id}`);
       const data=await response.json();
       var f=document.getElementById("ut");
       var e=document.createElement("tbody");
       e.setAttribute('id','coldata2');
       data.forEach(ele => {
        var a=document.createElement("tr");            
        a.innerHTML=`   <td><a href="">${ele.UserID}</a></td>
                        <td>${ele.UserName}</td>
                        <td>${ele.UserEmail}</td>
                        <td>${ele.RFIDCardNumber}</td>
                        <td>${ele.LogID}</td>
                        <td>${ele.EntryTime}</td>
                        <td>${ele.ExitTime}</td>
                        <td>${ele.LogDate}</td>
                        <td>${ele.status}</td>`;
        e.appendChild(a);
    });
    f.appendChild(e);

    } catch(error){
    console.log(error);
}
    }
fetchId(id);
}
function DateData(id)
{
    var e=document.getElementById("coldata");
    e.style.display="none";
    async function fetchId(id){
    try{
        console.log("hello");
       const response= await fetch(`/api/date/${id}`);
       const data=await response.json();
       var f=document.getElementById("ut");
       var e=document.createElement("tbody");
       e.setAttribute('id','coldata2');
       data.forEach(ele => {
        var a=document.createElement("tr");            
        a.innerHTML=`   <td><a href="">${ele.UserID}</a></td>
                        <td>${ele.UserName}</td>
                        <td>${ele.UserEmail}</td>
                        <td>${ele.RFIDCardNumber}</td>
                        <td>${ele.LogID}</td>
                        <td>${ele.EntryTime}</td>
                        <td>${ele.ExitTime}</td>
                        <td>${ele.logDate}</td>
                        <td>${ele.status}</td>`;
        e.appendChild(a);
    });
    f.appendChild(e);

    } catch(error){
    console.log(error);
}
    }
fetchId(id);
}
