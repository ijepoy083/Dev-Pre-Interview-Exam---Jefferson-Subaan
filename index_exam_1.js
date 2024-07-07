const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

let phoneNumbers = [];
let currentId = 1;

// Create
app.post('/phoneNumbers', (req, res) => {
    const newphoneNumber = {
        id: currentId++,
        phoneNumber: req.body.phoneNumber
    };
    phoneNumbers.push(newphoneNumber);
    res.status(201).json({message: "Phone Number Successfully Added", Data: newphoneNumber});
});

// Retrieve
app.get('/phoneNumbers', (req, res) => {
    res.json({row_count: phoneNumbers.length, phoneNumbers });
});

// Retrieve 1 only
app.get('/phoneNumbers/:id', (req, res) => {
    const phoneNumber = phoneNumbers.find(i => i.id === parseInt(req.params.id));
    if (phoneNumber) {
        res.json(phoneNumber);
    } else {
        res.status(404).json({ message: 'phoneNumber not found' });
    }
});

// Update
app.post('/phoneNumbers/:id', (req, res) => {
    const phoneNumber = phoneNumbers.find(i => i.id === parseInt(req.params.id));
    if (phoneNumber) {
        phoneNumber.phoneNumber = req.body.phoneNumber;
        res.json({message: "Phone Number Successfully Updated", Data: phoneNumber});
    } else {
        res.status(404).json({ message: 'phoneNumber not found' });
    }
});

// Delete 1 only
app.post('/delete/phoneNumbers/:id', (req, res) => {
    const phoneNumberIndex = phoneNumbers.findIndex(i => i.id === parseInt(req.params.id));
    if (phoneNumberIndex !== -1) {
        const deletedphoneNumber = phoneNumbers.splice(phoneNumberIndex, 1);
        res.json({message: "Phone Number Successfully Deleted", Data: deletedphoneNumber});
    } else {
        res.status(404).json({ message: 'phoneNumber not found' });
    }
});

app.post('/reset', (req, res) => {
    phoneNumbers = []; 
    currentId = 1; 
    res.status(200).json({ message: 'Reset successful' });
});


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});