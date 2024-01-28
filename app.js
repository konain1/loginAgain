const exp = require('express');
const app = exp();
const path = require('path');
const jwt = require('jsonwebtoken')
// const bodyParser = require('body-parser');

// this is read for body 
app.use(exp.urlencoded({ extended: true })); 
app.use(exp.json());

const staticPath = path.join(__dirname, 'public');
app.use(exp.static(staticPath));
let token;
function userAuth(req, res, next) {
    
    const userEmail = req.body.email;
    const password = req.body.password;
     token = jwt.sign(userEmail,password)

    if (userEmail === 'leo@gmail.com' && password === '1234') {
        next()
    } else {
        res.json({ msg: 'invalid email or password' });
    }
}

app.post('/login',userAuth,  (req, res) => {
    res.json({msg:'you logged in token number = '+token})
   
});

app.listen(4009, () => {
    console.log('Server is running on port 4009');
});
