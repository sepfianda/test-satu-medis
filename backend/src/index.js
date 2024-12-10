const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome To My Website");
});

//REGISTER
app.use("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });

  res.json({
    message: "user created",
  });
});

// LOGIN
app.use("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.password) {
    return res.status(404).json({
      message: "Password not set",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return res.json({
      data: {
        id: user.id,
        fullName: user.fullName,
      },
    });
  } else {
    return res.status(403).json({
      message: "Wrong password",
    });
  }
});

app.get("/api", (req, res) => {
  res.send("Hello World");
});

//GET
app.get("/patients", async (req, res) => {
  const patients = await prisma.patient.findMany();
  res.send(patients);
});

//GET BY ID
app.get("/patients/:id", async (req, res) => {
  const patientId = req.params.id;
  const patient = await prisma.patient.findUnique({
    where: {
      id: parseInt(patientId),
    },
  });

  if (!patient) {
    return res.status(400).send("patient not found");
  }

  res.send(patient);
});

//CREATE
app.post("/patients", async (req, res) => {
  const newPatientData = req.body;
  const patient = await prisma.patient.create({
    data: {
      fullName: newPatientData.fullName,
      phoneNumber: newPatientData.phoneNumber,
      address: newPatientData.address,
      diagnosis: newPatientData.diagnosis,
      doctorName: newPatientData.doctorName,
      poliClinic: newPatientData.poliClinic,
    },
  });

  res.send({
    data: patient,
    message: "create user success",
  });
});

//DELETE
app.delete("/patients/:id", async (req, res) => {
  const patientId = req.params.id;
  await prisma.patient.delete({
    where: {
      id: parseInt(patientId),
    },
  });

  res.send("deleted user succes");
});

//UPDATE
app.patch("/patients/:id", async (req, res) => {
  const patientId = req.params.id;
  const patientData = req.body;

  const patient = await prisma.patient.update({
    where: {
      id: parseInt(patientId),
    },
    data: {
      phoneNumber: patientData.phoneNumber,
      address: patientData.address,
    },
  });

  res.send({
    data: patient,
    message: "edit patient success",
  });
});

//PAGINATION 
app.get('/patients', async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 2; 
  const offset = (page - 1) * limit; 

  try {
    const patients = await prisma.patient.findMany({
      skip: offset,
      take: limit,
    });

    const totalPatients = await prisma.user.count();

    res.json({
      total: totalPatients,
      page,
      limit,
      patients,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//SEARCH BAR 


app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
