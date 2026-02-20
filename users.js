const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
router.post('/signup', async (req,res)=>{
    const {name,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users (name,email,password) VALUES (?,?,?)",
        [name,email,hashedPassword], (err,result)=>{
            if(err) return res.status(400).json({error: err});
            res.json({message:"Signup successful"});
        });
});

// Login
router.post('/login', (req,res)=>{
    const {email,password} = req.body;
    db.query("SELECT * FROM users WHERE email=?", [email], async (err,result)=>{
        if(err) return res.status(400).json({error: err});
        if(result.length===0) return res.status(400).json({error:"User not found"});
        const match = await bcrypt.compare(password, result[0].password);
        if(!match) return res.status(400).json({error:"Incorrect password"});
        const token = jwt.sign({id: result[0].id}, 'secretkey',{expiresIn:'1h'});
        res.json({message:"Login successful", token});
    });
});

module.exports = router;
