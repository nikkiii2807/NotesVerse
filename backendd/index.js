require("dotenv").config();
const config=require("./config.json");
const mongoose=require("mongoose");


mongoose.connect(config.connectionString)
const User=require("./models/usermodel")
const Note=require("./models/notemodel")

const express=require("express")
const cors=require("cors");
const app=express();
const jwt=require('jsonwebtoken')
const {authenticateToken}=require("./utilities")
app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173', // Local development URL
    'https://notesverse-frontend.onrender.com', // Deployed frontend URL
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false, // Set to true if you plan to use cookies
    })
);


app.get("/", (req,res)=>{
    res.json({data:"hello"});
});

app.post("/create-acc", async(req,res)=>{
    const {fullName,email,password}=req.body;
    if(!fullName){
        return res
            .status(400)
            .json({error:true,message:"Full name is required"});
    }
    if(!email){
        return res
            .status(400)
            .json({error:true,message:"Email is required"});
    }
    if(!password){
        return res
            .status(400)
            .json({error:true,message:"Password is required"});
    }

    const isUser= await User.findOne({email:email});
    if(isUser){
        return res.json({
            error:true,
            message:"User already exists"
        })
    }
    const user=new User({
        fullName,email,password
    });
    await user.save();

    const accessToken=jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"36000m"
    })
    return res.json({
        error:false,
        user,
        accessToken,
        message:"Registration successfull",

    })
})


app.post("/login", async(req,res)=>{
    
        
    const {email, password}=req.body;
    if(!email){
        return res
            .status(400)
            .json({error:true,message:"Email is required"});
    }
    if(!password){
        return res
            .status(400)
            .json({error:true,message:"Password is required"});
    }
    const UserInfo=await User.findOne({email:email});
    if(!UserInfo){
        return res.status(400).json({message:"User not found"})
    }

    if(UserInfo.email==email && UserInfo.password==password){
        const user={user:UserInfo};
        const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"36000m"
        })
        return res.json({
            error:false,
            message:"Login Successfull",
            email,
            accessToken,
        })
    }
    else{
        return res.status(400).json({
            error:true,
            message:"Invalid Credentials",
        })
    }
})

app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.status(401).json({
            user: isUser,
            message: "User not found",
        });
    }

    return res.json({
        error: false,
        user: isUser,
        message: "",
    });
});

app.post("/add-note",authenticateToken, async(req,res)=>{
    const {title,content,tags}=req.body;
    const {user}=req.user;

    if(!title){
        return res.status(400) .json({error:true,message:"Title is required"});
    }
    if(!content){
        return res.status(400) .json({error:true,message:"Content is required"});
    }
    
    try{
        const note=new Note({
            title,
            content,
            tags:tags||[],
            userId:user._id
        })
        await note.save();
        return res.json({
            error:false,
            note,
            message:"Note added successfully"
        })
    }
    catch(error){
        return res.status(500).json({error:true,message:"Server error"})
    }

})

app.put("/edit-note/:noteId",authenticateToken,async(req,res)=>{
    const noteId=req.params.noteId;
    const {title,content,tags,isPinned}=req.body;
    const {user}=req.user;
    if(!title && !content && !tags){
        return res
            .status(400)
            .json({error:true,message:"No changes provided"})
    }

    try{
        const note=await Note.findOne({_id:noteId,userId:user._id})
        if(!note){
            return res.status(404).json({error:true,message:"Note not found"})
        }
        if(title) note.title=title;
        if(content) note.content=content;
        if(tags) note.tags=tags;
        if(isPinned) note.isPinned=isPinned;
        await note.save();
        return res.json({
            error:false,
            note,
            message:"Note updated successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            error:true,
            message:"Server error"
        })
    }
})

app.get("/get-all-notes",authenticateToken, async(req,res)=>{
    const {user}=req.user;
    try{
        const notes=await Note.find({userId:user._id}).sort({isPinned:-1});
        return res.json({
            error:false,
            notes,
            message:"All notes retrieved"
        })
    }
    catch(error){
        return res.status(500).json({
            error:true,
            message:"Server error"
        })
    }
})

// Delete note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Update note pinned status
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

//search note
app.get("/search-notes/", authenticateToken, async (req, res) => {
    // Change this line to access the nested user object
    const { user: { _id: userId } } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Search query is required" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: userId,  // Use the correctly accessed userId
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports=app;
