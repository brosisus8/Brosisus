const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

// Add static middleware for uploads
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect("mongodb+srv://brosisus8:7suJwtCzdbecaWAH@brosisus.lrome.mongodb.net/Brosisus?retryWrites=true&w=majority&appName=Brosisus");


const User = mongoose.model('User', new mongoose.Schema({
    userKey: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
}));

// Data Models
const Tenant = mongoose.model('Tenant', new mongoose.Schema({
    name: String,
    contact: String,
    city: String,
    budgetMax: Number,
    roomSizeMin: Number,
    features: [String],
    proof: String,
}));

const Property = mongoose.model('Property', new mongoose.Schema({
    owner: String,
    contact: String,
    address: String,
    rentPrice: Number,
    roomSize: Number,
    features: [String],
    photo: String,
    photo2: String,
}));

const Message = mongoose.model('Message', new mongoose.Schema({
    senderId: String,
    content: String,
    responses: [{
        userId: String,
        text: String,
        timestamp: { type: Date, default: Date.now }
    }],
    timestamp: { type: Date, default: Date.now },
    isAnonymous: { type: Boolean, default: true }
}));

 // Creates a storage directory

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
    try {
        const userKey = req.body.userKey;
        
        // Find or create user
        let user = await User.findOne({ userKey });
        
        if (!user) {
            user = new User({
                userKey,
                createdAt: new Date(),
            });
            await user.save();
            console.log('New user created:', userKey);
        } else {
            console.log('Existing user found:', userKey);
        }
        res.status(200).send('User setup successful');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error handling user setup');
    }
});


app.get('/creators', async (req, res) => {
    res.sendFile(path.join(__dirname, 'creators.html'));
});

app.get('/messageForm', async (req, res) => {
    res.sendFile(path.join(__dirname, 'messageForm.html'));
});

app.get('/tenantForm', async (req, res) => {
    res.sendFile(path.join(__dirname, 'tenantForm.html'));
});

app.get('/propertyForm', async (req, res) => {
    res.sendFile(path.join(__dirname, 'propertyForm.html'));
});

app.get('/availableProperties', async (req, res) => {
    res.sendFile(path.join(__dirname, 'properties.html'));
});

app.get('/messages', async (req, res) => {
    res.sendFile(path.join(__dirname, 'messages.html'));
});

app.get('/tenantRequests', async (req, res) => {
    res.sendFile(path.join(__dirname, 'tenantRequest.html'));
});

app.get('/allMessages', async (req, res) => {
    res.sendFile(path.join(__dirname, 'allMessages.html'));
});

app.get('/contact', async (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Tenant routes
app.post('/api/tenant', upload.single('proof'), async (req, res) => {
    const { name, contact, city, budgetMax, roomSizeMin, features } = req.body;
    const tenant = new Tenant({
        name, 
        contact, 
        city, 
        budgetMax, 
        roomSizeMin, 
        features, 
        proof: req.file.path
    });
    await tenant.save();
    res.send('Housing request submitted successfully.');
});

app.get('/api/tenant', async (req, res) => {
    try {
        const tenant = await Tenant.find({});
        res.json(tenant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

app.post('/api/property', upload.fields([{ name: 'photo1', maxCount: 1 }, { name: 'photo2', maxCount: 1 }]), async (req, res) => {
    const { owner, contact, address, rentPrice, roomSize, features } = req.body;
    const property = new Property({
        owner, 
        contact, 
        address, 
        rentPrice, 
        roomSize, 
        features,
        photo: req.files['photo1'] ? req.files['photo1'][0].path : null,
        photo2: req.files['photo2'] ? req.files['photo2'][0].path : null
    });
    await property.save();
    res.send('Property published successfully.');
});


app.get('/api/properties', async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});



// Matching route
app.post('/api/match', async (req, res) => {
    const { city, price, size } = req.body;
    
    // Convert values to numbers for comparison
    const budget = Number(price);
    const roomSize = Number(size);
    
    const matchedProperties = await Property.find({
        address: { $regex: city, $options: 'i' }, // Use regex for case-insensitive partial match
        rentPrice: { $lte: budget },
        roomSize: { $gte: roomSize }
    });
    
    console.log('Found properties:', matchedProperties);
    res.json(matchedProperties);
});

// Route to send a message
app.post('/api/message', async (req, res) => {
    const { content, senderId } = req.body;

    if (!content) {
        return res.status(400).send('Message content is required.');
    }

    try {
        const message = new Message({
            senderId: senderId,
            content
        });

        await message.save();
        res.status(200).send('Message sent successfully.');
    } catch (error) {
        res.status(500).send('Error saving message');
    }
});

// Route to retrieve messages
app.get('/api/messages', async (req, res) => {

    const messages = await Message.find({}).sort({ timestamp: -1 });

    console.log('Fetched messages:', messages);

    res.json(messages);
});

// Route to retrieve messages
app.get('/api/messages/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log('Fetching messages for user:', userId);

    const messages = await Message.find({ senderId: userId }).sort({ timestamp: -1 });

    console.log('Fetched messages:', messages);

    res.json(messages);
});

app.post('/api/message/respond', async (req, res) => {
    const { messageId, userId, text } = req.body;
    
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        
        message.responses.push({
            userId,
            text,
            timestamp: new Date()
        });
        
        await message.save();
        res.status(200).send('Response added successfully');
    } catch (error) {
        res.status(500).send('Error adding response');
    }
});

/******************* TenantRequest ***********************/

app.post("/booking", (req, res) => {
    const name = req.body.name;
    const conatct = req.body.contact;
    const city = req.body.city;
    const max = req.body.maxPrice;
    const size = req.body.roomSize;
    const features = req.body.features;
  
    // Define email content
    const emailContent = `
      <h2>Tenant request Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${conatct}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Max Budget:</strong> ${max}</p>
      <p><strong>Size</strong> ${size}</p>
      <p><strong>Features:</strong> ${features}</p>
      <p><strong>Verified payment</strong></p>
  `;
    // Define email configuration
    let config = {
      service: "gmail",
      auth: {
        user: "newbooking45@gmail.com",
        pass: "dpqc hkev uupm kgjg",
      },
    };
  
    // Create transporter
    let transporter = nodemailer.createTransport(config);
  
    // Define email message
    let message = {
      from: "newbooking45@gmail.com",
      to: "brosisus8@gmail.com",
      subject: "Tenant Request",
      html: emailContent,
    };
  
    // Send email
    transporter
      .sendMail(message)
      .then((info) => {
        console.log("Email sent:", info.messageId);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        res.status(500).json({ error: "Failed to send email" });
      });
  });

/********************************************************/


/******************* TenantRequest ***********************/

app.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const problem = req.body.problem;
  
    // Define email content
    const emailContent = `
      <h2>user Contact</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${problem}</p>
  `;
    // Define email configuration
    let config = {
      service: "gmail",
      auth: {
        user: "newbooking45@gmail.com",
        pass: "dpqc hkev uupm kgjg",
      },
    };
  
    // Create transporter
    let transporter = nodemailer.createTransport(config);
  
    // Define email message
    let message = {
      from: "newbooking45@gmail.com",
      to: "brosisus8@gmail.com",
      subject: "User Contact",
      html: emailContent,
    };
  
    // Send email
    transporter
      .sendMail(message)
      .then((info) => {
        console.log("Email sent:", info.messageId);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        res.status(500).json({ error: "Failed to send email" });
      });
  });
/** */
/********************************************************/

// Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});







