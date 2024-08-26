 var sql=require('../models/index');
 const jwt = require('jsonwebtoken');


 const getData= (req, res) => {
    const query = "SELECT * FROM Users JOIN EntryExitLogs ON Users.UserID = EntryExitLogs.UserID order by LogId";
    sql.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const Data = data; 
        res.send(Data); 
    });
};


const getDataById= (req, res) => {
    var Id=Number(req.params.id);
    console.log(Id,"hello");
    const query = "SELECT * FROM Users JOIN EntryExitLogs ON Users.UserID = EntryExitLogs.UserID where users.UserID=?";
    sql.query(query,Id, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let IdData=data;
        res.send(IdData);
    });
}

const getDate= (req, res) => {
    var Id=req.params.id;
    console.log(Id,"hello");
    const query = "SELECT * FROM Users JOIN EntryExitLogs ON Users.UserID = EntryExitLogs.UserID where EntryExitLogs.LogDate=?";
    sql.query(query,Id, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let IdData=data;
        res.send(IdData);
    });
}


const postData=(req, res) => {
const { entry

 } = req.body;

 console.log(entry);
const query1 = 'SELECT UserID, UserName, UserEmail, RFIDCardNumber FROM Users WHERE UserID = ?';

sql.query(query1, [entry], (err, data) => {
    if (err) {
        throw err;
    }
    
    if (data.length > 0) {
        let user = data[0];
        console.log(user);
        
        const query2 = 'SELECT * FROM EntryExitLogs WHERE UserID = ? order by logdate desc, logid limit 1';
        sql.query(query2, [user.UserID], (err, logData) => {
                if (err) {
                    throw err;
                }
                
                if (logData.length > 0 && logData[0].status === "IN") {
                    // Update exit time and change status to "OUT"
                    let exitTime = getISTTime();
                    
                    const logQuery = 'UPDATE EntryExitLogs SET ExitTime = ?, status = "OUT" WHERE LogID = ?';
                    sql.query(logQuery, [exitTime, logData[0].LogID], (err, updateData) => {
                        if (err) {
                            throw err;
                        }
                        res.send(`Thank you ${user.UserName}, you logged out at ${exitTime}`);
                    });
                } else {
                    // Insert new entry time and set status to "IN"
                    let entryTime = getISTTime();
                    let logDate = new Date().toISOString().slice(0, 10);
                    
                    const logQuery = 'INSERT INTO EntryExitLogs (UserID, EntryTime, status, LogDate) VALUES (?, ?, "IN", ?)';
                    sql.query(logQuery, [user.UserID, entryTime, logDate], (err, insertData) => {
                        if (err) {
                            throw err;
                        }
                        console.log(insertData);
                        res.send(`Welcome ${user.UserName}, you logged in at ${entryTime}`);
                    });
                }
            });
        } else {
            console.log("Id doesn't exist");
            res.send("ID doesn't exist");
        }
    });
};


const getUser=(req,res)=>{
    const query = "SELECT * FROM Users order by UserId";
    sql.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const Data = data; 
        res.send(Data); 
    });
};


const postUser=(req,res)=>{
    const Body=req.body;
    console.log(Body);
    const query1 = 'Insert into Users Set ?';
    sql.query(query1,Body,(err,data)=>{
        if(err)
        {
            console.log(err);
        }
         res.redirect('/');
    })

};


function getISTTime() {
    // Create a new Date object
    let currentTime = new Date();

    // Get the current UTC offset in minutes
    let currentOffset = currentTime.getTimezoneOffset();

    // IST offset is UTC +5:30, which is 330 minutes
    let ISTOffset = 330;

    // Calculate IST time
    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    // Format the time in 12-hour format with AM/PM
    let hours = ISTTime.getHours();
    let minutes = ISTTime.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


let postLogin = (req, res) => {
    const { email, password } = req.body;
    const que = `SELECT * FROM Admins WHERE AdminEmail = ? and passkey=?`;
    sql.query(que, [email,password], (err,users)=>{
            console.log(users);
            if (err || users.length === 0) return res.status(401).json({ error: 'Authentication failed.' });
            const user = users[0];
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, role: user.role,id:user.id });
        });
    };


module.exports={getData,getDate,getDataById,postData,postUser,getUser,postLogin};

// app.get('/view', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });